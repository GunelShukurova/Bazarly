const rawApiBaseUrl =
  import.meta.env.VITE_API_BASE_URL ||
  (import.meta.env.DEV
    ? "http://localhost:3000"
    : globalThis.location?.origin || "");
export const API_BASE_URL = rawApiBaseUrl.replace(/\/$/, "");

export const endpoints = {
    users: "/users",
    orders: "/orders",
    products: "/products",
    messages: "/messages",
    reviews: "/reviews",
    
};
