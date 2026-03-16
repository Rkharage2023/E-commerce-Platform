import React from "react";
import { Link } from "react-router-dom";
import { FaBoxOpen, FaClipboardList, FaUsers } from "react-icons/fa";

function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition duration-300 px-4 sm:px-6 md:px-10 py-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-10 text-gray-900 dark:text-white text-center sm:text-left">
          Admin Dashboard
        </h1>

        {/* Dashboard Cards */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Products */}

          <Link to="/admin/products">
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 sm:p-8 hover:scale-105 hover:shadow-xl transition duration-300 cursor-pointer">
              <FaBoxOpen className="text-3xl sm:text-4xl text-blue-500 mb-4" />

              <h2 className="text-lg sm:text-xl font-semibold dark:text-white mb-1">
                Manage Products
              </h2>

              <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base">
                Add, update or delete products
              </p>
            </div>
          </Link>

          {/* Orders */}

          <Link to="/admin/orders">
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 sm:p-8 hover:scale-105 hover:shadow-xl transition duration-300 cursor-pointer">
              <FaClipboardList className="text-3xl sm:text-4xl text-green-500 mb-4" />

              <h2 className="text-lg sm:text-xl font-semibold dark:text-white mb-1">
                Manage Orders
              </h2>

              <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base">
                View and update customer orders
              </p>
            </div>
          </Link>

          {/* Employees */}

          <Link to="/admin/employees">
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 sm:p-8 hover:scale-105 hover:shadow-xl transition duration-300 cursor-pointer">
              <FaUsers className="text-3xl sm:text-4xl text-purple-500 mb-4" />

              <h2 className="text-lg sm:text-xl font-semibold dark:text-white mb-1">
                Employees
              </h2>

              <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base">
                Manage staff accounts
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
