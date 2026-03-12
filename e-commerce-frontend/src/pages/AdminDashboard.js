import React from "react";
import { Link } from "react-router-dom";
import { FaBoxOpen, FaClipboardList, FaUsers } from "react-icons/fa";

function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition duration-300 p-8">
      <h1 className="text-4xl font-bold mb-10 text-gray-900 dark:text-white">
        Admin Dashboard
      </h1>

      {/* Dashboard Cards */}
      <div className="grid md:grid-cols-3 gap-8">
        {/* Products */}
        <Link to="/admin/products">
          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-8 hover:scale-105 hover:shadow-xl transition">
            <FaBoxOpen className="text-4xl text-blue-500 mb-4" />
            <h2 className="text-xl font-semibold dark:text-white">
              Manage Products
            </h2>
            <p className="text-gray-500 dark:text-gray-400">
              Add, update or delete products
            </p>
          </div>
        </Link>

        {/* Orders */}
        <Link to="/admin/orders">
          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-8 hover:scale-105 hover:shadow-xl transition">
            <FaClipboardList className="text-4xl text-green-500 mb-4" />
            <h2 className="text-xl font-semibold dark:text-white">
              Manage Orders
            </h2>
            <p className="text-gray-500 dark:text-gray-400">
              View and update customer orders
            </p>
          </div>
        </Link>

        {/* Employees */}
        <Link to="/admin/employees">
          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-8 hover:scale-105 hover:shadow-xl transition">
            <FaUsers className="text-4xl text-purple-500 mb-4" />
            <h2 className="text-xl font-semibold dark:text-white">Employees</h2>
            <p className="text-gray-500 dark:text-gray-400">
              Manage staff accounts
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default AdminDashboard;
