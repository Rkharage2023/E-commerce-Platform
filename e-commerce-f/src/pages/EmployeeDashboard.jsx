import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../utils/api";
import { motion } from "framer-motion";
import {
  FiCheckCircle,
  FiPackage,
  FiClock,
  FiTruck,
  FiUser,
  FiRefreshCw,
} from "react-icons/fi";

function EmployeeDashboard() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [marking, setMarking] = useState(null);
  const token = localStorage.getItem("jwtToken");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/api/orders/employee/orders`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(res.data);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const markDelivered = async (id) => {
    setMarking(id);
    try {
      await axios.put(
        `${API_URL}/api/orders/employee/orders/${id}/deliver`,
        {},
        { headers: { Authorization: `Bearer ${token}` } },
      );
      fetchOrders();
    } catch (e) {
      console.log(e);
    } finally {
      setMarking(null);
    }
  };

  const delivered = orders.filter((o) => o.status === "Delivered").length;
  const pending = orders.filter(
    (o) => o.status !== "Delivered" && o.status !== "Cancelled",
  ).length;

  return (
    <div
      style={{ maxWidth: 1100, margin: "0 auto", padding: "3rem 1.5rem 5rem" }}
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
            Employee Portal
          </p>
          <h1
            style={{
              fontFamily: "Syne, sans-serif",
              fontWeight: 800,
              fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
              color: "var(--text-1)",
            }}
          >
            My Assigned Orders
          </h1>
          <p style={{ color: "var(--text-2)", marginTop: "0.4rem" }}>
            Manage and deliver your assigned orders
          </p>
        </div>
        <button
          onClick={fetchOrders}
          className="btn btn-secondary"
          style={{ gap: "0.5rem" }}
        >
          <FiRefreshCw size={14} /> Refresh
        </button>
      </div>

      {/* Stats */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "1rem",
          marginBottom: "2.5rem",
        }}
      >
        {[
          {
            label: "Total Assigned",
            value: orders.length,
            icon: <FiPackage size={18} />,
            color: "var(--accent)",
            bg: "var(--accent-glow)",
          },
          {
            label: "Pending",
            value: pending,
            icon: <FiClock size={18} />,
            color: "var(--warning)",
            bg: "rgba(217,119,6,0.1)",
          },
          {
            label: "Delivered",
            value: delivered,
            icon: <FiCheckCircle size={18} />,
            color: "var(--success)",
            bg: "rgba(5,150,105,0.1)",
          },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: "var(--r-lg)",
              padding: "1.5rem",
            }}
          >
            <div
              style={{
                width: 42,
                height: 42,
                borderRadius: 12,
                background: stat.bg,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: stat.color,
                marginBottom: "1rem",
              }}
            >
              {stat.icon}
            </div>
            <p
              style={{
                fontFamily: "Syne, sans-serif",
                fontWeight: 500,
                fontSize: "0.75rem",
                color: "var(--text-3)",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                marginBottom: "0.25rem",
              }}
            >
              {stat.label}
            </p>
            <h2
              style={{
                fontFamily: "Syne, sans-serif",
                fontWeight: 800,
                fontSize: "2rem",
                color: "var(--text-1)",
              }}
            >
              {stat.value}
            </h2>
          </motion.div>
        ))}
      </div>

      {/* Orders */}
      {loading ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className="skeleton"
              style={{ height: 90, borderRadius: "var(--r-lg)" }}
            />
          ))}
        </div>
      ) : orders.length === 0 ? (
        <div style={{ textAlign: "center", padding: "5rem 2rem" }}>
          <div
            style={{
              width: 80,
              height: 80,
              borderRadius: 24,
              background: "var(--surface-2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 1.5rem",
            }}
          >
            <FiPackage size={32} style={{ color: "var(--text-3)" }} />
          </div>
          <h3
            style={{
              fontFamily: "Syne, sans-serif",
              fontWeight: 700,
              color: "var(--text-1)",
              marginBottom: "0.5rem",
            }}
          >
            No orders assigned
          </h3>
          <p style={{ color: "var(--text-2)" }}>
            Orders assigned to you will appear here.
          </p>
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
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, i) => (
                  <motion.tr
                    key={order._id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
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
                          gap: "0.6rem",
                        }}
                      >
                        <div
                          style={{
                            width: 30,
                            height: 30,
                            borderRadius: "50%",
                            background: "var(--accent-glow)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <FiUser
                            size={12}
                            style={{ color: "var(--accent)" }}
                          />
                        </div>
                        <span style={{ fontWeight: 500, fontSize: "0.875rem" }}>
                          {order.user?.name || "Unknown"}
                        </span>
                      </div>
                    </td>
                    <td
                      style={{ color: "var(--text-2)", fontSize: "0.875rem" }}
                    >
                      {order.items?.length || 0} item
                      {(order.items?.length || 0) !== 1 ? "s" : ""}
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
                          color:
                            order.status === "Delivered"
                              ? "var(--success)"
                              : "var(--warning)",
                          background:
                            order.status === "Delivered"
                              ? "rgba(5,150,105,0.1)"
                              : "rgba(217,119,6,0.1)",
                        }}
                      >
                        {order.status === "Delivered" ? (
                          <FiCheckCircle size={11} />
                        ) : (
                          <FiTruck size={11} />
                        )}
                        {order.status}
                      </span>
                    </td>
                    <td>
                      {order.status !== "Delivered" ? (
                        <button
                          onClick={() => markDelivered(order._id)}
                          disabled={marking === order._id}
                          style={{
                            padding: "0.45rem 1rem",
                            borderRadius: "var(--r-xs)",
                            background: "rgba(5,150,105,0.1)",
                            color: "var(--success)",
                            border: "none",
                            cursor: "pointer",
                            fontFamily: "Syne, sans-serif",
                            fontWeight: 600,
                            fontSize: "0.8rem",
                            display: "flex",
                            alignItems: "center",
                            gap: "0.35rem",
                            transition: "all 0.2s",
                            opacity: marking === order._id ? 0.6 : 1,
                          }}
                          onMouseEnter={(e) => {
                            if (marking !== order._id) {
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
                          {marking === order._id ? (
                            <>
                              <div
                                style={{
                                  width: 12,
                                  height: 12,
                                  border: "2px solid rgba(5,150,105,0.3)",
                                  borderTopColor: "var(--success)",
                                  borderRadius: "50%",
                                  animation: "spin-slow 0.7s linear infinite",
                                }}
                              />{" "}
                              Marking…
                            </>
                          ) : (
                            <>
                              <FiCheckCircle size={13} /> Mark Delivered
                            </>
                          )}
                        </button>
                      ) : (
                        <span
                          style={{
                            fontSize: "0.8rem",
                            color: "var(--text-3)",
                            fontStyle: "italic",
                          }}
                        >
                          Done
                        </span>
                      )}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default EmployeeDashboard;
