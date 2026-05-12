import React from "react";
import { useSelector } from "react-redux";
import { selectCartItems } from "../store/cartSlice";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiShoppingBag, FiArrowRight, FiShield, FiTruck } from "react-icons/fi";

function CheckoutPage() {
  const cartItems = useSelector(selectCartItems);
  const navigate = useNavigate();

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0,
  );
  const shipping = 0;
  const totalPrice = subtotal + shipping;

  if (cartItems.length === 0) {
    return (
      <div
        style={{
          minHeight: "60vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <FiShoppingBag size={40} style={{ color: "var(--text-3)" }} />
        <p
          style={{
            fontFamily: "Syne, sans-serif",
            fontWeight: 600,
            color: "var(--text-2)",
          }}
        >
          Your cart is empty
        </p>
        <button
          onClick={() => navigate("/products")}
          className="btn btn-primary"
        >
          Browse Products
        </button>
      </div>
    );
  }

  return (
    <div
      style={{ maxWidth: 1100, margin: "0 auto", padding: "3rem 1.5rem 5rem" }}
    >
      <div style={{ marginBottom: "2.5rem" }}>
        <p className="label" style={{ marginBottom: "0.5rem" }}>
          Almost There
        </p>
        <h1
          style={{
            fontFamily: "Syne, sans-serif",
            fontWeight: 800,
            fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
            color: "var(--text-1)",
          }}
        >
          Checkout
        </h1>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 380px",
          gap: "2rem",
          alignItems: "start",
        }}
      >
        {/* Order Items */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: "var(--r-lg)",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                padding: "1.25rem 1.5rem",
                borderBottom: "1px solid var(--border)",
              }}
            >
              <p
                style={{
                  fontFamily: "Syne, sans-serif",
                  fontWeight: 700,
                  color: "var(--text-1)",
                }}
              >
                Order Items{" "}
                <span style={{ color: "var(--text-3)", fontWeight: 500 }}>
                  ({cartItems.length})
                </span>
              </p>
            </div>

            <div style={{ padding: "0.75rem" }}>
              {cartItems.map((item, i) => (
                <motion.div
                  key={item.product._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                  style={{
                    display: "flex",
                    gap: "1rem",
                    alignItems: "center",
                    padding: "0.875rem 0.75rem",
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
                      width: 60,
                      height: 60,
                      borderRadius: 12,
                      background: "var(--surface-2)",
                      overflow: "hidden",
                      flexShrink: 0,
                      border: "1px solid var(--border)",
                    }}
                  >
                    <img
                      src={item.product.imageUrl || "https://placehold.co/120"}
                      alt={item.product.name}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p
                      style={{
                        fontFamily: "Syne, sans-serif",
                        fontWeight: 600,
                        fontSize: "0.9rem",
                        color: "var(--text-1)",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {item.product.name}
                    </p>
                    <p
                      style={{
                        fontSize: "0.8rem",
                        color: "var(--text-3)",
                        marginTop: "0.15rem",
                      }}
                    >
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <p
                    style={{
                      fontFamily: "Syne, sans-serif",
                      fontWeight: 700,
                      color: "var(--text-1)",
                      flexShrink: 0,
                    }}
                  >
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Trust badges */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "0.875rem",
              marginTop: "1rem",
            }}
          >
            {[
              {
                icon: <FiShield size={15} />,
                text: "Secure & encrypted checkout",
              },
              { icon: <FiTruck size={15} />, text: "Free shipping worldwide" },
            ].map((b) => (
              <div
                key={b.text}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.6rem",
                  padding: "0.875rem 1rem",
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--r-md)",
                }}
              >
                <span style={{ color: "var(--success)" }}>{b.icon}</span>
                <span
                  style={{
                    fontSize: "0.8rem",
                    color: "var(--text-2)",
                    fontWeight: 500,
                  }}
                >
                  {b.text}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Order Summary */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          style={{ position: "sticky", top: "6rem" }}
        >
          <div
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: "var(--r-lg)",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                padding: "1.25rem 1.5rem",
                borderBottom: "1px solid var(--border)",
              }}
            >
              <p
                style={{
                  fontFamily: "Syne, sans-serif",
                  fontWeight: 700,
                  color: "var(--text-1)",
                }}
              >
                Order Summary
              </p>
            </div>
            <div style={{ padding: "1.5rem" }}>
              {[
                { label: "Subtotal", value: `$${subtotal.toFixed(2)}` },
                { label: "Shipping", value: "Free", green: true },
                { label: "Tax", value: "$0.00" },
              ].map((row) => (
                <div
                  key={row.label}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "1rem",
                  }}
                >
                  <span style={{ color: "var(--text-2)", fontSize: "0.88rem" }}>
                    {row.label}
                  </span>
                  <span
                    style={{
                      fontFamily: "Syne, sans-serif",
                      fontWeight: 600,
                      fontSize: "0.88rem",
                      color: row.green ? "var(--success)" : "var(--text-1)",
                    }}
                  >
                    {row.value}
                  </span>
                </div>
              ))}

              <div
                style={{
                  height: 1,
                  background: "var(--border)",
                  margin: "1.25rem 0",
                }}
              />

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "1.5rem",
                }}
              >
                <span
                  style={{
                    fontFamily: "Syne, sans-serif",
                    fontWeight: 700,
                    color: "var(--text-1)",
                  }}
                >
                  Total
                </span>
                <span
                  style={{
                    fontFamily: "Syne, sans-serif",
                    fontWeight: 800,
                    fontSize: "1.4rem",
                    color: "var(--text-1)",
                  }}
                >
                  ${totalPrice.toFixed(2)}
                </span>
              </div>

              <button
                onClick={() =>
                  navigate("/payment", { state: { cartItems, totalPrice } })
                }
                style={{
                  width: "100%",
                  padding: "1rem",
                  borderRadius: "var(--r-md)",
                  background: "var(--accent)",
                  color: "#fff",
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "Syne, sans-serif",
                  fontWeight: 700,
                  fontSize: "0.95rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.5rem",
                  boxShadow: "0 8px 24px var(--accent-glow)",
                  transition: "all 0.25s var(--ease)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "var(--accent-light)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "var(--accent)";
                  e.currentTarget.style.transform = "none";
                }}
              >
                Proceed to Payment <FiArrowRight size={16} />
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      <style>{`@media (max-width: 768px) { .checkout-grid { grid-template-columns: 1fr !important; } }`}</style>
    </div>
  );
}

export default CheckoutPage;
