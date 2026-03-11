import React from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { selectCartItems, clearCart } from "../store/cartSlice";
import { useNavigate } from "react-router-dom";

function CheckoutPage() {
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const total = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0,
  );

  const placeOrder = async () => {
    try {
      const token = localStorage.getItem("jwtToken");

      const orderItems = cartItems.map((item) => ({
        product: item.product._id,
        name: item.product.name,
        qty: item.quantity,
        price: item.product.price,
        image: item.product.imageUrl,
      }));

      await axios.post(
        "http://localhost:5000/api/orders",
        {
          items: orderItems,
          totalPrice: total,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      dispatch(clearCart());

      alert("Order placed successfully!");

      navigate("/orders");
    } catch (error) {
      alert("Order failed");
    }
  };

  return (
    <div className="mx-auto p-6 bg-gray-100 dark:bg-gray-900 min-h-screen py-12">
      <h1 className="text-gray-900 dark:text-white text-3xl font-bold mb-6">
        Checkout
      </h1>

      {cartItems.map((item) => (
        <div
          key={item.product._id}
          className="flex justify-between border-b py-2"
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
        Total: ${total.toFixed(2)}
      </h2>

      <button
        onClick={placeOrder}
        className="mt-6 bg-green-600 text-white px-6 py-2 rounded"
      >
        Place Order
      </button>
    </div>
  );
}

export default CheckoutPage;
