import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setCredentials } from "../store/authSlice";
import { API_URL } from "../utils/api";
import { motion } from "framer-motion";
import { FiAlertCircle } from "react-icons/fi";

function GoogleSuccess() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const hashParams = new URLSearchParams(
      window.location.hash.replace("#", "?"),
    );
    const token = params.get("token") || hashParams.get("token");

    if (!token) {
      setError("No authentication token received.");
      setTimeout(() => navigate("/login"), 3000);
      return;
    }

    axios
      .get(`${API_URL}/api/auth/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        dispatch(
          setCredentials({
            token,
            user: {
              _id: res.data._id,
              name: res.data.name,
              email: res.data.email,
              role: res.data.role,
            },
          }),
        );
        if (res.data.role === "admin") navigate("/admin");
        else if (res.data.role === "employee") navigate("/employee");
        else navigate("/");
      })
      .catch((err) => {
        console.error("Google auth error:", err);
        setError("Authentication failed. Please try again.");
        setTimeout(() => navigate("/login"), 3000);
      });
  }, [navigate, dispatch]);

  if (error) {
    return (
      <div
        style={{
          minHeight: "60vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem",
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{ textAlign: "center", maxWidth: 380 }}
        >
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: "50%",
              background: "rgba(220,38,38,0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 1.25rem",
            }}
          >
            <FiAlertCircle size={28} style={{ color: "var(--danger)" }} />
          </div>
          <h2
            style={{
              fontFamily: "Syne, sans-serif",
              fontWeight: 700,
              color: "var(--text-1)",
              marginBottom: "0.5rem",
            }}
          >
            Sign In Failed
          </h2>
          <p
            style={{
              color: "var(--text-2)",
              fontSize: "0.88rem",
              marginBottom: "0.75rem",
            }}
          >
            {error}
          </p>
          <p style={{ color: "var(--text-3)", fontSize: "0.8rem" }}>
            Redirecting to login…
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "60vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <div
          style={{
            width: 52,
            height: 52,
            border: "3px solid var(--border)",
            borderTopColor: "var(--accent)",
            borderRadius: "50%",
            animation: "spin-slow 0.8s linear infinite",
            margin: "0 auto 1.25rem",
          }}
        />
        <h2
          style={{
            fontFamily: "Syne, sans-serif",
            fontWeight: 700,
            color: "var(--text-1)",
            marginBottom: "0.4rem",
          }}
        >
          Signing you in…
        </h2>
        <p style={{ color: "var(--text-2)", fontSize: "0.88rem" }}>
          Completing your Google authentication
        </p>
      </div>
    </div>
  );
}

export default GoogleSuccess;
