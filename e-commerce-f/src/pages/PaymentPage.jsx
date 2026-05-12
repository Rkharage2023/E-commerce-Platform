import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearCart } from "../store/cartSlice";
import { API_URL } from "../utils/api";
import { motion } from "framer-motion";
import { FiCreditCard, FiLock, FiCheckCircle } from "react-icons/fi";

function PaymentPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const { cartItems, totalPrice } = location.state || {};
  const token = localStorage.getItem("jwtToken");

  const handlePayment = async () => {
    setLoading(true);
    try {
      const orderItems = cartItems.map((item) => ({
        product: item.product._id,
        name: item.product.name,
        price: item.product.price,
        qty: item.quantity,
      }));

      await axios.post(
        `${API_URL}/api/orders`,
        { items: orderItems, totalPrice },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      setSuccess(true);
      dispatch(clearCart());
      setTimeout(() => navigate("/orders"), 2000);
    } catch (error) {
      console.log(error.response?.data);
      alert("Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!cartItems || cartItems.length === 0) {
    return (
      <div
        style={{
          minHeight: "60vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <p style={{ color: "var(--text-2)" }}>No items to pay for.</p>
      </div>
    );
  }

  if (success) {
    return (
      <div
        style={{
          minHeight: "60vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", damping: 15 }}
          style={{ textAlign: "center" }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.2 }}
            style={{
              width: 80,
              height: 80,
              borderRadius: "50%",
              background: "rgba(5,150,105,0.12)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 1.5rem",
            }}
          >
            <FiCheckCircle size={36} style={{ color: "var(--success)" }} />
          </motion.div>
          <h2
            style={{
              fontFamily: "Syne, sans-serif",
              fontWeight: 800,
              fontSize: "1.75rem",
              color: "var(--text-1)",
              marginBottom: "0.5rem",
            }}
          >
            Payment Successful!
          </h2>
          <p style={{ color: "var(--text-2)" }}>Redirecting to your orders…</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div
      style={{ maxWidth: 520, margin: "0 auto", padding: "3rem 1.5rem 5rem" }}
    >
      <div style={{ marginBottom: "2.5rem" }}>
        <p className="label" style={{ marginBottom: "0.5rem" }}>
          Final Step
        </p>
        <h1
          style={{
            fontFamily: "Syne, sans-serif",
            fontWeight: 800,
            fontSize: "2.25rem",
            color: "var(--text-1)",
          }}
        >
          Payment
        </h1>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: "var(--r-xl)",
            overflow: "hidden",
            boxShadow: "var(--shadow-md)",
          }}
        >
          {/* Amount */}
          <div
            style={{
              background:
                "linear-gradient(135deg, var(--accent) 0%, #3B1F8C 100%)",
              padding: "2.5rem",
              textAlign: "center",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              className="orb"
              style={{
                position: "absolute",
                width: 200,
                height: 200,
                background: "rgba(255,255,255,0.08)",
                top: -80,
                right: -60,
              }}
            />
            <p
              style={{
                color: "rgba(255,255,255,0.7)",
                fontFamily: "Syne, sans-serif",
                fontWeight: 600,
                fontSize: "0.8rem",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                marginBottom: "0.75rem",
              }}
            >
              Total Amount
            </p>
            <p
              style={{
                fontFamily: "Syne, sans-serif",
                fontWeight: 800,
                fontSize: "3rem",
                color: "#fff",
                lineHeight: 1,
              }}
            >
              ${totalPrice?.toFixed(2)}
            </p>
            <p
              style={{
                color: "rgba(255,255,255,0.5)",
                fontSize: "0.8rem",
                marginTop: "0.5rem",
              }}
            >
              {cartItems.length} item{cartItems.length !== 1 ? "s" : ""} · Free
              shipping
            </p>
          </div>

          {/* Card form (visual only) */}
          <div style={{ padding: "2rem" }}>
            <div style={{ marginBottom: "1.25rem" }}>
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
                Card Number
              </label>
              <div style={{ position: "relative" }}>
                <FiCreditCard
                  size={15}
                  style={{
                    position: "absolute",
                    left: "1rem",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "var(--text-3)",
                  }}
                />
                <input
                  className="input"
                  style={{ paddingLeft: "2.75rem" }}
                  placeholder="•••• •••• •••• ••••"
                  defaultValue="4242 4242 4242 4242"
                  readOnly
                />
              </div>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1rem",
                marginBottom: "1.5rem",
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
                  Expiry
                </label>
                <input
                  className="input"
                  placeholder="MM / YY"
                  defaultValue="12 / 28"
                  readOnly
                />
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
                  CVV
                </label>
                <input
                  className="input"
                  placeholder="•••"
                  defaultValue="•••"
                  readOnly
                />
              </div>
            </div>

            {/* Security note */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.75rem 1rem",
                background: "rgba(5,150,105,0.06)",
                border: "1px solid rgba(5,150,105,0.15)",
                borderRadius: "var(--r-sm)",
                marginBottom: "1.5rem",
              }}
            >
              <FiLock
                size={13}
                style={{ color: "var(--success)", flexShrink: 0 }}
              />
              <p style={{ fontSize: "0.78rem", color: "var(--text-2)" }}>
                Your payment info is encrypted and secure
              </p>
            </div>

            <button
              onClick={handlePayment}
              disabled={loading}
              style={{
                width: "100%",
                padding: "1rem",
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
                      width: 18,
                      height: 18,
                      border: "2px solid rgba(255,255,255,0.3)",
                      borderTopColor: "#fff",
                      borderRadius: "50%",
                      animation: "spin-slow 0.7s linear infinite",
                    }}
                  />{" "}
                  Processing…
                </>
              ) : (
                <>
                  <FiLock size={15} /> Pay ${totalPrice?.toFixed(2)}
                </>
              )}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default PaymentPage;
