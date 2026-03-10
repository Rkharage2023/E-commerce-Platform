import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function HomePage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/products");

        setProducts(res.data.slice(0, 4)); // show first 4 products
      } catch (err) {
        console.log(err);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}

      <div className="bg-blue-600 text-white py-16 text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to MERN Store</h1>

        <p className="text-lg mb-6">Discover the best products online</p>

        <Link
          to="/products"
          className="bg-white text-blue-600 px-6 py-2 rounded font-semibold"
        >
          Shop Now
        </Link>
      </div>

      {/* Featured Products */}

      <div className="max-w-6xl mx-auto py-10 px-4">
        <h2 className="text-2xl font-bold mb-6">Featured Products</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white p-4 rounded shadow hover:shadow-lg"
            >
              <img
                src={product.imageUrl || "https://via.placeholder.com/300"}
                alt={product.name}
                className="h-40 w-full object-cover mb-3"
              />

              <h3 className="font-semibold">{product.name}</h3>

              <p className="text-gray-700">${product.price}</p>

              <Link
                to={`/products/${product._id}`}
                className="text-blue-600 text-sm mt-2 block"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
