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
    <div className="mx-auto p-6 bg-gray-100 dark:bg-gray-900 min-h-screen py-12">
      <h1 className="text-gray-900 dark:text-white text-3xl font-bold mb-6">
        Checkout
      </h1>

      {cartItems.map((item) => (
        <div
          key={item.product._id}
          className="flex justify-between border-b py-3"
        >
          <span className="text-gray-700 dark:text-white">
            {item.product.name} x {item.quantity}
          </span>

          <span className="text-gray-700 dark:text-white">
            ${(item.product.price * item.quantity).toFixed(2)}
          </span>
        </div>
      ))}

      <h2 className="text-gray-700 dark:text-white text-xl font-bold mt-6">
        Total: ${totalPrice.toFixed(2)}
      </h2>

      <button
        onClick={() =>
          navigate("/payment", {
            state: {
              cartItems,
              totalPrice,
            },
          })
        }
        className="mt-6 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg"
      >
        Proceed to Payment
      </button>
    </div>
  );
}

export default CheckoutPage;
