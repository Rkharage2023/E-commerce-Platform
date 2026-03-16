import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/authSlice";
import { selectCartItems } from "../store/cartSlice";
import { FaUserShield } from "react-icons/fa";

function Navbar() {
  const dispatch = useDispatch();

  const { token: reduxToken, user: reduxUser } = useSelector(
    (state) => state.auth,
  );

  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("jwtToken");

  const user = reduxUser || storedUser;
  const token = reduxToken || storedToken;

  const cartItems = useSelector(selectCartItems);
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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
    localStorage.removeItem("user");
  };

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md transition duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
        {/* LOGO */}

        <Link
          to="/"
          className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-yellow-400"
        >
          ShopHub
        </Link>

        {/* MOBILE MENU BUTTON */}

        <button
          className="sm:hidden text-gray-700 dark:text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

        {/* NAV LINKS */}

        <div
          className={`${
            menuOpen ? "flex" : "hidden"
          } sm:flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 absolute sm:static top-16 left-0 w-full sm:w-auto bg-white dark:bg-gray-900 sm:bg-transparent px-6 sm:px-0 py-4 sm:py-0 shadow sm:shadow-none`}
        >
          <Link
            to="/"
            className="text-gray-700 dark:text-gray-200 hover:text-blue-500"
          >
            Home
          </Link>

          {/* NORMAL USER LINKS */}

          {(!user?.role || user?.role === "user") && (
            <>
              <Link
                to="/products"
                className="text-gray-700 dark:text-gray-200 hover:text-blue-500"
              >
                Products
              </Link>

              <Link
                to="/cart"
                className="relative text-gray-700 dark:text-gray-200 hover:text-blue-500"
              >
                🛒 Cart
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-4 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                    {cartCount}
                  </span>
                )}
              </Link>

              <Link
                to="/orders"
                className="text-gray-700 dark:text-gray-200 hover:text-blue-500"
              >
                My Orders
              </Link>
            </>
          )}

          {/* EMPLOYEE NAVBAR */}

          {user?.role === "employee" && (
            <Link
              to="/employee"
              className="text-gray-700 dark:text-gray-200 hover:text-blue-500"
            >
              Dashboard
            </Link>
          )}

          {/* LOGIN / LOGOUT */}

          {!token ? (
            <>
              <Link
                to="/login"
                className="text-gray-700 dark:text-gray-200 hover:text-blue-500"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="text-gray-700 dark:text-gray-200 hover:text-blue-500"
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

          {/* DARK MODE */}

          <button
            onClick={() => setDarkMode(!darkMode)}
            className="bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded-lg text-sm"
          >
            {darkMode ? "☀ Light" : "🌙 Dark"}
          </button>

          {/* ADMIN ICON */}

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
