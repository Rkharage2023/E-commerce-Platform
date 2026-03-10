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
  const cartItems = useSelector(selectCartItems);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        // Replace with your actual API endpoint
        const response = await axios.get(
          `http://localhost:5000/api/products/${id}`,
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
      // Check if item already exists to potentially update quantity instead of adding new
      const existingItem = cartItems.find(
        (item) => item.product._id === product._id,
      );
      if (existingItem) {
        // Optionally dispatch updateQuantity or just inform user
        alert(
          `${product.name} is already in your cart. You can adjust quantity in the cart page.`,
        );
      } else {
        dispatch(addItem(product));
        alert(`${product.name} added to cart!`);
      }
    }
  };

  if (loading) return <div class="text-center py-10">Loading product...</div>;
  if (error) return <div class="text-center py-10 text-red-500">{error}</div>;
  if (!product) return <div class="text-center py-10">Product not found.</div>;

  return (
    <div class="container mx-auto p-4 flex flex-col md:flex-row items-center">
      <img
        src={product.imageUrl || "https://via.placeholder.com/500x400"}
        alt={product.name}
        class="w-full md:w-1/2 h-auto object-cover rounded-lg shadow-md mb-6 md:mb-0 md:mr-8"
      />
      <div class="md:w-1/2">
        <h2 class="text-3xl font-bold mb-4">{product.name}</h2>
        <p class="text-xl text-green-600 font-bold mb-6">
          ${product.price.toFixed(2)}
        </p>
        <p class="text-gray-700 mb-6 leading-relaxed">{product.description}</p>
        <button
          onClick={handleAddToCart}
          class="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!product} // Disable if product not loaded yet
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductDetail;
