import React from "react";
import { Link, Outlet } from "react-router-dom";

function AdminLayout() {
  return (
    <div className="flex min-h-screen">
      {/* SIDEBAR */}

      <div className="w-64 bg-gray-900 text-white p-6">
        <h2 className="text-2xl font-bold mb-10">Admin Panel</h2>

        <nav className="space-y-4">
          <Link to="/admin" className="block hover:text-blue-400">
            Dashboard
          </Link>

          <Link to="/admin/products" className="block hover:text-blue-400">
            Products
          </Link>

          <Link to="/admin/orders" className="block hover:text-blue-400">
            Orders
          </Link>

          <Link to="/admin/employees" className="block hover:text-blue-400">
            Employees
          </Link>
        </nav>
      </div>

      {/* MAIN CONTENT */}

      <div className="flex-1 bg-gray-100 dark:bg-gray-900 p-10">
        <Outlet />
      </div>
    </div>
  );
}

export default AdminLayout;
