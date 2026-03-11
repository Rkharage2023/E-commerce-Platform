import React from "react";
import { Link } from "react-router-dom";
import ProductListPage from "../components/ProductListPage";

function HomePage() {
  return (
    <div className="dark:bg-gray-900 min-h-screen">
      {/* HERO SECTION */}

      <section className="text-center py-20 px-6 bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
        <h1 className="text-5xl font-bold mb-6">Welcome to EduStore</h1>

        <p className="text-lg mb-8">
          Discover amazing products with the best quality and price.
        </p>

        <Link
          to="/products"
          className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition"
        >
          Shop Now
        </Link>
      </section>

      {/* FEATURES SECTION */}

      <section className="py-16 px-6">
        <h2 className="text-3xl font-bold text-center mb-10 dark:text-white">
          Why Choose Us
        </h2>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto text-center">
          <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow">
            <h3 className="text-xl font-semibold mb-2">🚚 Fast Delivery</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Quick and reliable delivery service.
            </p>
          </div>

          <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow">
            <h3 className="text-xl font-semibold mb-2">🔒 Secure Payment</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Your payments are safe and encrypted.
            </p>
          </div>

          <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow">
            <h3 className="text-xl font-semibold mb-2">⭐ Best Quality</h3>
            <p className="text-gray-600 dark:text-gray-300">
              High quality products guaranteed.
            </p>
          </div>
        </div>
      </section>

      {/* PRODUCTS SECTION */}

      <section className="py-16 px-6">
        <h2 className="text-3xl font-bold text-center mb-10 dark:text-white">
          Featured Products
        </h2>

        <ProductListPage />
      </section>
    </div>
  );
}

export default HomePage;
