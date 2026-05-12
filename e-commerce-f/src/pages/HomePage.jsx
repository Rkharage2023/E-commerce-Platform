import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import {
  FiArrowRight,
  FiZap,
  FiShield,
  FiTruck,
  FiStar,
  FiArrowUpRight,
} from "react-icons/fi";
import { API_URL } from "../utils/api";
import ProductCard from "../components/ProductCard.jsx";

function HomePage() {
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_URL}/api/products`)
      .then((res) => setFeatured(res.data.slice(0, 4)))
      .catch(() => {});
  }, []);

  const perks = [
    {
      icon: <FiZap />,
      title: "Instant Delivery",
      desc: "Same-day dispatch on all orders placed before 3 PM.",
    },
    {
      icon: <FiShield />,
      title: "2-Year Warranty",
      desc: "Every product covered by our comprehensive protection plan.",
    },
    {
      icon: <FiTruck />,
      title: "Free Shipping",
      desc: "No minimums. Free worldwide shipping on every order.",
    },
    {
      icon: <FiStar />,
      title: "Top Rated",
      desc: "Curated selection with a minimum 4.5-star rating.",
    },
  ];

  return (
    <div>
      {/* ── HERO ────────────────────────────────────────────────── */}
      <section
        style={{
          padding: "2rem 1.5rem 5rem",
          maxWidth: 1280,
          margin: "0 auto",
        }}
      >
        <div
          style={{
            position: "relative",
            borderRadius: "var(--r-2xl)",
            background: "var(--surface)",
            border: "1px solid var(--border)",
            overflow: "hidden",
            padding: "clamp(3rem, 8vw, 6rem) clamp(2rem, 6vw, 5rem)",
            minHeight: 520,
            display: "flex",
            alignItems: "center",
          }}
        >
          {/* Background gradient orbs */}
          <div
            className="orb"
            style={{
              position: "absolute",
              width: 500,
              height: 500,
              background: "var(--accent)",
              opacity: 0.12,
              top: -200,
              right: -100,
            }}
          />
          <div
            className="orb"
            style={{
              position: "absolute",
              width: 350,
              height: 350,
              background: "var(--accent-2)",
              opacity: 0.08,
              bottom: -150,
              left: 50,
              animationDelay: "3s",
            }}
          />
          <div
            className="orb"
            style={{
              position: "absolute",
              width: 200,
              height: 200,
              background: "var(--accent-3)",
              opacity: 0.1,
              top: 100,
              left: "40%",
              animationDelay: "1.5s",
            }}
          />

          {/* Grid pattern overlay */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              opacity: 0.03,
              backgroundImage: `repeating-linear-gradient(var(--text-1) 0 1px, transparent 1px 100%),
              repeating-linear-gradient(90deg, var(--text-1) 0 1px, transparent 1px 100%)`,
              backgroundSize: "60px 60px",
            }}
          />

          <div style={{ position: "relative", zIndex: 1, maxWidth: 680 }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  background: "var(--accent-glow)",
                  border: "1px solid var(--border-hover)",
                  color: "var(--accent)",
                  padding: "0.4rem 1rem",
                  borderRadius: 99,
                  fontFamily: "Syne, sans-serif",
                  fontWeight: 700,
                  fontSize: "0.78rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  marginBottom: "1.75rem",
                }}
              >
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: "var(--accent)",
                    display: "inline-block",
                    animation: "glow-pulse 2s ease-in-out infinite",
                  }}
                />
                New Collection 2026
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.1 }}
              style={{
                fontFamily: "Syne, sans-serif",
                fontWeight: 800,
                fontSize: "clamp(2.8rem, 6vw, 5rem)",
                lineHeight: 1.06,
                color: "var(--text-1)",
                marginBottom: "1.5rem",
                letterSpacing: "-0.03em",
              }}
            >
              The Future of <span className="gradient-text">Tech</span>
              <br />
              Starts Here.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              style={{
                color: "var(--text-2)",
                fontSize: "clamp(1rem, 2vw, 1.15rem)",
                lineHeight: 1.7,
                marginBottom: "2.5rem",
                maxWidth: 520,
              }}
            >
              Discover premium gadgets curated for the modern professional.
              Engineered for performance, designed for life.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.3 }}
              style={{
                display: "flex",
                gap: "1rem",
                flexWrap: "wrap",
                alignItems: "center",
              }}
            >
              <Link
                to="/products"
                className="btn btn-primary btn-lg"
                style={{ gap: "0.6rem" }}
              >
                Explore Shop <FiArrowRight size={18} />
              </Link>
              <Link
                to="/products"
                style={{
                  color: "var(--text-2)",
                  fontFamily: "Syne, sans-serif",
                  fontWeight: 600,
                  fontSize: "0.9rem",
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "var(--accent)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "var(--text-2)";
                }}
              >
                View all products <FiArrowUpRight size={15} />
              </Link>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              style={{
                marginTop: "3rem",
                display: "flex",
                gap: "2rem",
                flexWrap: "wrap",
              }}
            >
              {[
                ["10K+", "Happy Customers"],
                ["500+", "Products"],
                ["4.9★", "Avg Rating"],
              ].map(([val, label]) => (
                <div key={label}>
                  <p
                    style={{
                      fontFamily: "Syne, sans-serif",
                      fontWeight: 800,
                      fontSize: "1.4rem",
                      color: "var(--text-1)",
                    }}
                  >
                    {val}
                  </p>
                  <p
                    style={{
                      fontSize: "0.78rem",
                      color: "var(--text-3)",
                      fontWeight: 500,
                    }}
                  >
                    {label}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Decorative floating card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            style={{
              position: "absolute",
              right: "clamp(2rem, 6vw, 6rem)",
              top: "50%",
              transform: "translateY(-50%)",
              background: "var(--surface-2)",
              border: "1px solid var(--border-hover)",
              borderRadius: "var(--r-xl)",
              padding: "2rem",
              width: 220,
              boxShadow: "var(--shadow-lg)",
              display: "none",
            }}
            className="hero-card"
          >
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 14,
                background:
                  "linear-gradient(135deg, var(--accent), var(--accent-2))",
                marginBottom: "1rem",
              }}
            />
            <p
              style={{
                fontFamily: "Syne, sans-serif",
                fontWeight: 700,
                fontSize: "0.9rem",
                color: "var(--text-1)",
                marginBottom: "0.3rem",
              }}
            >
              Premium Gadget
            </p>
            <p
              style={{
                fontFamily: "Syne, sans-serif",
                fontWeight: 800,
                fontSize: "1.25rem",
                color: "var(--accent)",
              }}
            >
              $299.00
            </p>
            <div
              style={{
                marginTop: "1rem",
                width: "100%",
                height: 36,
                borderRadius: 10,
                background: "var(--accent)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span
                style={{
                  color: "#fff",
                  fontSize: "0.8rem",
                  fontFamily: "Syne, sans-serif",
                  fontWeight: 700,
                }}
              >
                Add to Cart
              </span>
            </div>
          </motion.div>
        </div>

        <style>{`@media (min-width: 1024px) { .hero-card { display: block !important; } }`}</style>
      </section>

      {/* ── PERKS ───────────────────────────────────────────────── */}
      <section
        style={{ padding: "0 1.5rem 5rem", maxWidth: 1280, margin: "0 auto" }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "1rem",
          }}
        >
          {perks.map((perk, i) => (
            <motion.div
              key={perk.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i, duration: 0.4 }}
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: "var(--r-lg)",
                padding: "1.75rem",
                transition: "all 0.3s var(--ease)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--border-hover)";
                e.currentTarget.style.boxShadow = "var(--shadow-md)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--border)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <div
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: 12,
                  background: "var(--accent-glow)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--accent)",
                  fontSize: "1.1rem",
                  marginBottom: "1.1rem",
                }}
              >
                {perk.icon}
              </div>
              <h3
                style={{
                  fontFamily: "Syne, sans-serif",
                  fontWeight: 700,
                  fontSize: "0.95rem",
                  color: "var(--text-1)",
                  marginBottom: "0.4rem",
                }}
              >
                {perk.title}
              </h3>
              <p
                style={{
                  fontSize: "0.82rem",
                  color: "var(--text-2)",
                  lineHeight: 1.6,
                }}
              >
                {perk.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── FEATURED PRODUCTS ───────────────────────────────────── */}
      {featured.length > 0 && (
        <section
          style={{ padding: "0 1.5rem 6rem", maxWidth: 1280, margin: "0 auto" }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              marginBottom: "2.5rem",
              flexWrap: "wrap",
              gap: "1rem",
            }}
          >
            <div>
              <p className="label" style={{ marginBottom: "0.5rem" }}>
                Handpicked For You
              </p>
              <h2
                style={{
                  fontFamily: "Syne, sans-serif",
                  fontWeight: 800,
                  fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
                  color: "var(--text-1)",
                  lineHeight: 1.15,
                }}
              >
                Featured Products
              </h2>
            </div>
            <Link
              to="/products"
              className="btn btn-secondary"
              style={{ gap: "0.5rem" }}
            >
              View All <FiArrowRight size={15} />
            </Link>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {featured.map((product, i) => (
              <ProductCard key={product._id} product={product} index={i} />
            ))}
          </div>
        </section>
      )}

      {/* ── CTA BANNER ──────────────────────────────────────────── */}
      <section
        style={{ padding: "0 1.5rem 6rem", maxWidth: 1280, margin: "0 auto" }}
      >
        <div
          style={{
            background:
              "linear-gradient(135deg, var(--accent) 0%, var(--accent-2) 100%)",
            borderRadius: "var(--r-2xl)",
            padding: "clamp(2.5rem, 5vw, 4rem) clamp(2rem, 4vw, 4rem)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "2rem",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: -60,
              right: -60,
              width: 200,
              height: 200,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.08)",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: -40,
              left: "30%",
              width: 160,
              height: 160,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.05)",
            }}
          />

          <div style={{ position: "relative" }}>
            <h2
              style={{
                fontFamily: "Syne, sans-serif",
                fontWeight: 800,
                fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
                color: "#fff",
                lineHeight: 1.15,
                marginBottom: "0.75rem",
              }}
            >
              Ready to Upgrade
              <br />
              Your Tech?
            </h2>
            <p
              style={{
                color: "rgba(255,255,255,0.75)",
                maxWidth: 380,
                lineHeight: 1.6,
              }}
            >
              Join thousands of professionals who trust ShopHub for premium
              tech. Start exploring today.
            </p>
          </div>

          <Link
            to="/products"
            style={{
              position: "relative",
              background: "#fff",
              color: "var(--accent)",
              padding: "1rem 2rem",
              borderRadius: "var(--r-md)",
              textDecoration: "none",
              fontFamily: "Syne, sans-serif",
              fontWeight: 800,
              fontSize: "0.95rem",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
              transition: "all 0.25s var(--ease)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-3px)";
              e.currentTarget.style.boxShadow = "0 16px 40px rgba(0,0,0,0.25)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "none";
              e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.2)";
            }}
          >
            Shop Now <FiArrowRight size={17} />
          </Link>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
