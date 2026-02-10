import { HR } from "flowbite-react";
import { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts"
import moment from "moment";
import { getAllUsers } from "../../services/users/requests";
import { getAllOrders, getAllProducts } from "../../services/products/requests";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);

  // ✅ Fetch data
  useEffect(() => {
    const fetchData = async () => {
      const usersRes = await getAllUsers();
      const ordersRes = await getAllOrders();
      const productsRes = await getAllProducts();

      setUsers(usersRes.data || []);
      setOrders(ordersRes.data || []);
      setProducts(productsRes.data || []);
    };

    fetchData();
  }, []);

  // ✅ Stats
  const totalRevenue = orders.reduce(
    (sum, order) => sum + (Number(order.totalPrice) || 0),
    0
  );

  const stats = [
    { title: "Total Users", value: users.length },
    { title: "Total Orders", value: orders.length },
    { title: "Total Revenue ($)", value: totalRevenue.toFixed(2) },
  ];

  // ✅ Product availability chart
  const availableCount = products.filter((p) => p.available).length;
  const unavailableCount = products.length - availableCount;

  const availabilityData = [
    { name: "Available", value: availableCount },
    { name: "Out of Stock", value: unavailableCount },
  ];

  const COLORS = ["#00C49F", "#FF8042"];

  // ✅ Revenue by product
  const revenueMap = {};

  orders.forEach((order) => {
    const items = order.items || order.products || [];

    items.forEach((item) => {
      const id = item.productId;
      const revenue = item.price * item.quantity;

      revenueMap[id] = (revenueMap[id] || 0) + revenue;
    });
  });


  // ✅ Recent orders
  const recentOrders = [...orders]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() -
        new Date(a.createdAt).getTime()
    )
    .slice(0, 3)
    .map((order) => ({
      name: order.fullName || "Unknown User",
      total: order.totalPrice,
      timeAgo: moment(order.createdAt).fromNow(),
    }));

  // ✅ Popular products
  const productCounts = {};

  orders.forEach((order) => {
    const items = order.items || order.products || [];

    items.forEach((item) => {
      productCounts[item.productId] =
        (productCounts[item.productId] || 0) + item.quantity;
    });
  });

  const popularProducts = Object.entries(productCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3)
    .map(([productId, count]) => {
      const product = products.find((p) => p.id === productId);

      return {
        name: product ? product.title : `Product ${productId}`,
        count,
        emoji: "🔥",
      };
    });

    const revenueByDate = {};

orders.forEach((order) => {
  const date = moment(order.createdAt).format("MMM DD");

  revenueByDate[date] =
    (revenueByDate[date] || 0) + Number(order.totalPrice);
});

const revenueTrendData = Object.entries(revenueByDate).map(
  ([date, revenue]) => ({
    date,
    revenue,
  })
);

const radarData = popularProducts.map((p) => ({
  subject: p.name,
  A: p.count,
}));
return (
  <main className="px-6 pt-8 w-[87vw] ml-[14%] min-h-screen bg-[#F9F6EB]">
    {/* Header */}
    <section className="flex justify-between items-center mb-8 bg-[#EADFD2] p-6 rounded-2xl shadow-lg">
      <div>
        <h1 className="text-3xl font-bold">
          Admin Dashboard
        </h1>
        <p className="opacity-90 text-sm">
          Welcome back. Here’s your store analytics
        </p>
      </div>

      <span className="text-sm bg-white/20 px-4 py-2 rounded-lg">
        {new Date().toDateString()}
      </span>
    </section>

    {/* Stats Cards */}
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10 ">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-[#F9F6EB] p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-300 border border-gray-100"
        >
          <h2 className="text-gray-500 text-sm">{stat.title}</h2>

          <p className="text-4xl font-bold text-slate-900 mt-3">
            {stat.value}
          </p>
        </div>
      ))}
    </section>

    {/* Recent + Popular */}
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8 ">
      {/* Recent Orders */}
      <div className="bg-[#F9F6EB] rounded-2xl shadow-md p-6 hover:shadow-lg transition">
        <h3 className="text-xl font-semibold mb-4 text-blue-800">
          Recent Orders
        </h3>

        <ul className="space-y-3">
          {recentOrders.length > 0 ? (
            recentOrders.map((order, index) => (
              <li
                key={index}
                className="flex justify-between items-center border-b pb-2 text-sm"
              >
                <span className="font-medium">{order.name}</span>
                <span className="text-gray-500">
                  ${order.total.toFixed(2)}
                </span>
                <span className="text-xs text-gray-400">
                  {order.timeAgo}
                </span>
              </li>
            ))
          ) : (
            <li className="text-gray-500 italic">
              No recent orders
            </li>
          )}
        </ul>
      </div>

      {/* Popular Products */}
      <div className="bg-[#F9F6EB] rounded-2xl shadow-md p-6 hover:shadow-lg transition">
        <h3 className="text-xl font-semibold mb-4 text-blue-800">
          Popular Products
        </h3>

        <ul className="space-y-3">
          {popularProducts.length > 0 ? (
            popularProducts.map((p, index) => (
              <li
                key={index}
                className="flex justify-between items-center border-b pb-2 text-sm"
              >
                <span>
                  {p.emoji} {p.name}
                </span>
                <span className="font-semibold">
                  {p.count} sold
                </span>
              </li>
            ))
          ) : (
            <li className="text-gray-500 italic">
              No sales data
            </li>
          )}
        </ul>
      </div>
    </section>

    {/* Charts */}
    <h3 className="text-center text-2xl font-bold text-blue-800 mb-6">
      Analytics Overview
    </h3>

<section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">

  {/* Revenue Trend */}
  <div className="bg-white rounded-2xl shadow-md p-6">
    <h4 className="mb-4 font-semibold text-center">
      Revenue Trend
    </h4>

    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={revenueTrendData}>
        <defs>
          <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
          </linearGradient>
        </defs>

        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Legend />

        <Area
          type="monotone"
          dataKey="revenue"
          stroke="#6366f1"
          fillOpacity={1}
          fill="url(#colorRevenue)"
        />
      </AreaChart>
    </ResponsiveContainer>
  </div>

  {/* Popular Products Radar */}
  <div className="bg-white rounded-2xl shadow-md p-6">
    <h4 className="mb-4 font-semibold text-center">
      Product Popularity
    </h4>

    <ResponsiveContainer width="100%" height={300}>
      <RadarChart data={radarData}>
        <PolarGrid />
        <PolarAngleAxis dataKey="subject" />
        <PolarRadiusAxis />
        <Radar
          name="Sales"
          dataKey="A"
          stroke="#22c55e"
          fill="#22c55e"
          fillOpacity={0.6}
        />
        <Legend />
      </RadarChart>
    </ResponsiveContainer>
  </div>

</section>

  </main>
);

};

export default Dashboard;
