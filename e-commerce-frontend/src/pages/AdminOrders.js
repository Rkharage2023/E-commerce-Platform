import React, { useEffect, useState } from "react";
import axios from "axios";

function AdminOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("jwtToken");

        const res = await axios.get("http://localhost:5000/api/orders", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setOrders(res.data);
      } catch (error) {
        console.error("Failed to fetch orders", error);
      }
    };

    fetchOrders();
  }, []);

  const markDelivered = async (id) => {
    try {
      const token = localStorage.getItem("jwtToken");

      await axios.put(
        `http://localhost:5000/api/orders/${id}/deliver`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      alert("Order marked as delivered");

      window.location.reload();
    } catch (error) {
      alert("Failed to update order");
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-10">
      <h1 className="text-4xl font-bold mb-10 dark:text-white text-center">
        Admin Orders
      </h1>

      <div className="overflow-x-auto">
        <table className="w-full border rounded-lg">
          <thead className="bg-gray-200 dark:bg-gray-700">
            <tr>
              <th className="p-3">Order ID</th>
              <th className="p-3">User</th>
              <th className="p-3">Total</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className="border text-center">
                <td className="p-3">{order._id}</td>

                <td className="p-3">{order.user?.name || "Unknown"}</td>

                <td className="p-3">${order.totalPrice}</td>

                <td className="p-3">
                  {order.status === "Delivered" ? (
                    <span className="text-green-600 font-semibold">
                      Delivered
                    </span>
                  ) : order.status === "Cancelled" ? (
                    <span className="text-red-600 font-semibold">
                      Cancelled
                    </span>
                  ) : (
                    <span className="text-yellow-600 font-semibold">
                      Pending
                    </span>
                  )}
                </td>

                <td className="p-3 space-x-2">
                  {order.status === "Pending" && (
                    <button
                      onClick={() => markDelivered(order._id)}
                      className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                    >
                      Mark Delivered
                    </button>
                  )}
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
