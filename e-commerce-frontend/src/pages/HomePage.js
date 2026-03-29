import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import { API_URL } from "../utils/api";

function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/products`);
        setProducts(res.data);
        setLoading(false);
      } catch (error) {
        console.log("Error fetching products");
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="dark:bg-gray-900 min-h-screen">
      {/* HERO SECTION */}
      <section className="text-center py-16 sm:py-20 px-4 sm:px-6 bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
            Welcome to ShopHub
          </h1>
          <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 max-w-2xl mx-auto">
            Discover amazing products with the best quality and price.
          </p>
          <Link
            to="/products"
            className="inline-block bg-white text-blue-600 px-6 sm:px-8 py-3 rounded-lg font-semibold hover:bg-gray-200 transition shadow-md"
          >
            Shop Now
          </Link>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="py-12 sm:py-16 px-4 sm:px-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10 dark:text-white">
          Why Choose Us
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto text-center">
          <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-lg sm:text-xl font-semibold mb-2 dark:text-white">
              🚚 Fast Delivery
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
              Quick and reliable delivery service.
            </p>
          </div>
          <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-lg sm:text-xl font-semibold mb-2 dark:text-white">
              🔒 Secure Payment
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
              Your payments are safe and encrypted.
            </p>
          </div>
          <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-lg sm:text-xl font-semibold mb-2 dark:text-white">
              ⭐ Best Quality
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
              High quality products guaranteed.
            </p>
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS SECTION */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 bg-gray-100 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold dark:text-white">
              Featured Products
            </h2>
            <Link
              to="/products"
              className="text-blue-600 dark:text-blue-400 hover:underline font-medium text-sm sm:text-base"
            >
              View All →
            </Link>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-20 text-gray-600 dark:text-gray-300">
              Loading products...
            </div>
          ) : (
            // Show only first 4 products as featured
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.slice(0, 4).map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}

          <div className="text-center mt-10">
            <Link
              to="/products"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition"
            >
              See All Products
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
