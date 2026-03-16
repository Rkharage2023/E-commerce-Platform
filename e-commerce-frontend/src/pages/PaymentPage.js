import React from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

function PaymentPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const { cartItems, totalPrice } = location.state || {};

  const token = localStorage.getItem("jwtToken");

  const handlePayment = async () => {
    try {
      await axios.post(
        "https://e-commerce-platform-yogr.onrender.com/api/orders",
        {
          items: cartItems,
          totalPrice,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      alert("Payment Successful!");

      navigate("/my-products");
    } catch (error) {
      console.log(error.response?.data);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
      <div className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-xl shadow-xl w-full max-w-md">
        <h2 className="text-xl sm:text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">
          Payment
        </h2>

        <div className="text-center mb-6">
          <p className="text-gray-700 dark:text-gray-300 mb-2">Total Amount</p>

          <p className="text-2xl sm:text-3xl font-bold text-green-600">
            ₹ {totalPrice}
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
