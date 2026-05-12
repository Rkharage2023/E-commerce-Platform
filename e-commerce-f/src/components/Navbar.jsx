import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiShoppingBag,
  FiUser,
  FiLogOut,
  FiMenu,
  FiX,
  FiSun,
  FiMoon,
  FiPackage,
  FiGrid,
  FiChevronDown,
} from "react-icons/fi";
import { logout } from "../store/authSlice";
import { useTheme } from "./ThemeContex";

function Navbar({ onCartClick }) {
  const { dark, toggle } = useTheme();
  const { user } = useSelector((state) => state.auth);
  const cartItems = useSelector((state) => state.cart.items);
  const cartCount = cartItems.reduce((acc, i) => acc + i.quantity, 0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [userMenu, setUserMenu] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setUserMenu(false);
  }, [location]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const isAdmin = user?.role === "admin";
  const isEmployee = user?.role === "employee";

  return (
    <>
      <nav
        style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          background: scrolled
            ? dark
              ? "rgba(6,6,15,0.88)"
              : "rgba(244,243,255,0.88)"
            : "transparent",
          backdropFilter: scrolled ? "blur(24px) saturate(180%)" : "none",
          borderBottom: scrolled
            ? "1px solid var(--border)"
            : "1px solid transparent",
          transition: "all 0.35s var(--ease)",
        }}
      >
        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            padding: "0 1.5rem",
            height: 72,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1rem",
          }}
        >
          {/* Logo */}
          <Link
            to="/"
            style={{
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              flexShrink: 0,
            }}
          >
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 10,
                background:
                  "linear-gradient(135deg, var(--accent), var(--accent-2))",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 4px 16px var(--accent-glow)",
              }}
            >
              <span
                style={{
                  color: "#fff",
                  fontFamily: "Syne, sans-serif",
                  fontWeight: 800,
                  fontSize: "1rem",
                }}
              >
                S
              </span>
            </div>
            <span
              style={{
                fontFamily: "Syne, sans-serif",
                fontWeight: 800,
                fontSize: "1.25rem",
                color: "var(--text-1)",
                letterSpacing: "-0.02em",
              }}
            >
              Shop<span style={{ color: "var(--accent)" }}>Hub</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div
            style={{ display: "flex", alignItems: "center", gap: "2rem" }}
            className="hidden md:flex"
          >
            <Link to="/products" className="nav-link">
              Shop
            </Link>
            <Link to="/orders" className="nav-link">
              Orders
            </Link>
            {isAdmin && (
              <Link to="/admin" className="nav-link">
                Dashboard
              </Link>
            )}
            {isEmployee && (
              <Link to="/employee" className="nav-link">
                My Tasks
              </Link>
            )}
          </div>

          {/* Actions */}
          <div
            style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}
          >
            {/* Theme toggle */}
            <button
              onClick={toggle}
              aria-label="Toggle theme"
              style={{
                width: 38,
                height: 38,
                borderRadius: 10,
                background: "var(--surface-2)",
                border: "1px solid var(--border)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                color: "var(--text-2)",
                transition: "all 0.2s var(--ease)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "var(--accent)";
                e.currentTarget.style.borderColor = "var(--border-hover)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "var(--text-2)";
                e.currentTarget.style.borderColor = "var(--border)";
              }}
            >
              {dark ? <FiSun size={16} /> : <FiMoon size={16} />}
            </button>

            {/* Cart */}
            <button
              onClick={onCartClick}
              style={{
                position: "relative",
                width: 38,
                height: 38,
                borderRadius: 10,
                background: "var(--surface-2)",
                border: "1px solid var(--border)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                color: "var(--text-2)",
                transition: "all 0.2s var(--ease)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "var(--accent)";
                e.currentTarget.style.borderColor = "var(--border-hover)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "var(--text-2)";
                e.currentTarget.style.borderColor = "var(--border)";
              }}
            >
              <FiShoppingBag size={16} />
              {cartCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  style={{
                    position: "absolute",
                    top: -6,
                    right: -6,
                    background: "var(--accent)",
                    color: "#fff",
                    width: 18,
                    height: 18,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "0.65rem",
                    fontWeight: 800,
                    fontFamily: "Syne, sans-serif",
                  }}
                >
                  {cartCount}
                </motion.span>
              )}
            </button>

            {/* User */}
            {user ? (
              <div style={{ position: "relative" }}>
                <button
                  onClick={() => setUserMenu((v) => !v)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    padding: "0.4rem 0.875rem",
                    borderRadius: 10,
                    background: "var(--surface-2)",
                    border: "1px solid var(--border)",
                    cursor: "pointer",
                    color: "var(--text-1)",
                    transition: "all 0.2s var(--ease)",
                    fontFamily: "Syne, sans-serif",
                    fontWeight: 600,
                    fontSize: "0.85rem",
                  }}
                >
                  <div
                    style={{
                      width: 26,
                      height: 26,
                      borderRadius: "50%",
                      background:
                        "linear-gradient(135deg, var(--accent), var(--accent-2))",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <span
                      style={{
                        color: "#fff",
                        fontSize: "0.7rem",
                        fontWeight: 800,
                      }}
                    >
                      {user.name[0].toUpperCase()}
                    </span>
                  </div>
                  <span className="hidden sm:inline">
                    {user.name.split(" ")[0]}
                  </span>
                  <FiChevronDown
                    size={13}
                    style={{
                      color: "var(--text-2)",
                      transform: userMenu ? "rotate(180deg)" : "none",
                      transition: "transform 0.2s",
                    }}
                  />
                </button>

                <AnimatePresence>
                  {userMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.95 }}
                      transition={{ duration: 0.18 }}
                      style={{
                        position: "absolute",
                        right: 0,
                        top: "calc(100% + 8px)",
                        background: "var(--surface)",
                        border: "1px solid var(--border)",
                        borderRadius: "var(--r-md)",
                        padding: "0.5rem",
                        minWidth: 180,
                        boxShadow: "var(--shadow-lg)",
                        zIndex: 200,
                      }}
                    >
                      <Link
                        to="/orders"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.6rem",
                          padding: "0.6rem 0.875rem",
                          borderRadius: "var(--r-xs)",
                          color: "var(--text-2)",
                          textDecoration: "none",
                          fontSize: "0.875rem",
                          fontFamily: "Syne, sans-serif",
                          fontWeight: 600,
                          transition: "all 0.15s",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = "var(--surface-2)";
                          e.currentTarget.style.color = "var(--accent)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = "transparent";
                          e.currentTarget.style.color = "var(--text-2)";
                        }}
                      >
                        <FiPackage size={14} /> My Orders
                      </Link>
                      {isAdmin && (
                        <Link
                          to="/admin"
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.6rem",
                            padding: "0.6rem 0.875rem",
                            borderRadius: "var(--r-xs)",
                            color: "var(--text-2)",
                            textDecoration: "none",
                            fontSize: "0.875rem",
                            fontFamily: "Syne, sans-serif",
                            fontWeight: 600,
                            transition: "all 0.15s",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background =
                              "var(--surface-2)";
                            e.currentTarget.style.color = "var(--accent)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = "transparent";
                            e.currentTarget.style.color = "var(--text-2)";
                          }}
                        >
                          <FiGrid size={14} /> Admin Panel
                        </Link>
                      )}
                      <div
                        style={{
                          height: 1,
                          background: "var(--border)",
                          margin: "0.375rem 0",
                        }}
                      />
                      <button
                        onClick={handleLogout}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.6rem",
                          padding: "0.6rem 0.875rem",
                          borderRadius: "var(--r-xs)",
                          color: "var(--danger)",
                          width: "100%",
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          fontSize: "0.875rem",
                          fontFamily: "Syne, sans-serif",
                          fontWeight: 600,
                          transition: "all 0.15s",
                          textAlign: "left",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background =
                            "rgba(220,38,38,0.08)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = "transparent";
                        }}
                      >
                        <FiLogOut size={14} /> Sign Out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                to="/login"
                className="btn btn-primary"
                style={{ padding: "0.5rem 1.25rem" }}
              >
                Sign In
              </Link>
            )}

            {/* Mobile menu button */}
            <button
              className="flex md:hidden"
              onClick={() => setMobileOpen((v) => !v)}
              style={{
                width: 38,
                height: 38,
                borderRadius: 10,
                background: "var(--surface-2)",
                border: "1px solid var(--border)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                color: "var(--text-2)",
              }}
            >
              {mobileOpen ? <FiX size={18} /> : <FiMenu size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              style={{
                overflow: "hidden",
                borderTop: "1px solid var(--border)",
                background: "var(--surface)",
              }}
            >
              <div
                style={{
                  padding: "1rem 1.5rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.25rem",
                }}
              >
                {[
                  { to: "/products", label: "Shop" },
                  { to: "/orders", label: "My Orders" },
                  ...(isAdmin ? [{ to: "/admin", label: "Admin Panel" }] : []),
                  ...(isEmployee
                    ? [{ to: "/employee", label: "My Tasks" }]
                    : []),
                ].map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    style={{
                      padding: "0.75rem 1rem",
                      borderRadius: "var(--r-xs)",
                      color: "var(--text-2)",
                      textDecoration: "none",
                      fontFamily: "Syne, sans-serif",
                      fontWeight: 600,
                      fontSize: "0.9rem",
                      transition: "all 0.15s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "var(--surface-2)";
                      e.currentTarget.style.color = "var(--accent)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "transparent";
                      e.currentTarget.style.color = "var(--text-2)";
                    }}
                  >
                    {item.label}
                  </Link>
                ))}
                {user && (
                  <button
                    onClick={handleLogout}
                    style={{
                      marginTop: "0.5rem",
                      padding: "0.75rem 1rem",
                      borderRadius: "var(--r-xs)",
                      color: "var(--danger)",
                      background: "rgba(220,38,38,0.08)",
                      border: "none",
                      cursor: "pointer",
                      fontFamily: "Syne, sans-serif",
                      fontWeight: 600,
                      fontSize: "0.9rem",
                      textAlign: "left",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                    }}
                  >
                    <FiLogOut size={14} /> Sign Out
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}

export default Navbar;
