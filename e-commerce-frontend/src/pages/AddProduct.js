import React, { useState } from "react";
import axios from "axios";

function AddProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("jwtToken");

    await axios.post(
      "http://localhost:5000/api/products",
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
    <form onSubmit={submitHandler} className="max-w-lg mx-auto">
      <input
        placeholder="Product Name"
        onChange={(e) => setName(e.target.value)}
        className="border p-2 w-full mb-4"
      />

      <input
        placeholder="Price"
        onChange={(e) => setPrice(e.target.value)}
        className="border p-2 w-full mb-4"
      />

      <button className="bg-blue-600 text-white px-4 py-2 rounded">
        Add Product
      </button>
    </form>
  );
}

export default AddProduct;
