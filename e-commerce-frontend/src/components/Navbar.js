import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/authSlice";

function Navbar() {
  const dispatch = useDispatch();
  const { token, user } = useSelector((state) => state.auth);

  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

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
            Cart
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
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
