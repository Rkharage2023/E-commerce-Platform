import defaultImage from "../assets/default-product.png";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios"; // Assuming axios is installed
import { useDispatch, useSelector } from "react-redux";
import { addItem, selectCartItems } from "../store/cartSlice";

function ProductDetail() {
  const { id } = useParams(); // Get product ID from URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        // Replace with your actual API endpoint
        const response = await axios.get(
          `https://e-commerce-platform-yogr.onrender.com/api/products/${id}`,
        );
        setProduct(response.data);
        setError(null);
      } catch (err) {
        setError("Failed to load product details.");
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      dispatch(addItem(product));

      alert(`${product.name} added to cart`);

      navigate("/cart");
    }
  };

  if (loading)
    return <div className="text-center py-10">Loading product...</div>;
  if (error)
    return <div className="text-center py-10 text-red-500">{error}</div>;
  if (!product)
    return <div className="text-center py-10">Product not found.</div>;

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen py-16">
      <div className="container mx-auto px-6">
        <div
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8
      flex flex-col md:flex-row items-center gap-10"
        >
          {/* Product Image */}

          <img
            src={defaultImage}
            alt={product.name}
            className="w-52 md:w-1/2 h-auto object-cover rounded-lg shadow-md"
          />

          {/* Product Details */}

          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">
              {product.name}
            </h2>

            <p className="text-2xl text-blue-600 dark:text-blue-400 font-bold mb-6">
              ${product.price.toFixed(2)}
            </p>

            <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
              {product.description}
            </p>

            <p className="mb-6 text-gray-600 dark:text-gray-300">
              {product.countInStock > 0 ? (
                <span className="text-green-500 font-semibold">In Stock</span>
              ) : (
                <span className="text-red-500 font-semibold">Out of Stock</span>
              )}
            </p>

            <button
              onClick={handleAddToCart}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold
            hover:bg-blue-700 transition duration-300
            disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!product}
            >
              Add To Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
