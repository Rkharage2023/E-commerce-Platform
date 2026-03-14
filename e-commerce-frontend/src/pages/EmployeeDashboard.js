import React, { useEffect, useState } from "react";
import axios from "axios";

function EmployeeDashboard() {
  const [orders, setOrders] = useState([]);

  const token = localStorage.getItem("jwtToken");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/orders/employee/orders",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setOrders(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const markDelivered = async (id) => {
    try {
      await axios.put(
        `http://localhost:5000/api/orders/employee/orders/${id}/deliver`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      fetchOrders();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen p-8 bg-gray-100 dark:bg-gray-900">
      <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">
        Employee Dashboard
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
              <tr key={order._id} className="border-b">
                <td className="p-3 dark:text-white">{order._id.slice(-6)}</td>

                <td className="p-3 dark:text-white">{order.user?.name}</td>

                <td className="p-3 dark:text-white">
                  {order.items.length} items
                </td>

                <td className="p-3 dark:text-white">${order.totalPrice}</td>

                <td className="p-3">
                  <span className="bg-blue-500 text-white px-3 py-1 rounded">
                    {order.orderStatus}
                  </span>
                </td>

                <td className="p-3">
                  <button
                    onClick={() => markDelivered(order._id)}
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
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
  );
}

export default EmployeeDashboard;
