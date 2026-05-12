import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../utils/api";
import { motion } from "framer-motion";
import {
  FiTruck,
  FiCheckCircle,
  FiXCircle,
  FiClock,
  FiUser,
  FiSearch,
  FiFilter,
  FiRefreshCw,
} from "react-icons/fi";

const STATUS_CONFIG = {
  Delivered: {
    color: "var(--success)",
    bg: "rgba(5,150,105,0.1)",
    icon: <FiCheckCircle size={12} />,
  },
  Shipped: {
    color: "var(--accent)",
    bg: "var(--accent-glow)",
    icon: <FiTruck size={12} />,
  },
  Cancelled: {
    color: "var(--danger)",
    bg: "rgba(220,38,38,0.1)",
    icon: <FiXCircle size={12} />,
  },
  Pending: {
    color: "var(--warning)",
    bg: "rgba(217,119,6,0.1)",
    icon: <FiClock size={12} />,
  },
};

function StatusBadge({ status }) {
  const cfg = STATUS_CONFIG[status] || STATUS_CONFIG.Pending;
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.3rem",
        padding: "0.25rem 0.7rem",
        borderRadius: 99,
        fontSize: "0.72rem",
        fontFamily: "Syne, sans-serif",
        fontWeight: 700,
        color: cfg.color,
        background: cfg.bg,
      }}
    >
      {cfg.icon} {status}
    </span>
  );
}

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const token = localStorage.getItem("jwtToken");

  useEffect(() => {
    fetchOrders();
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/admin/employees`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEmployees(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/orders/admin`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(res.data);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const assignOrder = async (orderId, employeeId) => {
    if (!employeeId) return;
    try {
      await axios.put(
        `${API_URL}/api/orders/${orderId}/assign`,
        { employeeId },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      fetchOrders();
    } catch (e) {
      console.log(e);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.put(
        `${API_URL}/api/orders/${id}/status`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      fetchOrders();
    } catch (e) {
      alert("Failed to update order");
    }
  };

  const cancelOrder = async (id) => {
    if (!window.confirm("Cancel this order?")) return;
    try {
      await axios.put(
        `${API_URL}/api/orders/${id}/cancel`,
        {},
        { headers: { Authorization: `Bearer ${token}` } },
      );
      fetchOrders();
    } catch (e) {
      alert("Cancel order failed");
    }
  };

  const filtered = orders.filter((o) => {
    const matchSearch =
      !search ||
      o._id.toLowerCase().includes(search.toLowerCase()) ||
      o.user?.name?.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "All" || o.status === filterStatus;
    return matchSearch && matchStatus;
  });

  return (
    <div
      style={{ maxWidth: 1280, margin: "0 auto", padding: "3rem 1.5rem 5rem" }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          flexWrap: "wrap",
          gap: "1rem",
          marginBottom: "2.5rem",
        }}
      >
        <div>
          <p className="label" style={{ marginBottom: "0.5rem" }}>
            Admin
          </p>
          <h1
            style={{
              fontFamily: "Syne, sans-serif",
              fontWeight: 800,
              fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
              color: "var(--text-1)",
            }}
          >
            Manage Orders
          </h1>
        </div>
        <button
          onClick={fetchOrders}
          className="btn btn-secondary"
          style={{ gap: "0.5rem" }}
        >
          <FiRefreshCw size={14} /> Refresh
        </button>
      </div>

      {/* Filters */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "0.875rem",
          marginBottom: "1.75rem",
          alignItems: "center",
        }}
      >
        <div style={{ position: "relative", flex: "1 1 220px", maxWidth: 340 }}>
          <FiSearch
            size={14}
            style={{
              position: "absolute",
              left: "0.9rem",
              top: "50%",
              transform: "translateY(-50%)",
              color: "var(--text-3)",
            }}
          />
          <input
            className="input"
            style={{ paddingLeft: "2.5rem" }}
            placeholder="Search orders or customer…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
          {["All", "Pending", "Shipped", "Delivered", "Cancelled"].map((s) => (
            <button
              key={s}
              onClick={() => setFilterStatus(s)}
              style={{
                padding: "0.45rem 0.875rem",
                borderRadius: 99,
                border: "1px solid",
                cursor: "pointer",
                fontFamily: "Syne, sans-serif",
                fontWeight: 600,
                fontSize: "0.78rem",
                transition: "all 0.2s",
                background:
                  filterStatus === s ? "var(--accent)" : "var(--surface)",
                borderColor:
                  filterStatus === s ? "var(--accent)" : "var(--border)",
                color: filterStatus === s ? "#fff" : "var(--text-2)",
              }}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <div
          style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}
        >
          {[1, 2, 3, 4].map((n) => (
            <div
              key={n}
              className="skeleton"
              style={{ height: 64, borderRadius: "var(--r-md)" }}
            />
          ))}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: "var(--r-lg)",
            overflow: "hidden",
            boxShadow: "var(--shadow-sm)",
          }}
        >
          <div className="table-wrap">
            <table className="table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Items</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Assign To</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td
                      colSpan={7}
                      style={{
                        textAlign: "center",
                        padding: "3rem",
                        color: "var(--text-3)",
                      }}
                    >
                      No orders match your filters
                    </td>
                  </tr>
                ) : (
                  filtered.map((order, i) => (
                    <motion.tr
                      key={order._id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.04 }}
                    >
                      <td>
                        <span
                          style={{
                            fontFamily: "Syne, sans-serif",
                            fontWeight: 700,
                            fontSize: "0.82rem",
                            color: "var(--text-2)",
                          }}
                        >
                          #{order._id.slice(-6).toUpperCase()}
                        </span>
                      </td>
                      <td>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.5rem",
                          }}
                        >
                          <div
                            style={{
                              width: 28,
                              height: 28,
                              borderRadius: "50%",
                              background: "var(--accent-glow)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              flexShrink: 0,
                            }}
                          >
                            <FiUser
                              size={12}
                              style={{ color: "var(--accent)" }}
                            />
                          </div>
                          <span
                            style={{ fontWeight: 500, fontSize: "0.875rem" }}
                          >
                            {order.user?.name || "Unknown"}
                          </span>
                        </div>
                      </td>
                      <td
                        style={{ color: "var(--text-2)", fontSize: "0.875rem" }}
                      >
                        {order.items.length} item
                        {order.items.length !== 1 ? "s" : ""}
                      </td>
                      <td>
                        <span
                          style={{
                            fontFamily: "Syne, sans-serif",
                            fontWeight: 700,
                          }}
                        >
                          ${order.totalPrice}
                        </span>
                      </td>
                      <td>
                        <StatusBadge status={order.status} />
                      </td>
                      <td>
                        <select
                          onChange={(e) =>
                            assignOrder(order._id, e.target.value)
                          }
                          defaultValue=""
                          style={{
                            background: "var(--surface-2)",
                            border: "1px solid var(--border)",
                            borderRadius: "var(--r-xs)",
                            padding: "0.4rem 0.75rem",
                            color: "var(--text-1)",
                            fontSize: "0.8rem",
                            cursor: "pointer",
                            fontFamily: "DM Sans, sans-serif",
                            outline: "none",
                            maxWidth: 140,
                          }}
                        >
                          <option value="" disabled>
                            Assign…
                          </option>
                          {employees.map((emp) => (
                            <option key={emp._id} value={emp._id}>
                              {emp.name}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td>
                        <div
                          style={{
                            display: "flex",
                            gap: "0.4rem",
                            flexWrap: "wrap",
                          }}
                        >
                          <button
                            disabled={
                              order.status === "Delivered" ||
                              order.status === "Cancelled"
                            }
                            onClick={() => updateStatus(order._id, "Shipped")}
                            style={{
                              padding: "0.35rem 0.75rem",
                              borderRadius: "var(--r-xs)",
                              background: "var(--accent-glow)",
                              color: "var(--accent)",
                              border: "none",
                              cursor: "pointer",
                              fontFamily: "Syne, sans-serif",
                              fontWeight: 600,
                              fontSize: "0.75rem",
                              opacity:
                                order.status === "Delivered" ||
                                order.status === "Cancelled"
                                  ? 0.4
                                  : 1,
                              transition: "all 0.15s",
                              display: "flex",
                              alignItems: "center",
                              gap: "0.25rem",
                            }}
                            onMouseEnter={(e) => {
                              if (!e.currentTarget.disabled)
                                e.currentTarget.style.background =
                                  "var(--accent)";
                              e.currentTarget.style.color = "#fff";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background =
                                "var(--accent-glow)";
                              e.currentTarget.style.color = "var(--accent)";
                            }}
                          >
                            <FiTruck size={11} /> Ship
                          </button>
                          <button
                            disabled={
                              order.status === "Delivered" ||
                              order.status === "Cancelled"
                            }
                            onClick={() => updateStatus(order._id, "Delivered")}
                            style={{
                              padding: "0.35rem 0.75rem",
                              borderRadius: "var(--r-xs)",
                              background: "rgba(5,150,105,0.1)",
                              color: "var(--success)",
                              border: "none",
                              cursor: "pointer",
                              fontFamily: "Syne, sans-serif",
                              fontWeight: 600,
                              fontSize: "0.75rem",
                              opacity:
                                order.status === "Delivered" ||
                                order.status === "Cancelled"
                                  ? 0.4
                                  : 1,
                              transition: "all 0.15s",
                              display: "flex",
                              alignItems: "center",
                              gap: "0.25rem",
                            }}
                            onMouseEnter={(e) => {
                              if (!e.currentTarget.disabled) {
                                e.currentTarget.style.background =
                                  "var(--success)";
                                e.currentTarget.style.color = "#fff";
                              }
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background =
                                "rgba(5,150,105,0.1)";
                              e.currentTarget.style.color = "var(--success)";
                            }}
                          >
                            <FiCheckCircle size={11} /> Deliver
                          </button>
                          <button
                            disabled={order.status === "Cancelled"}
                            onClick={() => cancelOrder(order._id)}
                            style={{
                              padding: "0.35rem 0.75rem",
                              borderRadius: "var(--r-xs)",
                              background: "rgba(220,38,38,0.08)",
                              color: "var(--danger)",
                              border: "none",
                              cursor: "pointer",
                              fontFamily: "Syne, sans-serif",
                              fontWeight: 600,
                              fontSize: "0.75rem",
                              opacity: order.status === "Cancelled" ? 0.4 : 1,
                              transition: "all 0.15s",
                              display: "flex",
                              alignItems: "center",
                              gap: "0.25rem",
                            }}
                            onMouseEnter={(e) => {
                              if (!e.currentTarget.disabled) {
                                e.currentTarget.style.background =
                                  "var(--danger)";
                                e.currentTarget.style.color = "#fff";
                              }
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background =
                                "rgba(220,38,38,0.08)";
                              e.currentTarget.style.color = "var(--danger)";
                            }}
                          >
                            <FiXCircle size={11} /> Cancel
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          {filtered.length > 0 && (
            <div
              style={{
                padding: "0.875rem 1.5rem",
                borderTop: "1px solid var(--border)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <p style={{ fontSize: "0.8rem", color: "var(--text-3)" }}>
                Showing {filtered.length} of {orders.length} orders
              </p>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}

export default AdminOrders;
