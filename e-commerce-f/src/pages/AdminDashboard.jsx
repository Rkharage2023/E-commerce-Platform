import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiTrendingUp,
  FiShoppingCart,
  FiBox,
  FiUsers,
  FiArrowUpRight,
  FiArrowRight,
  FiActivity,
} from "react-icons/fi";

function AdminDashboard() {
  const stats = [
    {
      label: "Total Revenue",
      value: "$12,840",
      change: "+12.5%",
      up: true,
      icon: <FiTrendingUp size={18} />,
      color: "var(--success)",
      bg: "rgba(5,150,105,0.1)",
    },
    {
      label: "Active Orders",
      value: "48",
      change: "8 new today",
      up: true,
      icon: <FiShoppingCart size={18} />,
      color: "var(--accent)",
      bg: "var(--accent-glow)",
    },
    {
      label: "Products",
      value: "124",
      change: "In stock",
      up: null,
      icon: <FiBox size={18} />,
      color: "#06B6D4",
      bg: "rgba(6,182,212,0.1)",
    },
    {
      label: "Staff Members",
      value: "12",
      change: "All active",
      up: null,
      icon: <FiUsers size={18} />,
      color: "#A855F7",
      bg: "rgba(168,85,247,0.1)",
    },
  ];

  const quickLinks = [
    {
      to: "/admin/products",
      label: "Manage Products",
      desc: "Add, edit, or remove products from your catalog.",
      icon: <FiBox size={20} />,
      color: "var(--accent)",
    },
    {
      to: "/admin/orders",
      label: "Manage Orders",
      desc: "View, assign, ship or cancel customer orders.",
      icon: <FiShoppingCart size={20} />,
      color: "var(--success)",
    },
    {
      to: "/admin/employees",
      label: "Manage Employees",
      desc: "Invite staff, pay salaries, and manage your team.",
      icon: <FiUsers size={20} />,
      color: "#A855F7",
    },
  ];

  const recentActivity = [
    {
      text: "New order #AF8832 placed",
      time: "2 min ago",
      dot: "var(--accent)",
    },
    {
      text: "Employee Sarah marked order delivered",
      time: "18 min ago",
      dot: "var(--success)",
    },
    {
      text: "Product 'AirPods Pro' stock updated",
      time: "1 hr ago",
      dot: "#06B6D4",
    },
    { text: "New employee James invited", time: "3 hr ago", dot: "#A855F7" },
    { text: "Order #AF8801 shipped", time: "5 hr ago", dot: "var(--warning)" },
  ];

  return (
    <div
      style={{ maxWidth: 1280, margin: "0 auto", padding: "3rem 1.5rem 5rem" }}
    >
      {/* Header */}
      <div
        style={{
          marginBottom: "3rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        <div>
          <p className="label" style={{ marginBottom: "0.5rem" }}>
            Admin Panel
          </p>
          <h1
            style={{
              fontFamily: "Syne, sans-serif",
              fontWeight: 800,
              fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
              color: "var(--text-1)",
            }}
          >
            Management Hub
          </h1>
          <p style={{ color: "var(--text-2)", marginTop: "0.4rem" }}>
            Monitor platform activity in real-time.
          </p>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "0.5rem 1rem",
            background: "rgba(5,150,105,0.08)",
            border: "1px solid rgba(5,150,105,0.2)",
            borderRadius: 99,
          }}
        >
          <span
            style={{
              width: 7,
              height: 7,
              borderRadius: "50%",
              background: "var(--success)",
              display: "inline-block",
              animation: "glow-pulse 2s ease-in-out infinite",
            }}
          />
          <span
            style={{
              fontSize: "0.78rem",
              fontFamily: "Syne, sans-serif",
              fontWeight: 700,
              color: "var(--success)",
            }}
          >
            All systems live
          </span>
        </div>
      </div>

      {/* Stats Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "1.25rem",
          marginBottom: "2.5rem",
        }}
      >
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08, duration: 0.4 }}
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: "var(--r-lg)",
              padding: "1.75rem",
              transition: "all 0.3s var(--ease)",
              cursor: "default",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "var(--border-hover)";
              e.currentTarget.style.boxShadow = "var(--shadow-md)";
              e.currentTarget.style.transform = "translateY(-4px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "var(--border)";
              e.currentTarget.style.boxShadow = "none";
              e.currentTarget.style.transform = "none";
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                marginBottom: "1.5rem",
              }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 13,
                  background: stat.bg,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: stat.color,
                }}
              >
                {stat.icon}
              </div>
              {stat.up !== null && (
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.2rem",
                    fontSize: "0.72rem",
                    fontFamily: "Syne, sans-serif",
                    fontWeight: 700,
                    color: stat.up ? "var(--success)" : "var(--danger)",
                    background: stat.up
                      ? "rgba(5,150,105,0.08)"
                      : "rgba(220,38,38,0.08)",
                    padding: "0.25rem 0.6rem",
                    borderRadius: 99,
                  }}
                >
                  <FiArrowUpRight size={11} /> {stat.change}
                </span>
              )}
              {stat.up === null && (
                <span
                  style={{
                    fontSize: "0.72rem",
                    fontFamily: "Syne, sans-serif",
                    fontWeight: 700,
                    color: "var(--text-3)",
                    background: "var(--surface-2)",
                    padding: "0.25rem 0.6rem",
                    borderRadius: 99,
                  }}
                >
                  {stat.change}
                </span>
              )}
            </div>
            <p
              style={{
                fontFamily: "Syne, sans-serif",
                fontWeight: 500,
                fontSize: "0.78rem",
                color: "var(--text-3)",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                marginBottom: "0.4rem",
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
                lineHeight: 1,
              }}
            >
              {stat.value}
            </h2>
            {/* Accent bar */}
            <div
              style={{
                height: 3,
                borderRadius: 99,
                background: stat.bg,
                marginTop: "1.25rem",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: `linear-gradient(90deg, ${stat.color}, transparent)`,
                  borderRadius: 99,
                }}
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main grid: Quick links + Activity */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 340px",
          gap: "1.5rem",
          alignItems: "start",
        }}
      >
        {/* Quick Links */}
        <div>
          <p className="label" style={{ marginBottom: "1.25rem" }}>
            Quick Access
          </p>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            {quickLinks.map((link, i) => (
              <motion.div
                key={link.to}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.08 }}
              >
                <Link
                  to={link.to}
                  style={{ textDecoration: "none", display: "block" }}
                >
                  <div
                    style={{
                      background: "var(--surface)",
                      border: "1px solid var(--border)",
                      borderRadius: "var(--r-lg)",
                      padding: "1.5rem 1.75rem",
                      display: "flex",
                      alignItems: "center",
                      gap: "1.25rem",
                      transition: "all 0.3s var(--ease)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = link.color;
                      e.currentTarget.style.boxShadow = `0 8px 32px ${link.color}20`;
                      e.currentTarget.style.transform = "translateX(6px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "var(--border)";
                      e.currentTarget.style.boxShadow = "none";
                      e.currentTarget.style.transform = "none";
                    }}
                  >
                    <div
                      style={{
                        width: 52,
                        height: 52,
                        borderRadius: 15,
                        background: `${link.color}15`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: link.color,
                        flexShrink: 0,
                      }}
                    >
                      {link.icon}
                    </div>
                    <div style={{ flex: 1 }}>
                      <h3
                        style={{
                          fontFamily: "Syne, sans-serif",
                          fontWeight: 700,
                          fontSize: "1rem",
                          color: "var(--text-1)",
                          marginBottom: "0.25rem",
                        }}
                      >
                        {link.label}
                      </h3>
                      <p
                        style={{ fontSize: "0.83rem", color: "var(--text-2)" }}
                      >
                        {link.desc}
                      </p>
                    </div>
                    <FiArrowRight
                      size={18}
                      style={{
                        color: "var(--text-3)",
                        flexShrink: 0,
                        transition: "transform 0.2s, color 0.2s",
                      }}
                    />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Revenue chart placeholder */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 }}
            style={{
              marginTop: "1.5rem",
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: "var(--r-lg)",
              padding: "1.75rem",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "1.5rem",
              }}
            >
              <p
                style={{
                  fontFamily: "Syne, sans-serif",
                  fontWeight: 700,
                  color: "var(--text-1)",
                }}
              >
                Revenue Overview
              </p>
              <span
                style={{
                  fontSize: "0.75rem",
                  color: "var(--text-3)",
                  background: "var(--surface-2)",
                  padding: "0.25rem 0.625rem",
                  borderRadius: 99,
                }}
              >
                Last 7 days
              </span>
            </div>

            {/* Mock bar chart */}
            <div
              style={{
                display: "flex",
                alignItems: "flex-end",
                gap: "0.625rem",
                height: 120,
              }}
            >
              {[40, 65, 50, 80, 60, 90, 75].map((h, i) => (
                <div
                  key={i}
                  style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "0.4rem",
                  }}
                >
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${h}%` }}
                    transition={{
                      delay: 0.6 + i * 0.06,
                      duration: 0.5,
                      ease: [0.34, 1.56, 0.64, 1],
                    }}
                    style={{
                      width: "100%",
                      borderRadius: "6px 6px 0 0",
                      background:
                        i === 5 ? "var(--accent)" : "var(--surface-3)",
                      border: i === 5 ? "none" : "1px solid var(--border)",
                      minHeight: 4,
                    }}
                  />
                  <span
                    style={{
                      fontSize: "0.65rem",
                      color: "var(--text-3)",
                      fontFamily: "Syne, sans-serif",
                    }}
                  >
                    {["M", "T", "W", "T", "F", "S", "S"][i]}
                  </span>
                </div>
              ))}
            </div>
            <p
              style={{
                marginTop: "1rem",
                fontSize: "0.78rem",
                color: "var(--text-3)",
                textAlign: "center",
              }}
            >
              Revenue data updates as transactions are processed
            </p>
          </motion.div>
        </div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <p className="label" style={{ marginBottom: "1.25rem" }}>
            Recent Activity
          </p>
          <div
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: "var(--r-lg)",
              overflow: "hidden",
            }}
          >
            <div style={{ padding: "0.5rem" }}>
              {recentActivity.map((item, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "0.875rem",
                    padding: "0.875rem 1rem",
                    borderRadius: "var(--r-sm)",
                    transition: "background 0.15s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "var(--surface-2)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                  }}
                >
                  <div
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      background: item.dot,
                      flexShrink: 0,
                      marginTop: 6,
                    }}
                  />
                  <div style={{ flex: 1 }}>
                    <p
                      style={{
                        fontSize: "0.83rem",
                        color: "var(--text-1)",
                        lineHeight: 1.5,
                      }}
                    >
                      {item.text}
                    </p>
                    <p
                      style={{
                        fontSize: "0.72rem",
                        color: "var(--text-3)",
                        marginTop: "0.2rem",
                      }}
                    >
                      {item.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div
              style={{
                padding: "0.875rem 1rem",
                borderTop: "1px solid var(--border)",
              }}
            >
              <button
                style={{
                  width: "100%",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "var(--accent)",
                  fontFamily: "Syne, sans-serif",
                  fontWeight: 600,
                  fontSize: "0.83rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.4rem",
                  padding: "0.4rem",
                }}
              >
                <FiActivity size={13} /> View all activity
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      <style>{`@media (max-width: 900px) { .admin-main-grid { grid-template-columns: 1fr !important; } }`}</style>
    </div>
  );
}

export default AdminDashboard;
