import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addItem } from "../store/cartSlice";
import defaultImage from "../assets/default-product.png";

function ProductCard({ product }) {
  const dispatch = useDispatch();

  const handleAddToCart = (e) => {
    e.preventDefault();
    dispatch(addItem(product));
    alert(`${product.name} added to cart`);
  };

  return (
    <div
      className="
      bg-white
      dark:bg-gray-800
      border border-gray-200
      dark:border-gray-700
      rounded-xl
      shadow-md
      hover:shadow-2xl
      hover:-translate-y-1
      transition duration-300
      overflow-hidden
      group
      flex flex-col
      "
    >
      <Link to={`/products/${product._id}`} className="flex-grow">
        {/* IMAGE */}

        <div className="overflow-hidden">
          <img
            src={defaultImage}
            alt={product.name}
            className="
            w-full h-48 sm:h-52
            object-cover
            group-hover:scale-110
            transition duration-300
            "
          />
        </div>

        {/* PRODUCT DETAILS */}

        <div className="p-4">
          <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-white">
            {product.name}
          </h3>

          <p className="text-sm text-gray-500 dark:text-gray-400">
            {product.category}
          </p>

          <p className="text-blue-600 dark:text-blue-400 font-bold mt-2 text-lg">
            ${product.price}
          </p>

          <p className="text-sm mt-1 text-gray-600 dark:text-gray-300">
            {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
          </p>
        </div>
      </Link>

      {/* ADD TO CART */}

      <div className="px-4 pb-4">
        <button
          onClick={handleAddToCart}
          disabled={product.countInStock === 0}
          className="
          w-full
          bg-blue-600
          hover:bg-blue-700
          text-white
          py-2
          rounded-lg
          font-semibold
          transition
          disabled:bg-gray-400
          "
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
