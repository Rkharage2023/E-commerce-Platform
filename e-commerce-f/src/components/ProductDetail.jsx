import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addItem } from "../store/cartSlice";
import { API_URL } from "../utils/api";
import { motion } from "framer-motion";
import {
  FiArrowLeft,
  FiShoppingBag,
  FiShield,
  FiTruck,
  FiRefreshCw,
  FiMinus,
  FiPlus,
  FiStar,
} from "react-icons/fi";

function ProductDetail({ onAdded }) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${API_URL}/api/products/${id}`)
      .then((res) => setProduct(res.data));
  }, [id]);

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) dispatch(addItem(product));
    setAdded(true);
    if (onAdded) onAdded();
    setTimeout(() => setAdded(false), 2000);
  };

  if (!product)
    return (
      <div
        style={{
          minHeight: "70vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: "50%",
              border: "3px solid var(--border)",
              borderTopColor: "var(--accent)",
              animation: "spin-slow 0.8s linear infinite",
            }}
          />
          <p
            style={{
              color: "var(--text-2)",
              fontFamily: "Syne, sans-serif",
              fontWeight: 600,
            }}
          >
            Loading product…
          </p>
        </div>
      </div>
    );

  const features = [
    {
      icon: <FiShield size={16} />,
      label: "Warranty",
      desc: "Official 1-year warranty",
    },
    {
      icon: <FiTruck size={16} />,
      label: "Free Shipping",
      desc: "On all orders",
    },
    {
      icon: <FiRefreshCw size={16} />,
      label: "Easy Returns",
      desc: "30-day return policy",
    },
  ];

  return (
    <div
      style={{
        maxWidth: 1280,
        margin: "0 auto",
        padding: "2.5rem 1.5rem 5rem",
      }}
    >
      {/* Back */}
      <button
        onClick={() => navigate(-1)}
        className="btn btn-ghost btn-sm"
        style={{
          marginBottom: "2.5rem",
          gap: "0.4rem",
          padding: "0.4rem 0.75rem",
        }}
      >
        <FiArrowLeft size={15} /> Back to Shop
      </button>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "5rem",
          alignItems: "start",
        }}
      >
        {/* Image */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          style={{ position: "sticky", top: "6rem" }}
        >
          <div
            style={{
              background: "var(--surface-2)",
              borderRadius: "var(--r-xl)",
              border: "1px solid var(--border)",
              overflow: "hidden",
              aspectRatio: "1",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src={
                product.imageUrl ||
                "https://placehold.co/800x800/EDEAFF/5B3FD4?text=Product"
              }
              alt={product.name}
              style={{
                width: "80%",
                height: "80%",
                objectFit: "contain",
                transition: "transform 0.5s var(--ease)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.04)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
              }}
            />
          </div>

          {/* Thumbnails placeholder */}
          <div style={{ display: "flex", gap: "0.75rem", marginTop: "1rem" }}>
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                style={{
                  flex: 1,
                  aspectRatio: "1",
                  borderRadius: "var(--r-md)",
                  background: "var(--surface-2)",
                  border: "1px solid var(--border)",
                  cursor: "pointer",
                  opacity: n === 1 ? 1 : 0.5,
                  transition: "opacity 0.2s",
                }}
              />
            ))}
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}
        >
          {/* Brand + Category */}
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            <span
              style={{
                background: "var(--accent-glow)",
                color: "var(--accent)",
                padding: "0.3rem 0.75rem",
                borderRadius: 99,
                fontSize: "0.75rem",
                fontFamily: "Syne, sans-serif",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.06em",
              }}
            >
              {product.category}
            </span>
            <span
              style={{
                background: "var(--surface-2)",
                color: "var(--text-2)",
                padding: "0.3rem 0.75rem",
                borderRadius: 99,
                fontSize: "0.75rem",
                fontFamily: "Syne, sans-serif",
                fontWeight: 700,
              }}
            >
              {product.brand}
            </span>
          </div>

          {/* Name */}
          <h1
            style={{
              fontFamily: "Syne, sans-serif",
              fontWeight: 800,
              fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
              color: "var(--text-1)",
              lineHeight: 1.15,
            }}
          >
            {product.name}
          </h1>

          {/* Rating */}
          <div
            style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}
          >
            <div style={{ display: "flex", gap: "0.2rem" }}>
              {[1, 2, 3, 4, 5].map((s) => (
                <FiStar
                  key={s}
                  size={16}
                  style={{ color: "var(--accent-3)", fill: "var(--accent-3)" }}
                />
              ))}
            </div>
            <span style={{ color: "var(--text-2)", fontSize: "0.85rem" }}>
              4.9 · 128 reviews
            </span>
          </div>

          {/* Price */}
          <div>
            <p
              style={{
                fontFamily: "Syne, sans-serif",
                fontWeight: 800,
                fontSize: "2.5rem",
                color: "var(--text-1)",
                lineHeight: 1,
              }}
            >
              ${product.price}
              <span
                style={{
                  fontFamily: "Syne, sans-serif",
                  fontWeight: 500,
                  fontSize: "1rem",
                  color: "var(--text-3)",
                  marginLeft: "0.5rem",
                  textDecoration: "line-through",
                }}
              >
                ${(product.price * 1.2).toFixed(2)}
              </span>
            </p>
            <span
              style={{
                background: "rgba(5,150,105,0.12)",
                color: "var(--success)",
                padding: "0.2rem 0.6rem",
                borderRadius: 6,
                fontSize: "0.75rem",
                fontFamily: "Syne, sans-serif",
                fontWeight: 700,
              }}
            >
              Save 20%
            </span>
          </div>

          {/* Description */}
          <p
            style={{
              color: "var(--text-2)",
              lineHeight: 1.75,
              fontSize: "0.93rem",
            }}
          >
            {product.description}
          </p>

          {/* Qty + CTA */}
          <div
            style={{
              display: "flex",
              gap: "1rem",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            {/* Qty */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                background: "var(--surface-2)",
                border: "1px solid var(--border)",
                borderRadius: "var(--r-sm)",
                padding: "0.5rem 1rem",
              }}
            >
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "var(--text-2)",
                  display: "flex",
                  padding: 0,
                }}
              >
                <FiMinus size={14} />
              </button>
              <span
                style={{
                  fontFamily: "Syne, sans-serif",
                  fontWeight: 700,
                  fontSize: "1rem",
                  color: "var(--text-1)",
                  minWidth: 24,
                  textAlign: "center",
                }}
              >
                {qty}
              </span>
              <button
                onClick={() => setQty((q) => q + 1)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "var(--text-2)",
                  display: "flex",
                  padding: 0,
                }}
              >
                <FiPlus size={14} />
              </button>
            </div>

            {/* Add to Cart */}
            <button
              onClick={handleAdd}
              disabled={product.countInStock === 0}
              style={{
                flex: 1,
                minWidth: 180,
                padding: "0.95rem 2rem",
                borderRadius: "var(--r-md)",
                background: added ? "var(--success)" : "var(--accent)",
                color: "#fff",
                border: "none",
                cursor: product.countInStock === 0 ? "not-allowed" : "pointer",
                fontFamily: "Syne, sans-serif",
                fontWeight: 700,
                fontSize: "0.95rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.5rem",
                boxShadow: `0 8px 24px ${added ? "rgba(5,150,105,0.35)" : "var(--accent-glow)"}`,
                transition: "all 0.3s var(--ease)",
                opacity: product.countInStock === 0 ? 0.5 : 1,
              }}
              onMouseEnter={(e) => {
                if (product.countInStock > 0 && !added) {
                  e.currentTarget.style.transform = "translateY(-2px)";
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "none";
              }}
            >
              <FiShoppingBag size={17} />
              {product.countInStock === 0
                ? "Out of Stock"
                : added
                  ? "Added to Cart!"
                  : "Add to Cart"}
            </button>
          </div>

          {/* Stock */}
          <p
            style={{
              fontSize: "0.82rem",
              color:
                product.countInStock > 5
                  ? "var(--success)"
                  : product.countInStock > 0
                    ? "var(--warning)"
                    : "var(--danger)",
              fontWeight: 600,
            }}
          >
            {product.countInStock > 5
              ? "✓ In Stock"
              : product.countInStock > 0
                ? `⚠ Only ${product.countInStock} left`
                : "✕ Out of Stock"}
          </p>

          {/* Features */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "0.875rem",
            }}
          >
            {features.map((f) => (
              <div
                key={f.label}
                style={{
                  background: "var(--surface-2)",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--r-md)",
                  padding: "1rem",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    color: "var(--accent)",
                    marginBottom: "0.5rem",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  {f.icon}
                </div>
                <p
                  style={{
                    fontFamily: "Syne, sans-serif",
                    fontWeight: 700,
                    fontSize: "0.78rem",
                    color: "var(--text-1)",
                    marginBottom: "0.15rem",
                  }}
                >
                  {f.label}
                </p>
                <p style={{ fontSize: "0.7rem", color: "var(--text-3)" }}>
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Mobile layout override */}
      <style>{`
        @media (max-width: 768px) {
          .product-grid { grid-template-columns: 1fr !important; gap: 2rem !important; }
        }
      `}</style>
    </div>
  );
}

export default ProductDetail;
