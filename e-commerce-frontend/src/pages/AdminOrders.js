import React, { useEffect, useState } from "react";
import axios from "axios";

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("jwtToken");

  useEffect(() => {
    fetchOrders();
    fetchEmployees();
    
  }, []);

  const assignOrder = async (orderId, employeeId) => {
    try {
      await axios.put(
        `http://localhost:5000/api/orders/${orderId}/assign`,
        { employeeId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      fetchOrders();
    } catch (error) {
      console.log("Assign Order Error:", error.response?.data);
    }
  };

  const fetchEmployees = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/employees", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setEmployees(res.data);
    } catch (error) {
      console.log("Fetch Employees Error:", error.response?.data);
    }
  };

  // FETCH ORDERS
  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/orders/admin", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setOrders(res.data);
      setLoading(false);
    } catch (error) {
      console.log("Fetch Orders Error:", error.response?.data);
      setLoading(false);
    }
  };

  // UPDATE ORDER STATUS
  const updateStatus = async (id, status) => {
    try {
      await axios.put(
        `http://localhost:5000/api/orders/${id}/status`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      fetchOrders();
    } catch (error) {
      console.log("Update Status Error:", error.response?.data);
      alert("Failed to update order");
    }
  };

  // CANCEL ORDER
  const cancelOrder = async (id) => {
    if (!window.confirm("Are you sure you want to cancel this order?")) {
      return;
    }

    try {
      await axios.put(
        `http://localhost:5000/api/orders/${id}/cancel`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      fetchOrders();
    } catch (error) {
      console.log("Cancel Order Error:", error.response?.data);
      alert("Cancel order failed");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-xl dark:text-white">
        Loading Orders...
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 bg-gray-100 dark:bg-gray-900">
      <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">
        Manage Orders
      </h1>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-200 dark:bg-gray-700">
            <tr>
              <th className="p-3">Order ID</th>
              <th className="p-3">Customer</th>
              <th className="p-3">Items</th>
              <th className="p-3">Total</th>
              <th className="p-3">Status</th>
              <th className="p-3">Assign Employee</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr
                key={order._id}
                className="border-b hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <td className="p-3 dark:text-white">{order._id.slice(-6)}</td>

                <td className="p-3 dark:text-white">
                  {order.user?.name || "Unknown"}
                </td>

                <td className="p-3 dark:text-white">
                  {order.items.length} items
                </td>

                <td className="p-3 dark:text-white">${order.totalPrice}</td>

                <td className="p-3">
                  <select
                    onChange={(e) => assignOrder(order._id, e.target.value)}
                    className="border rounded p-1"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Assign
                    </option>

                    {employees.map((emp) => (
                      <option key={emp._id} value={emp._id}>
                        {emp.name}
                      </option>
                    ))}
                  </select>
                </td>

                {/* STATUS */}

                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded text-sm font-semibold
                    ${
                      order.status === "Delivered"
                        ? "bg-green-500 text-white"
                        : order.status === "Shipped"
                          ? "bg-blue-500 text-white"
                          : order.status === "Cancelled"
                            ? "bg-red-500 text-white"
                            : "bg-yellow-500 text-white"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>

                {/* ACTION BUTTONS */}

                <td className="p-3 space-x-2">
                  <button
                    disabled={
                      order.status === "Delivered" ||
                      order.status === "Cancelled"
                    }
                    onClick={() => updateStatus(order._id, "Shipped")}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 disabled:opacity-50"
                  >
                    Ship
                  </button>

                  <button
                    disabled={
                      order.status === "Delivered" ||
                      order.status === "Cancelled"
                    }
                    onClick={() => updateStatus(order._id, "Delivered")}
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 disabled:opacity-50"
                  >
                    Deliver
                  </button>

                  <button
                    disabled={order.status === "Cancelled"}
                    onClick={() => cancelOrder(order._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 disabled:opacity-50"
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminOrders;
