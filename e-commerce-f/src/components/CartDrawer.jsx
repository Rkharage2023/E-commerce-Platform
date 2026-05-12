import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiX,
  FiTrash2,
  FiMinus,
  FiPlus,
  FiShoppingBag,
  FiArrowRight,
} from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import {
  removeItem,
  updateQuantity,
  selectCartItems,
  selectCartTotalPrice,
} from "../store/cartSlice";
import { useNavigate } from "react-router-dom";

function CartDrawer({ isOpen, onClose }) {
  const cartItems = useSelector(selectCartItems);
  const totalPrice = useSelector(selectCartTotalPrice);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCheckout = () => {
    onClose();
    navigate("/checkout");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.55)",
              backdropFilter: "blur(4px)",
              zIndex: 200,
            }}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            style={{
              position: "fixed",
              right: 0,
              top: 0,
              bottom: 0,
              width: "100%",
              maxWidth: 420,
              background: "var(--surface)",
              zIndex: 201,
              display: "flex",
              flexDirection: "column",
              boxShadow: "-20px 0 80px rgba(0,0,0,0.35)",
            }}
          >
            {/* Header */}
            <div
              style={{
                padding: "1.5rem 1.75rem",
                borderBottom: "1px solid var(--border)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                }}
              >
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 10,
                    background: "var(--accent-glow)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <FiShoppingBag size={16} style={{ color: "var(--accent)" }} />
                </div>
                <div>
                  <h2
                    style={{
                      fontFamily: "Syne, sans-serif",
                      fontWeight: 800,
                      fontSize: "1.1rem",
                      color: "var(--text-1)",
                    }}
                  >
                    Your Cart
                  </h2>
                  <p style={{ fontSize: "0.75rem", color: "var(--text-2)" }}>
                    {cartItems.length} item{cartItems.length !== 1 ? "s" : ""}
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 10,
                  background: "var(--surface-2)",
                  border: "1px solid var(--border)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  color: "var(--text-2)",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "var(--text-1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "var(--text-2)";
                }}
              >
                <FiX size={16} />
              </button>
            </div>

            {/* Items */}
            <div
              style={{ flex: 1, overflowY: "auto", padding: "1.25rem 1.75rem" }}
            >
              {cartItems.length === 0 ? (
                <div
                  style={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "1rem",
                  }}
                >
                  <div
                    style={{
                      width: 72,
                      height: 72,
                      borderRadius: 20,
                      background: "var(--surface-2)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <FiShoppingBag
                      size={28}
                      style={{ color: "var(--text-3)" }}
                    />
                  </div>
                  <p
                    style={{
                      color: "var(--text-2)",
                      fontFamily: "Syne, sans-serif",
                      fontWeight: 600,
                    }}
                  >
                    Your cart is empty
                  </p>
                  <button onClick={onClose} className="btn btn-primary btn-sm">
                    Browse Products
                  </button>
                </div>
              ) : (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                  }}
                >
                  <AnimatePresence>
                    {cartItems.map((item) => (
                      <motion.div
                        key={item.product._id}
                        layout
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{
                          opacity: 0,
                          x: -20,
                          height: 0,
                          marginBottom: 0,
                        }}
                        transition={{ duration: 0.25 }}
                        style={{
                          display: "flex",
                          gap: "1rem",
                          padding: "1rem",
                          borderRadius: "var(--r-md)",
                          background: "var(--surface-2)",
                          border: "1px solid var(--border)",
                        }}
                      >
                        {/* Image */}
                        <div
                          style={{
                            width: 64,
                            height: 64,
                            borderRadius: 12,
                            overflow: "hidden",
                            flexShrink: 0,
                            background: "var(--surface-3)",
                          }}
                        >
                          <img
                            src={
                              item.product.imageUrl ||
                              "https://placehold.co/200"
                            }
                            alt={item.product.name}
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                            }}
                          />
                        </div>

                        {/* Info */}
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <p
                            style={{
                              fontFamily: "Syne, sans-serif",
                              fontWeight: 700,
                              fontSize: "0.875rem",
                              color: "var(--text-1)",
                              marginBottom: "0.25rem",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {item.product.name}
                          </p>
                          <p
                            style={{
                              color: "var(--accent)",
                              fontWeight: 700,
                              fontSize: "0.9rem",
                              fontFamily: "Syne, sans-serif",
                            }}
                          >
                            ${(item.product.price * item.quantity).toFixed(2)}
                          </p>

                          {/* Qty Controls */}
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "0.5rem",
                              marginTop: "0.6rem",
                            }}
                          >
                            <button
                              onClick={() =>
                                dispatch(
                                  updateQuantity({
                                    productId: item.product._id,
                                    quantity: item.quantity - 1,
                                  }),
                                )
                              }
                              disabled={item.quantity <= 1}
                              style={{
                                width: 26,
                                height: 26,
                                borderRadius: 8,
                                background: "var(--surface)",
                                border: "1px solid var(--border)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                cursor: "pointer",
                                color: "var(--text-2)",
                                opacity: item.quantity <= 1 ? 0.4 : 1,
                              }}
                            >
                              <FiMinus size={11} />
                            </button>
                            <span
                              style={{
                                fontSize: "0.8rem",
                                fontWeight: 700,
                                fontFamily: "Syne, sans-serif",
                                color: "var(--text-1)",
                                minWidth: 20,
                                textAlign: "center",
                              }}
                            >
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                dispatch(
                                  updateQuantity({
                                    productId: item.product._id,
                                    quantity: item.quantity + 1,
                                  }),
                                )
                              }
                              style={{
                                width: 26,
                                height: 26,
                                borderRadius: 8,
                                background: "var(--surface)",
                                border: "1px solid var(--border)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                cursor: "pointer",
                                color: "var(--text-2)",
                              }}
                            >
                              <FiPlus size={11} />
                            </button>
                          </div>
                        </div>

                        {/* Remove */}
                        <button
                          onClick={() => dispatch(removeItem(item.product._id))}
                          style={{
                            alignSelf: "flex-start",
                            width: 30,
                            height: 30,
                            borderRadius: 8,
                            background: "transparent",
                            border: "none",
                            cursor: "pointer",
                            color: "var(--text-3)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            transition: "color 0.15s",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.color = "var(--danger)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.color = "var(--text-3)";
                          }}
                        >
                          <FiTrash2 size={14} />
                        </button>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {/* Footer */}
            {cartItems.length > 0 && (
              <div
                style={{
                  padding: "1.25rem 1.75rem",
                  borderTop: "1px solid var(--border)",
                  background: "var(--surface)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "1rem",
                  }}
                >
                  <span
                    style={{
                      color: "var(--text-2)",
                      fontFamily: "Syne, sans-serif",
                      fontWeight: 600,
                      fontSize: "0.85rem",
                    }}
                  >
                    Total
                  </span>
                  <span
                    style={{
                      fontFamily: "Syne, sans-serif",
                      fontWeight: 800,
                      fontSize: "1.35rem",
                      color: "var(--text-1)",
                    }}
                  >
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>
                <button
                  onClick={handleCheckout}
                  style={{
                    width: "100%",
                    padding: "0.95rem",
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
                  Checkout Now <FiArrowRight size={16} />
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default CartDrawer;
