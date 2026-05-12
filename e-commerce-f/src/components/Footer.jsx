import React from "react";
import { Link } from "react-router-dom";
import { FiInstagram, FiTwitter, FiGithub, FiMail } from "react-icons/fi";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        background: "var(--surface)",
        borderTop: "1px solid var(--border)",
        padding: "5rem 1.5rem 2.5rem",
      }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "3rem",
            marginBottom: "4rem",
          }}
        >
          {/* Brand */}
          <div style={{ gridColumn: "span 2" }}>
            <Link
              to="/"
              style={{
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.6rem",
                marginBottom: "1.25rem",
              }}
            >
              <div
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: 11,
                  background:
                    "linear-gradient(135deg, var(--accent), var(--accent-2))",
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
                  color: "var(--text-1)",
                }}
              >
                Shop<span style={{ color: "var(--accent)" }}>Hub</span>
              </span>
            </Link>
            <p
              style={{
                color: "var(--text-2)",
                fontSize: "0.9rem",
                lineHeight: 1.7,
                maxWidth: 280,
                marginBottom: "1.5rem",
              }}
            >
              Experience the future of tech shopping. Premium gadgets, curated
              for the modern professional.
            </p>
            <div style={{ display: "flex", gap: "0.75rem" }}>
              {[
                { icon: <FiTwitter size={16} />, href: "#" },
                { icon: <FiInstagram size={16} />, href: "#" },
                { icon: <FiGithub size={16} />, href: "#" },
                { icon: <FiMail size={16} />, href: "#" },
              ].map((item, i) => (
                <a
                  key={i}
                  href={item.href}
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 10,
                    background: "var(--surface-2)",
                    border: "1px solid var(--border)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--text-2)",
                    textDecoration: "none",
                    transition: "all 0.2s var(--ease)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "var(--accent-glow)";
                    e.currentTarget.style.color = "var(--accent)";
                    e.currentTarget.style.borderColor = "var(--border-hover)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "var(--surface-2)";
                    e.currentTarget.style.color = "var(--text-2)";
                    e.currentTarget.style.borderColor = "var(--border)";
                  }}
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Shop */}
          <div>
            <p className="label" style={{ marginBottom: "1.25rem" }}>
              Shop
            </p>
            <ul
              style={{
                listStyle: "none",
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
              }}
            >
              {[
                { to: "/products", label: "All Products" },
                { to: "/products", label: "New Arrivals" },
                { to: "/products", label: "Top Rated" },
                { to: "/products", label: "Sale Items" },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.to}
                    style={{
                      color: "var(--text-2)",
                      textDecoration: "none",
                      fontSize: "0.88rem",
                      fontWeight: 500,
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "var(--accent)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "var(--text-2)";
                    }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <p className="label" style={{ marginBottom: "1.25rem" }}>
              Support
            </p>
            <ul
              style={{
                listStyle: "none",
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
              }}
            >
              {[
                { to: "/orders", label: "Track Order" },
                { to: "/", label: "Shipping Policy" },
                { to: "/", label: "Returns & Refunds" },
                { to: "/", label: "Privacy Policy" },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.to}
                    style={{
                      color: "var(--text-2)",
                      textDecoration: "none",
                      fontSize: "0.88rem",
                      fontWeight: 500,
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "var(--accent)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "var(--text-2)";
                    }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            paddingTop: "2rem",
            borderTop: "1px solid var(--border)",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <p style={{ fontSize: "0.8rem", color: "var(--text-3)" }}>
            © {year} ShopHub Inc. All rights reserved.
          </p>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            {["Visa", "Mastercard", "PayPal"].map((card) => (
              <span
                key={card}
                style={{
                  padding: "0.25rem 0.625rem",
                  background: "var(--surface-2)",
                  border: "1px solid var(--border)",
                  borderRadius: 6,
                  fontSize: "0.72rem",
                  color: "var(--text-3)",
                  fontFamily: "Syne, sans-serif",
                  fontWeight: 600,
                }}
              >
                {card}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
