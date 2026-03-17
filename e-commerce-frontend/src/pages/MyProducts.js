import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../utils/api";

function MyProducts() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem("jwtToken");

      const res = await axios.get(`${API_URL}/api/orders/myorders`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setOrders(res.data);
    };

    fetchOrders();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 px-4 sm:px-6 md:px-10 py-10">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold mb-8 text-gray-900 dark:text-white">
          My Orders
        </h1>

        {orders.length === 0 && (
          <p className="text-gray-600 dark:text-gray-300">
            You haven't placed any orders yet.
          </p>
        )}

        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white dark:bg-gray-800 p-5 sm:p-6 rounded-xl shadow"
            >
              <p className="text-gray-800 dark:text-gray-200 text-sm sm:text-base">
                <span className="font-semibold">Order ID:</span> {order._id}
              </p>

              <p className="text-gray-600 dark:text-gray-300 mt-1">
                <span className="font-semibold">Total:</span> ₹
                {order.totalPrice}
              </p>

              <p className="mt-1">
                <span className="font-semibold text-gray-700 dark:text-gray-300">
                  Payment:
                </span>{" "}
                <span
                  className={`font-medium ${
                    order.paymentStatus === "Paid"
                      ? "text-green-600"
                      : "text-yellow-600"
                  }`}
                >
                  {order.paymentStatus}
                </span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MyProducts;
