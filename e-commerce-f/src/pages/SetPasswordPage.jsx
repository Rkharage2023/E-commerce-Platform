import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../utils/api";
import { motion } from "framer-motion";
import { FiLock, FiCheckCircle, FiAlertCircle } from "react-icons/fi";

function SetPasswordPage() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    setError("");
    setLoading(true);

    try {
      await axios.post(`${API_URL}/api/auth/set-password/${token}`, {
        password,
      });
      setSuccess(true);
      setTimeout(() => navigate("/login"), 2500);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to set password. Link may have expired.",
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
      <div
        className="orb"
        style={{
          position: "absolute",
          width: 500,
          height: 500,
          background: "var(--accent)",
          opacity: 0.05,
          top: -200,
          right: -100,
        }}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
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
          {success ? (
            <div style={{ textAlign: "center", padding: "1rem 0" }}>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.1 }}
                style={{
                  width: 72,
                  height: 72,
                  borderRadius: "50%",
                  background: "rgba(5,150,105,0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 1.5rem",
                }}
              >
                <FiCheckCircle size={32} style={{ color: "var(--success)" }} />
              </motion.div>
              <h2
                style={{
                  fontFamily: "Syne, sans-serif",
                  fontWeight: 800,
                  fontSize: "1.5rem",
                  color: "var(--text-1)",
                  marginBottom: "0.5rem",
                }}
              >
                Password Set!
              </h2>
              <p style={{ color: "var(--text-2)", fontSize: "0.88rem" }}>
                Redirecting to sign in…
              </p>
            </div>
          ) : (
            <>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  marginBottom: "2rem",
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
                    marginBottom: "1.25rem",
                    boxShadow: "0 8px 24px var(--accent-glow)",
                  }}
                >
                  <FiLock size={22} style={{ color: "#fff" }} />
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
                  Create Password
                </h1>
                <p
                  style={{
                    color: "var(--text-2)",
                    fontSize: "0.88rem",
                    textAlign: "center",
                  }}
                >
                  Set a strong password for your new account
                </p>
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
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
                    size={14}
                    style={{ color: "var(--danger)", flexShrink: 0 }}
                  />
                  <p style={{ color: "var(--danger)", fontSize: "0.85rem" }}>
                    {error}
                  </p>
                </motion.div>
              )}

              <form
                onSubmit={submit}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1.1rem",
                }}
              >
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
                    New Password
                  </label>
                  <div style={{ position: "relative" }}>
                    <FiLock
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
                      type="password"
                      className="input"
                      style={{ paddingLeft: "2.5rem" }}
                      placeholder="Min. 6 characters"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      minLength={6}
                    />
                  </div>
                </div>
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
                    Confirm Password
                  </label>
                  <div style={{ position: "relative" }}>
                    <FiLock
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
                      type="password"
                      className="input"
                      style={{
                        paddingLeft: "2.5rem",
                        borderColor:
                          confirm && confirm !== password
                            ? "var(--danger)"
                            : undefined,
                      }}
                      placeholder="Repeat your password"
                      value={confirm}
                      onChange={(e) => setConfirm(e.target.value)}
                      required
                    />
                  </div>
                  {confirm && confirm !== password && (
                    <p
                      style={{
                        color: "var(--danger)",
                        fontSize: "0.75rem",
                        marginTop: "0.35rem",
                      }}
                    >
                      Passwords don't match
                    </p>
                  )}
                </div>

                {/* Password strength */}
                {password && (
                  <div>
                    <div style={{ display: "flex", gap: "0.3rem" }}>
                      {[1, 2, 3, 4].map((level) => (
                        <div
                          key={level}
                          style={{
                            flex: 1,
                            height: 3,
                            borderRadius: 99,
                            background:
                              password.length >= level * 3
                                ? password.length >= 10
                                  ? "var(--success)"
                                  : password.length >= 7
                                    ? "var(--warning)"
                                    : "var(--danger)"
                                : "var(--surface-3)",
                            transition: "background 0.3s",
                          }}
                        />
                      ))}
                    </div>
                    <p
                      style={{
                        fontSize: "0.72rem",
                        color:
                          password.length >= 10
                            ? "var(--success)"
                            : password.length >= 7
                              ? "var(--warning)"
                              : "var(--danger)",
                        marginTop: "0.35rem",
                      }}
                    >
                      {password.length >= 10
                        ? "Strong password"
                        : password.length >= 7
                          ? "Medium strength"
                          : "Weak password"}
                    </p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading || (confirm && confirm !== password)}
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
                    opacity: loading ? 0.7 : 1,
                    marginTop: "0.25rem",
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
                    <>
                      <div
                        style={{
                          width: 16,
                          height: 16,
                          border: "2px solid rgba(255,255,255,0.3)",
                          borderTopColor: "#fff",
                          borderRadius: "50%",
                          animation: "spin-slow 0.7s linear infinite",
                        }}
                      />{" "}
                      Setting…
                    </>
                  ) : (
                    <>
                      <FiLock size={15} /> Set Password
                    </>
                  )}
                </button>
              </form>

              <p
                style={{
                  textAlign: "center",
                  marginTop: "1.5rem",
                  fontSize: "0.83rem",
                  color: "var(--text-3)",
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
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
}

export default SetPasswordPage;
