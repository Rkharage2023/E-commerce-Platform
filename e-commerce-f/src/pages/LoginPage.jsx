import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { setCredentials } from "../store/authSlice";
import { API_URL } from "../utils/api";
import { motion } from "framer-motion";
import { FiMail, FiLock, FiAlertCircle, FiArrowRight } from "react-icons/fi";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const { data } = await axios.post(`${API_URL}/api/auth/login`, {
        email,
        password,
      });
      dispatch(setCredentials({ token: data.token, user: data }));
      navigate(
        data.role === "admin"
          ? "/admin"
          : data.role === "employee"
            ? "/employee"
            : "/",
      );
    } catch (err) {
      setError(
        err.response?.data?.message || "Invalid credentials. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "calc(100vh - 72px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem 1.5rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background orbs */}
      <div
        className="orb"
        style={{
          position: "absolute",
          width: 600,
          height: 600,
          background: "var(--accent)",
          opacity: 0.06,
          top: -200,
          left: -100,
        }}
      />
      <div
        className="orb"
        style={{
          position: "absolute",
          width: 400,
          height: 400,
          background: "var(--accent-2)",
          opacity: 0.05,
          bottom: -100,
          right: -50,
          animationDelay: "3s",
        }}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.34, 1.56, 0.64, 1] }}
        style={{
          width: "100%",
          maxWidth: 440,
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Card */}
        <div
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: "var(--r-xl)",
            padding: "clamp(2rem, 5vw, 3rem)",
            boxShadow: "var(--shadow-lg)",
          }}
        >
          {/* Logo */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginBottom: "2.25rem",
            }}
          >
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: 16,
                background:
                  "linear-gradient(135deg, var(--accent), var(--accent-2))",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 8px 24px var(--accent-glow)",
                marginBottom: "1.25rem",
              }}
            >
              <span
                style={{
                  color: "#fff",
                  fontFamily: "Syne, sans-serif",
                  fontWeight: 800,
                  fontSize: "1.25rem",
                }}
              >
                S
              </span>
            </div>
            <h1
              style={{
                fontFamily: "Syne, sans-serif",
                fontWeight: 800,
                fontSize: "1.75rem",
                color: "var(--text-1)",
                marginBottom: "0.4rem",
              }}
            >
              Welcome back
            </h1>
            <p style={{ color: "var(--text-2)", fontSize: "0.88rem" }}>
              Sign in to your ShopHub account
            </p>
          </div>

          {/* Error */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                background: "rgba(220,38,38,0.08)",
                border: "1px solid rgba(220,38,38,0.2)",
                borderRadius: "var(--r-sm)",
                padding: "0.875rem 1rem",
                display: "flex",
                alignItems: "center",
                gap: "0.6rem",
                marginBottom: "1.5rem",
              }}
            >
              <FiAlertCircle
                size={15}
                style={{ color: "var(--danger)", flexShrink: 0 }}
              />
              <p style={{ color: "var(--danger)", fontSize: "0.85rem" }}>
                {error}
              </p>
            </motion.div>
          )}

          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}
          >
            {/* Email */}
            <div>
              <label
                style={{
                  display: "block",
                  fontFamily: "Syne, sans-serif",
                  fontWeight: 600,
                  fontSize: "0.78rem",
                  color: "var(--text-2)",
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  marginBottom: "0.5rem",
                }}
              >
                Email
              </label>
              <div style={{ position: "relative" }}>
                <FiMail
                  size={15}
                  style={{
                    position: "absolute",
                    left: "1rem",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "var(--text-3)",
                    pointerEvents: "none",
                  }}
                />
                <input
                  type="email"
                  className="input"
                  style={{ paddingLeft: "2.75rem" }}
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                style={{
                  display: "block",
                  fontFamily: "Syne, sans-serif",
                  fontWeight: 600,
                  fontSize: "0.78rem",
                  color: "var(--text-2)",
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  marginBottom: "0.5rem",
                }}
              >
                Password
              </label>
              <div style={{ position: "relative" }}>
                <FiLock
                  size={15}
                  style={{
                    position: "absolute",
                    left: "1rem",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "var(--text-3)",
                    pointerEvents: "none",
                  }}
                />
                <input
                  type="password"
                  className="input"
                  style={{ paddingLeft: "2.75rem" }}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                padding: "0.95rem",
                borderRadius: "var(--r-md)",
                background: "var(--accent)",
                color: "#fff",
                border: "none",
                cursor: loading ? "not-allowed" : "pointer",
                fontFamily: "Syne, sans-serif",
                fontWeight: 700,
                fontSize: "0.95rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.5rem",
                boxShadow: "0 8px 24px var(--accent-glow)",
                transition: "all 0.25s var(--ease)",
                marginTop: "0.5rem",
                opacity: loading ? 0.7 : 1,
              }}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.currentTarget.style.background = "var(--accent-light)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "var(--accent)";
                e.currentTarget.style.transform = "none";
              }}
            >
              {loading ? (
                <div
                  style={{
                    width: 18,
                    height: 18,
                    border: "2px solid rgba(255,255,255,0.3)",
                    borderTopColor: "#fff",
                    borderRadius: "50%",
                    animation: "spin-slow 0.7s linear infinite",
                  }}
                />
              ) : (
                <>
                  Sign In <FiArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              margin: "1.75rem 0",
            }}
          >
            <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
            <span
              style={{
                color: "var(--text-3)",
                fontSize: "0.75rem",
                fontFamily: "Syne, sans-serif",
                fontWeight: 600,
              }}
            >
              OR
            </span>
            <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
          </div>

          {/* Google */}
          <a
            href={`${API_URL}/api/auth/google`}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.75rem",
              width: "100%",
              padding: "0.85rem",
              borderRadius: "var(--r-md)",
              background: "var(--surface-2)",
              border: "1px solid var(--border)",
              color: "var(--text-1)",
              textDecoration: "none",
              fontFamily: "Syne, sans-serif",
              fontWeight: 600,
              fontSize: "0.9rem",
              transition: "all 0.2s var(--ease)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "var(--border-hover)";
              e.currentTarget.style.background = "var(--surface-3)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "var(--border)";
              e.currentTarget.style.background = "var(--surface-2)";
            }}
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              style={{ width: 18, height: 18 }}
            />
            Continue with Google
          </a>

          <p
            style={{
              textAlign: "center",
              marginTop: "1.75rem",
              fontSize: "0.85rem",
              color: "var(--text-2)",
            }}
          >
            New to ShopHub?{" "}
            <Link
              to="/register"
              style={{
                color: "var(--accent)",
                fontWeight: 700,
                textDecoration: "none",
              }}
            >
              Create account
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export default LoginPage;
