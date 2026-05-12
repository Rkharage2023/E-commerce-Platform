import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowUpRight, FiStar } from "react-icons/fi";

function ProductCard({ product, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.45,
        delay: index * 0.07,
        ease: [0.4, 0, 0.2, 1],
      }}
      whileHover={{ y: -8 }}
    >
      <Link
        to={`/products/${product._id}`}
        style={{ textDecoration: "none", display: "block" }}
      >
        <div
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: "var(--r-lg)",
            overflow: "hidden",
            transition:
              "box-shadow 0.35s var(--ease), border-color 0.35s var(--ease)",
            cursor: "pointer",
            position: "relative",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = "var(--shadow-lg)";
            e.currentTarget.style.borderColor = "var(--border-hover)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = "none";
            e.currentTarget.style.borderColor = "var(--border)";
          }}
        >
          {/* Image area */}
          <div
            style={{
              aspectRatio: "1",
              overflow: "hidden",
              background: "var(--surface-2)",
              position: "relative",
            }}
            className="img-zoom"
          >
            <img
              src={
                product.imageUrl ||
                "https://placehold.co/400x400/F4F3FF/5B3FD4?text=Product"
              }
              alt={product.name}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />

            {/* Category badge overlay */}
            <div
              style={{
                position: "absolute",
                top: 12,
                left: 12,
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: 8,
                padding: "0.2rem 0.625rem",
                fontSize: "0.68rem",
                fontFamily: "Syne, sans-serif",
                fontWeight: 700,
                color: "var(--text-2)",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                backdropFilter: "blur(10px)",
              }}
            >
              {product.category}
            </div>

            {/* Arrow icon overlay */}
            <div
              style={{
                position: "absolute",
                top: 12,
                right: 12,
                width: 32,
                height: 32,
                borderRadius: 9,
                background: "rgba(255,255,255,0.9)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                opacity: 0,
                transition: "opacity 0.25s",
              }}
              className="card-arrow"
            >
              <FiArrowUpRight size={15} style={{ color: "var(--accent)" }} />
            </div>

            {/* Stock badge */}
            {product.countInStock === 0 && (
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "rgba(0,0,0,0.4)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backdropFilter: "blur(2px)",
                }}
              >
                <span
                  style={{
                    background: "var(--danger)",
                    color: "#fff",
                    padding: "0.35rem 0.875rem",
                    borderRadius: 99,
                    fontFamily: "Syne, sans-serif",
                    fontWeight: 700,
                    fontSize: "0.78rem",
                  }}
                >
                  Out of Stock
                </span>
              </div>
            )}
          </div>

          {/* Content */}
          <div style={{ padding: "1.25rem" }}>
            <p
              style={{
                fontSize: "0.72rem",
                color: "var(--text-3)",
                fontFamily: "Syne, sans-serif",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                marginBottom: "0.4rem",
              }}
            >
              {product.brand}
            </p>
            <h3
              style={{
                fontFamily: "Syne, sans-serif",
                fontWeight: 700,
                fontSize: "0.95rem",
                color: "var(--text-1)",
                marginBottom: "0.75rem",
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: 1,
                WebkitBoxOrient: "vertical",
              }}
            >
              {product.name}
            </h3>

            {/* Rating stars (decorative) */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.2rem",
                marginBottom: "0.875rem",
              }}
            >
              {[1, 2, 3, 4, 5].map((s) => (
                <FiStar
                  key={s}
                  size={11}
                  style={{ color: "var(--accent-3)", fill: "var(--accent-3)" }}
                />
              ))}
              <span
                style={{
                  fontSize: "0.72rem",
                  color: "var(--text-3)",
                  marginLeft: "0.3rem",
                }}
              >
                5.0
              </span>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <span
                style={{
                  fontFamily: "Syne, sans-serif",
                  fontWeight: 800,
                  fontSize: "1.2rem",
                  color: "var(--text-1)",
                }}
              >
                ${product.price}
              </span>
              <span
                style={{
                  fontSize: "0.72rem",
                  fontFamily: "Syne, sans-serif",
                  fontWeight: 600,
                  color:
                    product.countInStock > 0
                      ? "var(--success)"
                      : "var(--danger)",
                  background:
                    product.countInStock > 0
                      ? "rgba(5,150,105,0.1)"
                      : "rgba(220,38,38,0.1)",
                  padding: "0.2rem 0.6rem",
                  borderRadius: 6,
                }}
              >
                {product.countInStock > 0
                  ? `${product.countInStock} left`
                  : "Out of stock"}
              </span>
            </div>
          </div>
        </div>
      </Link>

      <style>{`
        div:hover .card-arrow { opacity: 1 !important; }
      `}</style>
    </motion.div>
  );
}

export default ProductCard;
