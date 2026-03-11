import React from "react";

function AdminDashboard() {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-10 dark:text-white">Dashboard</h1>

      <div className="grid grid-cols-3 gap-6">
        <div className="bg-blue-500 text-white p-6 rounded-lg">
          <h2 className="text-2xl">Products</h2>
          <p>Total Products</p>
        </div>

        <div className="bg-green-500 text-white p-6 rounded-lg">
          <h2 className="text-2xl">Orders</h2>
          <p>Total Orders</p>
        </div>

        <div className="bg-purple-500 text-white p-6 rounded-lg">
          <h2 className="text-2xl">Users</h2>
          <p>Total Users</p>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
