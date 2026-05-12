import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard.jsx";
import { API_URL } from "../utils/api.js";
import { motion } from "framer-motion";
import { FiSearch, FiSliders, FiX } from "react-icons/fi";

function ProductListPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/api/products`);
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const categories = [
    "All",
    ...new Set(products.map((p) => p.category).filter(Boolean)),
  ];

  const filtered = products.filter((p) => {
    const matchSearch =
      !search ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.brand?.toLowerCase().includes(search.toLowerCase());
    const matchCat =
      selectedCategory === "All" || p.category === selectedCategory;
    return matchSearch && matchCat;
  });

  return (
    <div style={{ maxWidth: 1280, margin: "0 auto", padding: "3rem 1.5rem" }}>
      {/* Header */}
      <div style={{ marginBottom: "3rem" }}>
        <p className="label" style={{ marginBottom: "0.75rem" }}>
          Premium Collection
        </p>
        <h1
          style={{
            fontFamily: "Syne, sans-serif",
            fontWeight: 800,
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            color: "var(--text-1)",
            lineHeight: 1.1,
            marginBottom: "1rem",
          }}
        >
          All Products
        </h1>
        <p style={{ color: "var(--text-2)", maxWidth: 500 }}>
          Browse our latest premium tech collection, curated for the modern
          professional.
        </p>
      </div>

      {/* Filters bar */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "1rem",
          marginBottom: "2.5rem",
          alignItems: "center",
        }}
      >
        {/* Search */}
        <div style={{ position: "relative", flex: "1 1 260px", maxWidth: 400 }}>
          <FiSearch
            size={16}
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
            style={{
              paddingLeft: "2.75rem",
              paddingRight: search ? "2.5rem" : "1rem",
            }}
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              style={{
                position: "absolute",
                right: "0.875rem",
                top: "50%",
                transform: "translateY(-50%)",
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "var(--text-3)",
                display: "flex",
              }}
            >
              <FiX size={14} />
            </button>
          )}
        </div>

        {/* Category filters */}
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                padding: "0.5rem 1rem",
                borderRadius: 99,
                border: "1px solid",
                fontFamily: "Syne, sans-serif",
                fontWeight: 600,
                fontSize: "0.8rem",
                cursor: "pointer",
                transition: "all 0.2s var(--ease)",
                background:
                  selectedCategory === cat ? "var(--accent)" : "var(--surface)",
                borderColor:
                  selectedCategory === cat ? "var(--accent)" : "var(--border)",
                color: selectedCategory === cat ? "#fff" : "var(--text-2)",
                boxShadow:
                  selectedCategory === cat
                    ? "0 4px 16px var(--accent-glow)"
                    : "none",
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Count */}
        {!loading && (
          <p
            style={{
              color: "var(--text-3)",
              fontSize: "0.85rem",
              marginLeft: "auto",
            }}
          >
            {filtered.length} product{filtered.length !== 1 ? "s" : ""}
          </p>
        )}
      </div>

      {/* Grid */}
      {loading ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
            <div key={n} className="skeleton" style={{ aspectRatio: "0.8" }} />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div style={{ padding: "5rem 2rem", textAlign: "center" }}>
          <p style={{ fontSize: "3rem", marginBottom: "1rem" }}>🔍</p>
          <h3
            style={{
              fontFamily: "Syne, sans-serif",
              fontWeight: 700,
              color: "var(--text-1)",
              marginBottom: "0.5rem",
            }}
          >
            No products found
          </h3>
          <p style={{ color: "var(--text-2)" }}>
            Try adjusting your search or filters.
          </p>
          <button
            onClick={() => {
              setSearch("");
              setSelectedCategory("All");
            }}
            className="btn btn-secondary"
            style={{ marginTop: "1.5rem" }}
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {filtered.map((product, i) => (
            <ProductCard key={product._id} product={product} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductListPage;
