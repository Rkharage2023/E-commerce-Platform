import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../utils/api";
import { motion } from "framer-motion";
import {
  FiPackage,
  FiClock,
  FiCheckCircle,
  FiXCircle,
  FiTruck,
  FiChevronDown,
  FiChevronUp,
} from "react-icons/fi";

function OrderHistoryPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    axios
      .get(`${API_URL}/api/orders/myorders`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setOrders(res.data))
      .finally(() => setLoading(false));
  }, []);

  const getStatus = (status) => {
    switch (status) {
      case "Delivered":
        return {
          color: "var(--success)",
          bg: "rgba(5,150,105,0.1)",
          icon: <FiCheckCircle size={13} />,
          label: "Delivered",
        };
      case "Cancelled":
        return {
          color: "var(--danger)",
          bg: "rgba(220,38,38,0.1)",
          icon: <FiXCircle size={13} />,
          label: "Cancelled",
        };
      case "Shipped":
        return {
          color: "var(--accent)",
          bg: "var(--accent-glow)",
          icon: <FiTruck size={13} />,
          label: "Shipped",
        };
      default:
        return {
          color: "var(--warning)",
          bg: "rgba(217,119,6,0.1)",
          icon: <FiClock size={13} />,
          label: status || "Pending",
        };
    }
  };

  return (
    <div
      style={{ maxWidth: 800, margin: "0 auto", padding: "3rem 1.5rem 5rem" }}
    >
      {/* Header */}
      <div style={{ marginBottom: "3rem" }}>
        <p className="label" style={{ marginBottom: "0.75rem" }}>
          Account
        </p>
        <h1
          style={{
            fontFamily: "Syne, sans-serif",
            fontWeight: 800,
            fontSize: "clamp(2rem, 5vw, 3rem)",
            color: "var(--text-1)",
          }}
        >
          Order History
        </h1>
        <p style={{ color: "var(--text-2)", marginTop: "0.5rem" }}>
          Track and manage your recent orders
        </p>
      </div>

      {loading ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className="skeleton"
              style={{ height: 100, borderRadius: "var(--r-lg)" }}
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
            No orders yet
          </h3>
          <p style={{ color: "var(--text-2)", marginBottom: "1.5rem" }}>
            Your order history will appear here once you make a purchase.
          </p>
          <a href="/products" className="btn btn-primary">
            Start Shopping
          </a>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {orders.map((order, i) => {
            const s = getStatus(order.status);
            const isOpen = expanded === order._id;
            return (
              <motion.div
                key={order._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                style={{
                  background: "var(--surface)",
                  border: `1px solid ${isOpen ? "var(--border-hover)" : "var(--border)"}`,
                  borderRadius: "var(--r-lg)",
                  overflow: "hidden",
                  transition: "border-color 0.25s",
                }}
              >
                {/* Header row */}
                <button
                  onClick={() => setExpanded(isOpen ? null : order._id)}
                  style={{
                    width: "100%",
                    padding: "1.35rem 1.5rem",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                    textAlign: "left",
                  }}
                >
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 13,
                      background: "var(--surface-2)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <FiPackage size={18} style={{ color: "var(--accent)" }} />
                  </div>

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.75rem",
                        flexWrap: "wrap",
                      }}
                    >
                      <p
                        style={{
                          fontFamily: "Syne, sans-serif",
                          fontWeight: 700,
                          fontSize: "0.9rem",
                          color: "var(--text-1)",
                        }}
                      >
                        Order #{order._id.slice(-8).toUpperCase()}
                      </p>
                      <span
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "0.3rem",
                          padding: "0.2rem 0.65rem",
                          borderRadius: 99,
                          fontSize: "0.72rem",
                          fontFamily: "Syne, sans-serif",
                          fontWeight: 700,
                          background: s.bg,
                          color: s.color,
                        }}
                      >
                        {s.icon} {s.label}
                      </span>
                    </div>
                    <p
                      style={{
                        fontSize: "0.8rem",
                        color: "var(--text-3)",
                        marginTop: "0.2rem",
                      }}
                    >
                      {new Date(order.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>

                  <div style={{ textAlign: "right", flexShrink: 0 }}>
                    <p
                      style={{
                        fontFamily: "Syne, sans-serif",
                        fontWeight: 800,
                        fontSize: "1.1rem",
                        color: "var(--text-1)",
                      }}
                    >
                      ${order.totalPrice}
                    </p>
                    <p style={{ fontSize: "0.75rem", color: "var(--text-3)" }}>
                      {order.items?.length || 0} items
                    </p>
                  </div>

                  <div style={{ color: "var(--text-3)", flexShrink: 0 }}>
                    {isOpen ? (
                      <FiChevronUp size={16} />
                    ) : (
                      <FiChevronDown size={16} />
                    )}
                  </div>
                </button>

                {/* Expanded items */}
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    style={{
                      borderTop: "1px solid var(--border)",
                      padding: "1.25rem 1.5rem",
                      background: "var(--surface-2)",
                    }}
                  >
                    <p className="label" style={{ marginBottom: "1rem" }}>
                      Order Items
                    </p>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.75rem",
                      }}
                    >
                      {order.items?.map((item, idx) => (
                        <div
                          key={idx}
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            padding: "0.75rem 1rem",
                            background: "var(--surface)",
                            borderRadius: "var(--r-sm)",
                            border: "1px solid var(--border)",
                          }}
                        >
                          <div>
                            <p
                              style={{
                                fontFamily: "Syne, sans-serif",
                                fontWeight: 600,
                                fontSize: "0.875rem",
                                color: "var(--text-1)",
                              }}
                            >
                              {item.name}
                            </p>
                            <p
                              style={{
                                fontSize: "0.78rem",
                                color: "var(--text-3)",
                              }}
                            >
                              Qty: {item.qty || item.quantity}
                            </p>
                          </div>
                          <p
                            style={{
                              fontFamily: "Syne, sans-serif",
                              fontWeight: 700,
                              color: "var(--accent)",
                            }}
                          >
                            $
                            {(item.price * (item.qty || item.quantity)).toFixed(
                              2,
                            )}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div
                      style={{
                        marginTop: "1.25rem",
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "0.875rem 1rem",
                        background: "var(--surface)",
                        borderRadius: "var(--r-sm)",
                        border: "1px solid var(--border-hover)",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "Syne, sans-serif",
                          fontWeight: 700,
                          color: "var(--text-2)",
                        }}
                      >
                        Total
                      </span>
                      <span
                        style={{
                          fontFamily: "Syne, sans-serif",
                          fontWeight: 800,
                          fontSize: "1.1rem",
                          color: "var(--text-1)",
                        }}
                      >
                        ${order.totalPrice}
                      </span>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default OrderHistoryPage;
