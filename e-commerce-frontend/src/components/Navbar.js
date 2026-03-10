import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        {/* Logo */}

        <Link to="/" className="text-xl font-bold">
          MERN Store
        </Link>

        {/* Menu */}

        <div className="space-x-6">
          <Link to="/" className="hover:text-gray-200">
            Home
          </Link>

          <Link to="/products" className="hover:text-gray-200">
            Products
          </Link>

          <Link to="/cart" className="hover:text-gray-200">
            Cart
          </Link>

          <Link to="/login" className="hover:text-gray-200">
            Login
          </Link>

          <Link to="/register" className="hover:text-gray-200">
            Register
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
