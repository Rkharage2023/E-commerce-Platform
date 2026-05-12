import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { API_URL } from "../utils/api.js";
import { motion } from "framer-motion";
import {
  FiUser,
  FiMail,
  FiLock,
  FiAlertCircle,
  FiArrowRight,
  FiCheckCircle,
} from "react-icons/fi";

function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await axios.post(`${API_URL}/api/auth/register`, formData);
      navigate("/login");
    } catch (err) {
      setError(
        err.response?.data?.message || "Registration failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const perks = [
    "Free worldwide shipping",
    "2-year warranty on all products",
    "Exclusive member deals",
    "Priority customer support",
  ];

  return (
    <div
      style={{
        minHeight: "calc(100vh - 72px)",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        overflow: "hidden",
      }}
    >
      {/* Left panel (visible on lg+) */}
      <div
        style={{
          background: "linear-gradient(135deg, var(--accent) 0%, #3B1F8C 100%)",
          padding: "4rem",
          display: "none",
          flexDirection: "column",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
        }}
        className="register-left"
      >
        <div
          className="orb"
          style={{
            position: "absolute",
            width: 400,
            height: 400,
            background: "rgba(255,255,255,0.06)",
            top: -150,
            right: -100,
          }}
        />
        <div
          className="orb"
          style={{
            position: "absolute",
            width: 300,
            height: 300,
            background: "rgba(255,255,255,0.04)",
            bottom: -100,
            left: -50,
            animationDelay: "2s",
          }}
        />

        <div style={{ position: "relative", zIndex: 1 }}>
          <Link
            to="/"
            style={{
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.6rem",
              marginBottom: "4rem",
            }}
          >
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: 11,
                background: "rgba(255,255,255,0.15)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
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
                fontSize: "1.3rem",
                color: "#fff",
              }}
            >
              ShopHub
            </span>
          </Link>

          <h2
            style={{
              fontFamily: "Syne, sans-serif",
              fontWeight: 800,
              fontSize: "2.5rem",
              color: "#fff",
              lineHeight: 1.15,
              marginBottom: "1.5rem",
            }}
          >
            Join the Future
            <br />
            of Shopping
          </h2>
          <p
            style={{
              color: "rgba(255,255,255,0.7)",
              lineHeight: 1.7,
              marginBottom: "2.5rem",
            }}
          >
            Get access to exclusive deals, premium products, and world-class
            support.
          </p>

          <div
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            {perks.map((perk) => (
              <div
                key={perk}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                }}
              >
                <div
                  style={{
                    width: 22,
                    height: 22,
                    borderRadius: "50%",
                    background: "rgba(255,255,255,0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <FiCheckCircle size={12} style={{ color: "#fff" }} />
                </div>
                <span
                  style={{
                    color: "rgba(255,255,255,0.85)",
                    fontSize: "0.88rem",
                    fontWeight: 500,
                  }}
                >
                  {perk}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel - Form */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem 1.5rem",
          background: "var(--bg)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          className="orb"
          style={{
            position: "absolute",
            width: 400,
            height: 400,
            background: "var(--accent)",
            opacity: 0.05,
            top: -100,
            right: -100,
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          style={{
            width: "100%",
            maxWidth: 420,
            position: "relative",
            zIndex: 1,
          }}
        >
          <div
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: "var(--r-xl)",
              padding: "clamp(2rem, 5vw, 3rem)",
              boxShadow: "var(--shadow-lg)",
            }}
          >
            <div style={{ marginBottom: "2rem" }}>
              <h1
                style={{
                  fontFamily: "Syne, sans-serif",
                  fontWeight: 800,
                  fontSize: "1.75rem",
                  color: "var(--text-1)",
                  marginBottom: "0.4rem",
                }}
              >
                Create account
              </h1>
              <p style={{ color: "var(--text-2)", fontSize: "0.88rem" }}>
                Join ShopHub and start shopping today
              </p>
            </div>

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
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1.1rem",
              }}
            >
              {[
                {
                  key: "name",
                  label: "Full Name",
                  icon: <FiUser size={15} />,
                  type: "text",
                  placeholder: "John Doe",
                },
                {
                  key: "email",
                  label: "Email",
                  icon: <FiMail size={15} />,
                  type: "email",
                  placeholder: "name@example.com",
                },
                {
                  key: "password",
                  label: "Password",
                  icon: <FiLock size={15} />,
                  type: "password",
                  placeholder: "Min. 6 characters",
                },
              ].map((field) => (
                <div key={field.key}>
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
                    {field.label}
                  </label>
                  <div style={{ position: "relative" }}>
                    <span
                      style={{
                        position: "absolute",
                        left: "1rem",
                        top: "50%",
                        transform: "translateY(-50%)",
                        color: "var(--text-3)",
                        pointerEvents: "none",
                      }}
                    >
                      {field.icon}
                    </span>
                    <input
                      type={field.type}
                      className="input"
                      style={{ paddingLeft: "2.75rem" }}
                      placeholder={field.placeholder}
                      value={formData[field.key]}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          [field.key]: e.target.value,
                        })
                      }
                      required
                      minLength={field.key === "password" ? 6 : undefined}
                    />
                  </div>
                </div>
              ))}

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
                    Create Account <FiArrowRight size={16} />
                  </>
                )}
              </button>
            </form>

            <p
              style={{
                textAlign: "center",
                marginTop: "1.75rem",
                fontSize: "0.85rem",
                color: "var(--text-2)",
              }}
            >
              Already have an account?{" "}
              <Link
                to="/login"
                style={{
                  color: "var(--accent)",
                  fontWeight: 700,
                  textDecoration: "none",
                }}
              >
                Sign in
              </Link>
            </p>
          </div>
        </motion.div>
      </div>

      <style>{`@media (min-width: 900px) { .register-left { display: flex !important; } }`}</style>
    </div>
  );
}

export default RegisterPage;
