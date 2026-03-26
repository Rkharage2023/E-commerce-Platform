import React from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearCart } from "../store/cartSlice";
import { API_URL } from "../utils/api";

function PaymentPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const { cartItems, totalPrice } = location.state || {};
  const token = localStorage.getItem("jwtToken");

  const handlePayment = async () => {
    try {
      // Fixed: map Redux cart items { product: {...}, quantity }
      // to Order model shape: { product (id), name, price, qty }
      const orderItems = cartItems.map((item) => ({
        product: item.product._id,
        name: item.product.name,
        price: item.product.price,
        qty: item.quantity,
      }));

      await axios.post(
        `${API_URL}/api/orders`,
        { items: orderItems, totalPrice },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      dispatch(clearCart());
      alert("Payment Successful!");
      navigate("/orders");
    } catch (error) {
      console.log(error.response?.data);
      alert("Payment failed. Please try again.");
    }
  };

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-700 dark:text-white">
        No items to pay for.
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
      <div className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-xl shadow-xl w-full max-w-md">
        <h2 className="text-xl sm:text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">
          Payment
        </h2>

        <div className="text-center mb-6">
          <p className="text-gray-700 dark:text-gray-300 mb-2">Total Amount</p>
          <p className="text-2xl sm:text-3xl font-bold text-green-600">
            ${totalPrice?.toFixed(2)}
          </p>
        </div>

        <button
          onClick={handlePayment}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg transition"
        >
          Pay Now
        </button>
      </div>
    </div>
  );
}

export default PaymentPage;