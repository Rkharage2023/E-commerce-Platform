import React, { useEffect, useState } from "react";
import axios from "axios";

function AdminOrders() {
  const [orders, setOrders] = useState([]);

  const token = localStorage.getItem("jwtToken");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const res = await axios.get("http://localhost:5000/api/orders/admin", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setOrders(res.data);
  };

  const updateStatus = async (id, status) => {
    await axios.put(
      `http://localhost:5000/api/orders/${id}/status`,
      { status },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    fetchOrders();
  };

  return (
    <div className="min-h-screen p-8 bg-gray-100 dark:bg-gray-900 transition">
      <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">
        Manage Orders
      </h1>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-200 dark:bg-gray-700">
            <tr>
              <th className="p-3">Order ID</th>
              <th className="p-3">Customer</th>
              <th className="p-3">Items</th>
              <th className="p-3">Total</th>
              <th className="p-3">Status</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr
                key={order._id}
                className="border-b hover:bg-gray-100 dark:hover:bg-gray-700 transition"
              >
                <td className="p-3 dark:text-white">{order._id.slice(-6)}</td>

                <td className="p-3 dark:text-white">{order.user?.name}</td>

                <td className="p-3 dark:text-white">
                  {order.items.length} items
                </td>

                <td className="p-3 dark:text-white">${order.totalPrice}</td>

                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded text-sm font-semibold
                    ${
                      order.status === "Delivered"
                        ? "bg-green-500 text-white"
                        : order.status === "Shipped"
                          ? "bg-blue-500 text-white"
                          : order.status === "Cancelled"
                            ? "bg-red-500 text-white"
                            : "bg-yellow-500 text-white"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>

                <td className="p-3 space-x-2">
                  <button
                    onClick={() => updateStatus(order._id, "Shipped")}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  >
                    Ship
                  </button>

                  <button
                    onClick={() => updateStatus(order._id, "Delivered")}
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                  >
                    Deliver
                  </button>

                  <button
                    onClick={() => updateStatus(order._id, "Cancelled")}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminOrders;
