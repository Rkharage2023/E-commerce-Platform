import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  selectCartItems,
  removeItem,
  updateQuantity,
  clearCart,
} from "../store/cartSlice";
import defaultImage from "../assets/default-product.png";

function CartPage() {
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRemove = (id) => {
    dispatch(removeItem(id));
  };

  const increaseQty = (item) => {
    dispatch(
      updateQuantity({
        productId: item.product._id,
        quantity: item.quantity + 1,
      }),
    );
  };

  const decreaseQty = (item) => {
    if (item.quantity <= 1) return;

    dispatch(
      updateQuantity({
        productId: item.product._id,
        quantity: item.quantity - 1,
      }),
    );
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0,
  );

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex justify-center items-center text-lg sm:text-xl text-gray-700 dark:text-gray-300">
        Your cart is empty 🛒
      </div>
    );
  }

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen py-10 px-4 sm:px-6 md:px-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 text-gray-800 dark:text-white">
          Your Cart
        </h1>

        {/* CART ITEMS */}

        <div className="space-y-6">
          {cartItems.map((item) => (
            <div
              key={item.product._id}
              className="flex flex-col sm:flex-row items-center
              bg-white dark:bg-gray-800
              border border-gray-200 dark:border-gray-700
              rounded-xl shadow-md p-4 sm:p-6 gap-6"
            >
              <img
                src={defaultImage}
                alt={item.product.name}
                className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-lg"
              />

              {/* PRODUCT INFO */}

              <div className="flex-1 text-center sm:text-left">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white">
                  {item.product.name}
                </h2>

                <p className="text-blue-600 dark:text-blue-400 font-bold mt-1 sm:mt-2">
                  ${item.product.price}
                </p>
              </div>

              {/* QUANTITY CONTROLS */}

              <div className="flex items-center gap-3">
                <button
                  onClick={() => decreaseQty(item)}
                  className="bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded hover:bg-gray-300 dark:hover:bg-gray-600"
                >
                  -
                </button>

                <span className="text-gray-800 dark:text-white font-medium">
                  {item.quantity}
                </span>

                <button
                  onClick={() => increaseQty(item)}
                  className="bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded hover:bg-gray-300 dark:hover:bg-gray-600"
                >
                  +
                </button>
              </div>

              {/* REMOVE BUTTON */}

              <button
                onClick={() => handleRemove(item.product._id)}
                className="text-red-500 hover:text-red-700 font-medium"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        {/* CART SUMMARY */}

        <div className="mt-10 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white">
            Total: ${totalPrice.toFixed(2)}
          </h2>

          <div className="mt-6 flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => navigate("/checkout")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg w-full sm:w-auto"
            >
              Proceed to Checkout
            </button>

            <button
              onClick={() => dispatch(clearCart())}
              className="bg-red-500 hover:bg-red-600 text-white px-5 py-3 rounded-lg w-full sm:w-auto"
            >
              Clear Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
