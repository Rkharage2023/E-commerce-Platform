import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";

function ProductListPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          "https://e-commerce-platform-yogr.onrender.com/api/products",
        );

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
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* Page Title */}

        <h1 className="text-4xl font-bold mb-10 text-gray-800 dark:text-white">
          All Products
        </h1>

        {/* Loading */}

        {loading ? (
          <p className="text-gray-600 dark:text-gray-300">
            Loading products...
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductListPage;
