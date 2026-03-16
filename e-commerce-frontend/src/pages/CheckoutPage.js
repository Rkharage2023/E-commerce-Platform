import React from "react";
import { useSelector } from "react-redux";
import { selectCartItems } from "../store/cartSlice";
import { useNavigate } from "react-router-dom";

function CheckoutPage() {
  const cartItems = useSelector(selectCartItems);
  const navigate = useNavigate();

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0,
  );

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 px-4 sm:px-6 md:px-10 py-10">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow p-6 sm:p-8">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-900 dark:text-white">
          Checkout
        </h1>

        {/* ORDER ITEMS */}

        <div className="space-y-3">
          {cartItems.map((item) => (
            <div
              key={item.product._id}
              className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 py-3"
            >
              <span className="text-gray-700 dark:text-white text-sm sm:text-base">
                {item.product.name} × {item.quantity}
              </span>

              <span className="text-gray-700 dark:text-white font-medium">
                ${(item.product.price * item.quantity).toFixed(2)}
              </span>
            </div>
          ))}
        </div>

        {/* TOTAL */}

        <div className="mt-6 flex justify-between items-center">
          <h2 className="text-lg sm:text-xl font-bold text-gray-700 dark:text-white">
            Total
          </h2>

          <span className="text-xl sm:text-2xl font-bold text-blue-600">
            ${totalPrice.toFixed(2)}
          </span>
        </div>

        {/* PAYMENT BUTTON */}

        <button
          onClick={() =>
            navigate("/payment", {
              state: {
                cartItems,
                totalPrice,
              },
            })
          }
          className="mt-6 w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition"
        >
          Proceed to Payment
        </button>
      </div>
    </div>
  );
}

export default CheckoutPage;
