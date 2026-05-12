import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../utils/api";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiX,
  FiSave,
  FiPackage,
  FiSearch,
} from "react-icons/fi";

const emptyForm = {
  name: "",
  description: "",
  price: "",
  stock: "",
  category: "",
  brand: "",
  imageUrl: "",
};

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");
  const token = localStorage.getItem("jwtToken");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/products`);
      setProducts(res.data);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const saveProduct = async () => {
    try {
      const payload = {
        name: form.name,
        description: form.description,
        price: form.price,
        countInStock: form.stock,
        category: form.category,
        brand: form.brand,
        imageUrl: form.imageUrl,
      };
      if (editingId) {
        await axios.put(`${API_URL}/api/products/${editingId}`, payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await axios.post(`${API_URL}/api/products`, payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      fetchProducts();
      setForm(emptyForm);
      setEditingId(null);
      setShowForm(false);
    } catch (e) {
      alert("Failed to save product");
    }
  };

  const editProduct = (p) => {
    setForm({
      name: p.name,
      description: p.description,
      price: p.price,
      stock: p.countInStock,
      category: p.category,
      brand: p.brand,
      imageUrl: p.imageUrl,
    });
    setEditingId(p._id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const deleteProduct = async (id) => {
    if (!window.confirm("Delete this product? This cannot be undone.")) return;
    try {
      await axios.delete(`${API_URL}/api/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchProducts();
    } catch (e) {
      console.log(e);
    }
  };

  const filtered = products.filter(
    (p) =>
      !search ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category?.toLowerCase().includes(search.toLowerCase()) ||
      p.brand?.toLowerCase().includes(search.toLowerCase()),
  );

  const fields = [
    {
      key: "name",
      label: "Product Name",
      placeholder: "e.g. AirPods Pro",
      span: 2,
    },
    { key: "price", label: "Price ($)", placeholder: "e.g. 249.99" },
    { key: "stock", label: "Stock Qty", placeholder: "e.g. 50" },
    { key: "category", label: "Category", placeholder: "e.g. Audio" },
    { key: "brand", label: "Brand", placeholder: "e.g. Apple" },
    {
      key: "imageUrl",
      label: "Image URL",
      placeholder: "https://...",
      span: 2,
    },
    {
      key: "description",
      label: "Description",
      placeholder: "Product description…",
      span: 2,
      textarea: true,
    },
  ];

  return (
    <div
      style={{ maxWidth: 1280, margin: "0 auto", padding: "3rem 1.5rem 5rem" }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          flexWrap: "wrap",
          gap: "1rem",
          marginBottom: "2.5rem",
        }}
      >
        <div>
          <p className="label" style={{ marginBottom: "0.5rem" }}>
            Admin
          </p>
          <h1
            style={{
              fontFamily: "Syne, sans-serif",
              fontWeight: 800,
              fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
              color: "var(--text-1)",
            }}
          >
            Manage Products
          </h1>
        </div>
        <button
          onClick={() => {
            setForm(emptyForm);
            setEditingId(null);
            setShowForm((v) => !v);
          }}
          className="btn btn-primary"
          style={{ gap: "0.5rem" }}
        >
          {showForm ? (
            <>
              <FiX size={15} /> Close Form
            </>
          ) : (
            <>
              <FiPlus size={15} /> Add Product
            </>
          )}
        </button>
      </div>

      {/* Form */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35 }}
            style={{ overflow: "hidden", marginBottom: "2rem" }}
          >
            <div
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border-hover)",
                borderRadius: "var(--r-lg)",
                padding: "2rem",
                boxShadow: "var(--shadow-md)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  marginBottom: "1.75rem",
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
                  {editingId ? (
                    <FiEdit2 size={15} style={{ color: "var(--accent)" }} />
                  ) : (
                    <FiPlus size={15} style={{ color: "var(--accent)" }} />
                  )}
                </div>
                <h2
                  style={{
                    fontFamily: "Syne, sans-serif",
                    fontWeight: 700,
                    color: "var(--text-1)",
                  }}
                >
                  {editingId ? "Edit Product" : "New Product"}
                </h2>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "1rem",
                }}
              >
                {fields.map((f) => (
                  <div
                    key={f.key}
                    style={{ gridColumn: f.span === 2 ? "1 / -1" : "auto" }}
                  >
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
                      {f.label}
                    </label>
                    {f.textarea ? (
                      <textarea
                        className="input"
                        style={{ minHeight: 90, resize: "vertical" }}
                        placeholder={f.placeholder}
                        value={form[f.key]}
                        onChange={(e) =>
                          setForm({ ...form, [f.key]: e.target.value })
                        }
                      />
                    ) : (
                      <input
                        className="input"
                        type={
                          f.key === "price" || f.key === "stock"
                            ? "number"
                            : "text"
                        }
                        placeholder={f.placeholder}
                        value={form[f.key]}
                        onChange={(e) =>
                          setForm({ ...form, [f.key]: e.target.value })
                        }
                      />
                    )}
                  </div>
                ))}
              </div>

              <div
                style={{
                  display: "flex",
                  gap: "0.875rem",
                  marginTop: "1.5rem",
                }}
              >
                <button
                  onClick={saveProduct}
                  className="btn btn-primary"
                  style={{ gap: "0.5rem" }}
                >
                  <FiSave size={14} />{" "}
                  {editingId ? "Update Product" : "Create Product"}
                </button>
                <button
                  onClick={() => {
                    setShowForm(false);
                    setForm(emptyForm);
                    setEditingId(null);
                  }}
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search */}
      <div
        style={{ position: "relative", maxWidth: 360, marginBottom: "1.5rem" }}
      >
        <FiSearch
          size={14}
          style={{
            position: "absolute",
            left: "0.9rem",
            top: "50%",
            transform: "translateY(-50%)",
            color: "var(--text-3)",
          }}
        />
        <input
          className="input"
          style={{ paddingLeft: "2.5rem" }}
          placeholder="Search products…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Products Table */}
      {loading ? (
        <div
          style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}
        >
          {[1, 2, 3, 4].map((n) => (
            <div
              key={n}
              className="skeleton"
              style={{ height: 72, borderRadius: "var(--r-md)" }}
            />
          ))}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: "var(--r-lg)",
            overflow: "hidden",
          }}
        >
          <div className="table-wrap">
            <table className="table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Category</th>
                  <th>Brand</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      style={{
                        textAlign: "center",
                        padding: "3rem",
                        color: "var(--text-3)",
                      }}
                    >
                      No products found
                    </td>
                  </tr>
                ) : (
                  filtered.map((p, i) => (
                    <motion.tr
                      key={p._id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.04 }}
                    >
                      <td>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.875rem",
                          }}
                        >
                          <div
                            style={{
                              width: 48,
                              height: 48,
                              borderRadius: 12,
                              overflow: "hidden",
                              background: "var(--surface-2)",
                              border: "1px solid var(--border)",
                              flexShrink: 0,
                            }}
                          >
                            {p.imageUrl ? (
                              <img
                                src={p.imageUrl}
                                alt={p.name}
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  objectFit: "cover",
                                }}
                              />
                            ) : (
                              <div
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                }}
                              >
                                <FiPackage
                                  size={18}
                                  style={{ color: "var(--text-3)" }}
                                />
                              </div>
                            )}
                          </div>
                          <div>
                            <p
                              style={{
                                fontFamily: "Syne, sans-serif",
                                fontWeight: 700,
                                fontSize: "0.875rem",
                                color: "var(--text-1)",
                              }}
                            >
                              {p.name}
                            </p>
                            <p
                              style={{
                                fontSize: "0.75rem",
                                color: "var(--text-3)",
                                marginTop: "0.1rem",
                                maxWidth: 200,
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                              }}
                            >
                              {p.description}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span
                          style={{
                            fontSize: "0.8rem",
                            background: "var(--surface-2)",
                            padding: "0.2rem 0.6rem",
                            borderRadius: 6,
                            color: "var(--text-2)",
                            border: "1px solid var(--border)",
                          }}
                        >
                          {p.category || "—"}
                        </span>
                      </td>
                      <td
                        style={{ color: "var(--text-2)", fontSize: "0.875rem" }}
                      >
                        {p.brand || "—"}
                      </td>
                      <td>
                        <span
                          style={{
                            fontFamily: "Syne, sans-serif",
                            fontWeight: 800,
                            color: "var(--text-1)",
                          }}
                        >
                          ${p.price}
                        </span>
                      </td>
                      <td>
                        <span
                          style={{
                            fontSize: "0.82rem",
                            fontFamily: "Syne, sans-serif",
                            fontWeight: 600,
                            color:
                              p.countInStock > 10
                                ? "var(--success)"
                                : p.countInStock > 0
                                  ? "var(--warning)"
                                  : "var(--danger)",
                            background:
                              p.countInStock > 10
                                ? "rgba(5,150,105,0.1)"
                                : p.countInStock > 0
                                  ? "rgba(217,119,6,0.1)"
                                  : "rgba(220,38,38,0.1)",
                            padding: "0.2rem 0.6rem",
                            borderRadius: 6,
                          }}
                        >
                          {p.countInStock > 0
                            ? `${p.countInStock} left`
                            : "Out of stock"}
                        </span>
                      </td>
                      <td>
                        <div style={{ display: "flex", gap: "0.5rem" }}>
                          <button
                            onClick={() => editProduct(p)}
                            style={{
                              width: 32,
                              height: 32,
                              borderRadius: 9,
                              background: "var(--surface-2)",
                              border: "1px solid var(--border)",
                              cursor: "pointer",
                              color: "var(--text-2)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              transition: "all 0.15s",
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background =
                                "var(--accent-glow)";
                              e.currentTarget.style.color = "var(--accent)";
                              e.currentTarget.style.borderColor =
                                "var(--border-hover)";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background =
                                "var(--surface-2)";
                              e.currentTarget.style.color = "var(--text-2)";
                              e.currentTarget.style.borderColor =
                                "var(--border)";
                            }}
                          >
                            <FiEdit2 size={13} />
                          </button>
                          <button
                            onClick={() => deleteProduct(p._id)}
                            style={{
                              width: 32,
                              height: 32,
                              borderRadius: 9,
                              background: "var(--surface-2)",
                              border: "1px solid var(--border)",
                              cursor: "pointer",
                              color: "var(--text-2)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              transition: "all 0.15s",
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background =
                                "rgba(220,38,38,0.1)";
                              e.currentTarget.style.color = "var(--danger)";
                              e.currentTarget.style.borderColor =
                                "rgba(220,38,38,0.2)";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background =
                                "var(--surface-2)";
                              e.currentTarget.style.color = "var(--text-2)";
                              e.currentTarget.style.borderColor =
                                "var(--border)";
                            }}
                          >
                            <FiTrash2 size={13} />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          {filtered.length > 0 && (
            <div
              style={{
                padding: "0.875rem 1.5rem",
                borderTop: "1px solid var(--border)",
              }}
            >
              <p style={{ fontSize: "0.8rem", color: "var(--text-3)" }}>
                {filtered.length} product{filtered.length !== 1 ? "s" : ""}
              </p>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}

export default AdminProducts;
