import React from "react";
import { Link } from "react-router-dom";

function ProductCard({ product }) {
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
hover:scale-105 
transition duration-300
overflow-hidden
"
    >
      <Link to={`/products/${product._id}`}>
        <img
          src={product.imageUrl || "https://via.placeholder.com/300"}
          alt={product.name}
          className="w-full h-48 object-cover"
        />

        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
            {product.name}
          </h3>

          <p className="text-blue-600 font-bold mt-2">${product.price}</p>
        </div>
      </Link>
    </div>
  );
}

export default ProductCard;
