import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";

function HomePage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/products");
        setProducts(res.data);
      } catch (error) {
        console.log("Error loading products");
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen">
      {/* HERO SECTION */}

      <div
        className="bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 
text-white py-24 text-center"
      >
        <h1 className="text-5xl font-bold mb-4">Welcome to ShopHub</h1>

        <p className="text-lg mb-6 opacity-90">
          Discover amazing products at unbeatable prices
        </p>

        <a
          href="/products"
          className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold
    hover:bg-gray-200 transition duration-300"
        >
          Shop Now
        </a>
      </div>

      {/* PRODUCT SECTION */}

      <div className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white">
          Featured Products
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
