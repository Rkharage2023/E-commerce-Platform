import defaultImage from "../assets/default-product.png";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addItem } from "../store/cartSlice";
import { API_URL } from "../utils/api";

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);

        const response = await axios.get(`${API_URL}/api/products/${id}`);

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
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-700 dark:text-white">
        Loading product...
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        {error}
      </div>
    );

  if (!product)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-700 dark:text-white">
        Product not found.
      </div>
    );

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen py-10 px-4 sm:px-6 md:px-10">
      <div className="max-w-6xl mx-auto">
        <div
          className="
          bg-white dark:bg-gray-800
          rounded-xl
          shadow-lg
          p-6 sm:p-8
          flex flex-col lg:flex-row
          items-center
          gap-8
          "
        >
          {/* PRODUCT IMAGE */}

          <div className="w-full lg:w-1/2 flex justify-center">
            <img
              src={defaultImage}
              alt={product.name}
              className="
              w-64 sm:w-80 lg:w-full
              max-h-96
              object-cover
              rounded-lg
              shadow-md
              "
            />
          </div>

          {/* PRODUCT DETAILS */}

          <div className="w-full lg:w-1/2">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-800 dark:text-white">
              {product.name}
            </h2>

            <p className="text-2xl text-blue-600 dark:text-blue-400 font-bold mb-4">
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
              disabled={!product}
              className="
              bg-blue-600
              text-white
              px-6
              py-3
              rounded-lg
              font-semibold
              hover:bg-blue-700
              transition
              disabled:opacity-50
              disabled:cursor-not-allowed
              w-full sm:w-auto
              "
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
