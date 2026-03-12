import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/authSlice";
import { selectCartItems } from "../store/cartSlice";
import { FaUserShield } from "react-icons/fa";

function Navbar() {
  const dispatch = useDispatch();
  const { token, user } = useSelector((state) => state.auth);
  console.log(user);

  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const cartItems = useSelector(selectCartItems);

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("jwtToken");
  };

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md transition duration-300">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold text-blue-600 dark:text-yellow-400"
        >
          ShopHub
        </Link>

        <div className="flex items-center gap-6">
          <Link
            to="/"
            className="text-gray-700 dark:text-gray-200 hover:text-blue-500 transition"
          >
            Home
          </Link>

          <Link
            to="/products"
            className="text-gray-700 dark:text-gray-200 hover:text-blue-500 transition"
          >
            Products
          </Link>

          <Link
            to="/cart"
            className="text-gray-700 dark:text-gray-200 hover:text-blue-500 transition"
          >
            🛒 Cart
            {cartCount > 0 && (
              <span className="ml-1 bg-red-500 text-white px-2 py-1 rounded-full text-xs">
                {cartCount}
              </span>
            )}
          </Link>
          <Link
            to="/orders"
            className="text-gray-700 dark:text-gray-200 hover:text-blue-500 transition"
          >
            My Orders
          </Link>

          {/* LOGIN / LOGOUT LOGIC */}

          {!token ? (
            <>
              <Link
                to="/login"
                className="text-gray-700 dark:text-gray-200 hover:text-blue-500 transition"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="text-gray-700 dark:text-gray-200 hover:text-blue-500 transition"
              >
                Register
              </Link>
            </>
          ) : (
            <>
              <span className="text-gray-700 dark:text-gray-200">
                {user?.name}
              </span>

              <button
                onClick={handleLogout}
                className="text-red-500 hover:text-red-700"
              >
                Logout
              </button>
            </>
          )}

          {/* DARK MODE BUTTON */}

          <button
            onClick={() => setDarkMode(!darkMode)}
            className="bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded-lg text-sm"
          >
            {darkMode ? "☀ Light" : "🌙 Dark"}
          </button>

          {user?.role === "admin" && (
            <Link
              to="/admin"
              className="text-xl text-gray-700 dark:text-white hover:text-blue-500"
              title="Admin Dashboard"
            >
              <FaUserShield />
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
