import React, { useState } from "react";
import axios from "axios";
import { API_URL } from "../utils/api";

function AddProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("jwtToken");

    await axios.post(
      `${API_URL}/api/products`,
      {
        name,
        price,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    alert("Product Added");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-100 dark:bg-gray-900">
      <form
        onSubmit={submitHandler}
        className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-xl shadow-lg w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-center dark:text-white">
          Add Product
        </h2>

        <div>
          <label className="block text-sm mb-1 dark:text-gray-200">
            Product Name
          </label>

          <input
            placeholder="Enter product name"
            onChange={(e) => setName(e.target.value)}
            className="border border-gray-300 p-2.5 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-sm mb-1 dark:text-gray-200">Price</label>

          <input
            placeholder="Enter product price"
            onChange={(e) => setPrice(e.target.value)}
            className="border border-gray-300 p-2.5 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>

        <button className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition">
          Add Product
        </button>
      </form>
    </div>
  );
}

export default AddProduct;
