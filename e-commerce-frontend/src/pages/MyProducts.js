import React, { useEffect, useState } from "react";
import axios from "axios";

function MyProducts() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem("jwtToken");

      const res = await axios.get("http://localhost:5000/api/orders/myorders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setOrders(res.data);
    };

    fetchOrders();
  }, []);

  return (
    <div className="min-h-screen p-8 bg-gray-100 dark:bg-gray-900">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
        My Products
      </h1>

      {orders.map((order) => (
        <div
          key={order._id}
          className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow mb-4"
        >
          <p className="text-gray-800 dark:text-gray-200">
            Order ID: {order._id}
          </p>

          <p className="text-gray-600 dark:text-gray-300">
            Total: ₹{order.totalPrice}
          </p>

          <p className="text-green-600">Payment: {order.paymentStatus}</p>
        </div>
      ))}
    </div>
  );
}

export default MyProducts;
