import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setCredentials } from "../store/authSlice";
import { API_URL } from "../utils/api";

function GoogleSuccess() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
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
        .catch(() => navigate("/login"));
    } else {
      navigate("/login");
    }
  }, [navigate, dispatch]);

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
