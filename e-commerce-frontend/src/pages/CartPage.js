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
      <div className="text-center py-20 text-gray-700 dark:text-gray-300">
        Your cart is empty 🛒
      </div>
    );
  }

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-6 ">
        <h1 className="text-4xl font-bold mb-10 text-gray-800 dark:text-white">
          Your Cart
        </h1>

        <div className="space-y-6">
          {cartItems.map((item) => (
            <div
              key={item.product._id}
              className="flex flex-col md:flex-row items-center
              bg-white dark:bg-gray-800
              border border-gray-200 dark:border-gray-700
              rounded-xl shadow-md p-6 gap-6"
            >
              {/* Product Image */}

              <img
                src={defaultImage}
                alt={item.product.name}
                className="w-32 h-32 object-cover rounded-lg"
              />

              {/* Product Info */}

              <div className="flex-1">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                  {item.product.name}
                </h2>

                <p className="text-blue-600 dark:text-blue-400 font-bold mt-2">
                  ${item.product.price}
                </p>
              </div>

              {/* Quantity Controls */}

              <div className="flex items-center gap-3">
                <button
                  onClick={() => decreaseQty(item)}
                  className="bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded"
                >
                  -
                </button>

                <span className="text-gray-800 dark:text-white">
                  {item.quantity}
                </span>

                <button
                  onClick={() => increaseQty(item)}
                  className="bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded"
                >
                  +
                </button>
              </div>

              {/* Remove Button */}

              <button
                onClick={() => handleRemove(item.product._id)}
                className="text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        {/* Total Section */}

        <div className="mt-10 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            Total: ${totalPrice.toFixed(2)}
          </h2>

          <button
            onClick={() => navigate("/checkout")}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg"
          >
            Proceed to Checkout
          </button>
          <button
            onClick={() => dispatch(clearCart())}
            className="bg-red-500 text-white px-4 py-2 rounded ml-4"
          >
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
