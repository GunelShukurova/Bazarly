const STORAGE_KEY = "bazarly-data";
const DATA_URL = new URL("data/index.json", import.meta.env.BASE_URL).toString();

const createId = () => {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`;
};

const readStorage = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (error) {
    console.warn("Failed to read cached data", error);
    return null;
  }
};

const writeStorage = (data) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.warn("Failed to cache data", error);
  }
};

const loadData = async () => {
  const cached = readStorage();
  if (cached) {
    return cached;
  }

  const response = await fetch(DATA_URL);
  if (!response.ok) {
    throw new Error("Failed to load data");
  }

  const data = await response.json();
  writeStorage(data);
  return data;
};

const parseUrl = (url) => {
  const cleaned = url.replace(/^https?:\/\/[^/]+/, "");
  const [path, queryString] = cleaned.split("?");
  const segments = path.split("/").filter(Boolean);
  return {
    collection: segments[0],
    id: segments[1],
    query: new URLSearchParams(queryString || ""),
  };
};

const applyQueryFilters = (items, query) => {
  if (!query || query.size === 0) {
    return items;
  }
  let filtered = [...items];
  query.forEach((value, key) => {
    filtered = filtered.filter((item) => String(item?.[key]) === String(value));
  });
  return filtered;
};

const ensureCollection = (data, collection) => {
  if (!collection || !Array.isArray(data?.[collection])) {
    throw new Error("Unknown resource");
  }
  return data[collection];
};

const instance = {
  async get(url) {
    const data = await loadData();
    const { collection, id, query } = parseUrl(url);
    const items = ensureCollection(data, collection);
    if (id) {
      const item = items.find((entry) => String(entry.id) === String(id));
      return { data: item ?? null, status: 200 };
    }
    return { data: applyQueryFilters(items, query), status: 200 };
  },

  async post(url, payload) {
    const data = await loadData();
    const { collection } = parseUrl(url);
    const items = ensureCollection(data, collection);
    const newItem = { id: createId(), ...payload };
    const nextData = { ...data, [collection]: [...items, newItem] };
    writeStorage(nextData);
    return { data: newItem, status: 201 };
  },

  async patch(url, payload) {
    const data = await loadData();
    const { collection, id } = parseUrl(url);
    const items = ensureCollection(data, collection);
    const index = items.findIndex((entry) => String(entry.id) === String(id));
    if (index === -1) {
      throw new Error("Item not found");
    }
    const updated = { ...items[index], ...payload };
    const nextItems = [...items];
    nextItems[index] = updated;
    const nextData = { ...data, [collection]: nextItems };
    writeStorage(nextData);
    return { data: updated, status: 200 };
  },

  async delete(url) {
    const data = await loadData();
    const { collection, id } = parseUrl(url);
    const items = ensureCollection(data, collection);
    const index = items.findIndex((entry) => String(entry.id) === String(id));
    if (index === -1) {
      throw new Error("Item not found");
    }
    const nextItems = [...items];
    const [removed] = nextItems.splice(index, 1);
    const nextData = { ...data, [collection]: nextItems };
    writeStorage(nextData);
    return { data: removed, status: 200 };
  },
};

export default instance;
