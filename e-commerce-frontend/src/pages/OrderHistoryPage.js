import React, { useState, useEffect } from "react";
import axios from "axios";

function OrderHistoryPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("jwtToken");

        const res = await axios.get(
          "https://e-commerce-platform-yogr.onrender.com/api/orders/myorders",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        setOrders(res.data);
      } catch (error) {
        console.error("Error fetching orders", error);
      }
    };

    fetchOrders();
  }, []);

  const cancelOrder = async (id) => {
    try {
      const token = localStorage.getItem("jwtToken");

      await axios.put(
        `https://e-commerce-platform-yogr.onrender.com/api/orders/${id}/cancel`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      alert("Order cancelled successfully");

      setOrders((prev) =>
        prev.map((order) =>
          order._id === id ? { ...order, status: "Cancelled" } : order,
        ),
      );
    } catch (error) {
      alert("Failed to cancel order");
    }
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen px-4 sm:px-6 md:px-10 py-10">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-10 text-center text-gray-800 dark:text-white">
          My Orders
        </h1>

        {orders.length === 0 && (
          <p className="text-center text-gray-500 dark:text-gray-400">
            You have not placed any orders yet
          </p>
        )}

        {orders.map((order) => {
          const statusColor =
            order.status === "Cancelled"
              ? "bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300"
              : order.status === "Delivered"
                ? "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300"
                : "bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-300";

          return (
            <div
              key={order._id}
              className="
              bg-white
              dark:bg-gray-800
              border
              dark:border-gray-700
              rounded-xl
              shadow-md
              hover:shadow-xl
              transition
              p-5 sm:p-6
              mb-8
              "
            >
              {/* ORDER HEADER */}

              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 mb-5">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Order ID
                  </p>

                  <p className="font-semibold text-gray-800 dark:text-white text-sm sm:text-base break-all">
                    {order._id}
                  </p>
                </div>

                <span
                  className={`px-3 py-1 text-sm rounded-full w-fit ${statusColor}`}
                >
                  {order.status}
                </span>
              </div>

              {/* ORDER ITEMS */}

              <div className="border-t dark:border-gray-700 pt-4 space-y-3">
                {order.items.map((item) => (
                  <div
                    key={item.product}
                    className="
                    flex
                    flex-col
                    sm:flex-row
                    sm:justify-between
                    sm:items-center
                    py-2
                    border-b
                    dark:border-gray-700
                    "
                  >
                    <p className="text-gray-700 dark:text-gray-300">
                      {item.name}
                    </p>

                    <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
                      Qty: {item.qty}
                    </p>
                  </div>
                ))}
              </div>

              {/* ORDER FOOTER */}

              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mt-5">
                <p className="text-lg font-bold text-gray-800 dark:text-white">
                  Total: ${order.totalPrice}
                </p>

                {order.status === "Pending" ? (
                  <button
                    onClick={() => cancelOrder(order._id)}
                    className="
                    bg-red-500
                    hover:bg-red-600
                    text-white
                    px-4
                    py-2
                    rounded-lg
                    transition
                    w-full
                    sm:w-auto
                    "
                  >
                    Cancel Order
                  </button>
                ) : order.status === "Cancelled" ? (
                  <span className="text-red-500 font-medium">
                    Order Cancelled
                  </span>
                ) : (
                  <span className="text-green-500 font-medium">Delivered</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default OrderHistoryPage;
