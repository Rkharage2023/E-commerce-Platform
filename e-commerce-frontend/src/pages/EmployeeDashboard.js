import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../utils/api";

function EmployeeDashboard() {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem("jwtToken");

  useEffect(() => {
    fetchOrders();
    // eslint-disable-next-line
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/orders/employee/orders`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const markDelivered = async (id) => {
    try {
      await axios.put(
        `${API_URL}/api/orders/employee/orders/${id}/deliver`,
        {},
        { headers: { Authorization: `Bearer ${token}` } },
      );
      fetchOrders();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 px-4 sm:px-6 md:px-10 py-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 text-gray-900 dark:text-white">
          Employee Dashboard
        </h1>

        {orders.length === 0 && (
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            No orders assigned to you.
          </p>
        )}

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow overflow-x-auto">
          <table className="w-full text-sm sm:text-base">
            <thead className="bg-gray-200 dark:bg-gray-700">
              <tr>
                <th className="p-3 text-left">Order ID</th>
                <th className="p-3 text-left">Customer</th>
                <th className="p-3 text-left">Items</th>
                <th className="p-3 text-left">Total</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr
                  key={order._id}
                  className="border-b dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                >
                  <td className="p-3 dark:text-white">{order._id.slice(-6)}</td>
                  <td className="p-3 dark:text-white">{order.user?.name}</td>
                  <td className="p-3 dark:text-white">
                    {order.items.length} items
                  </td>
                  <td className="p-3 dark:text-white">${order.totalPrice}</td>
                  <td className="p-3">
                    {/* Fixed: was order.orderStatus — correct field is order.status */}
                    <span className="bg-blue-500 text-white px-3 py-1 rounded text-sm">
                      {order.status}
                    </span>
                  </td>
                  <td className="p-3">
                    <button
                      onClick={() => markDelivered(order._id)}
                      className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition w-full sm:w-auto"
                    >
                      Mark Delivered
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default EmployeeDashboard;
