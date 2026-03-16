import React from "react";
import { Link } from "react-router-dom";
import ProductListPage from "../components/ProductListPage";

function HomePage() {
  return (
    <div className="dark:bg-gray-900 min-h-screen">
      {/* HERO SECTION */}

      <section className="text-center py-16 sm:py-20 px-4 sm:px-6 bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
            Welcome to EduStore
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
            <h3 className="text-lg sm:text-xl font-semibold mb-2">
              🚚 Fast Delivery
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
              Quick and reliable delivery service.
            </p>
          </div>

          <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-lg sm:text-xl font-semibold mb-2">
              🔒 Secure Payment
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
              Your payments are safe and encrypted.
            </p>
          </div>

          <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-lg sm:text-xl font-semibold mb-2">
              ⭐ Best Quality
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
              High quality products guaranteed.
            </p>
          </div>
        </div>
      </section>

      {/* PRODUCTS SECTION */}

      <section className="py-12 sm:py-16 px-4 sm:px-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10 dark:text-white">
          Featured Products
        </h2>

        <div className="max-w-7xl mx-auto">
          <ProductListPage />
        </div>
      </section>
    </div>
  );
}

export default HomePage;
