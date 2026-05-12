import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../utils/api";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiPlus,
  FiX,
  FiMail,
  FiDollarSign,
  FiTrash2,
  FiUser,
  FiSend,
  FiSearch,
} from "react-icons/fi";

function AdminEmployees() {
  const [employees, setEmployees] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const token = localStorage.getItem("jwtToken");

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/admin/employees`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEmployees(res.data);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const addEmployee = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await axios.post(
        `${API_URL}/api/admin/employees`,
        { name, email },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      setName("");
      setEmail("");
      setShowForm(false);
      fetchEmployees();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to add employee");
    } finally {
      setSaving(false);
    }
  };

  const deleteEmployee = async (id) => {
    if (!window.confirm("Remove this employee?")) return;
    try {
      await axios.delete(`${API_URL}/api/admin/employees/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchEmployees();
    } catch (e) {
      console.log(e);
    }
  };

  const sendInvite = async (name, email) => {
    try {
      await axios.post(
        `${API_URL}/api/admin/employees/invite`,
        { name, email },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      alert("Invitation sent successfully!");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to send invite");
    }
  };

  const paySalary = async (id) => {
    const amount = prompt("Enter salary amount to pay:");
    if (!amount || isNaN(amount)) return;
    try {
      await axios.put(
        `${API_URL}/api/admin/employees/${id}/pay-salary`,
        { amount },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      alert("Salary paid successfully!");
      fetchEmployees();
    } catch (e) {
      console.log(e);
    }
  };

  const filtered = employees.filter(
    (emp) =>
      !search ||
      emp.name?.toLowerCase().includes(search.toLowerCase()) ||
      emp.email?.toLowerCase().includes(search.toLowerCase()),
  );

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
            Manage Employees
          </h1>
        </div>
        <button
          onClick={() => setShowForm((v) => !v)}
          className="btn btn-primary"
          style={{ gap: "0.5rem" }}
        >
          {showForm ? (
            <>
              <FiX size={15} /> Close
            </>
          ) : (
            <>
              <FiPlus size={15} /> Add Employee
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
            transition={{ duration: 0.3 }}
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
                  marginBottom: "1.5rem",
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
                  <FiUser size={15} style={{ color: "var(--accent)" }} />
                </div>
                <h2
                  style={{
                    fontFamily: "Syne, sans-serif",
                    fontWeight: 700,
                    color: "var(--text-1)",
                  }}
                >
                  New Employee
                </h2>
              </div>

              <form onSubmit={addEmployee}>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "1rem",
                    marginBottom: "1.25rem",
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
                      Full Name
                    </label>
                    <div style={{ position: "relative" }}>
                      <FiUser
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
                        placeholder="Jane Smith"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
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
                      Email Address
                    </label>
                    <div style={{ position: "relative" }}>
                      <FiMail
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
                        type="email"
                        placeholder="jane@company.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>
                <div style={{ display: "flex", gap: "0.875rem" }}>
                  <button
                    type="submit"
                    disabled={saving}
                    className="btn btn-primary"
                    style={{ gap: "0.5rem", opacity: saving ? 0.7 : 1 }}
                  >
                    {saving ? (
                      <div
                        style={{
                          width: 14,
                          height: 14,
                          border: "2px solid rgba(255,255,255,0.3)",
                          borderTopColor: "#fff",
                          borderRadius: "50%",
                          animation: "spin-slow 0.7s linear infinite",
                        }}
                      />
                    ) : (
                      <FiPlus size={14} />
                    )}
                    {saving ? "Adding…" : "Add Employee"}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowForm(false);
                      setName("");
                      setEmail("");
                    }}
                    className="btn btn-secondary"
                  >
                    Cancel
                  </button>
                </div>
              </form>
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
          placeholder="Search employees…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Employees Grid */}
      {loading ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "1rem",
          }}
        >
          {[1, 2, 3, 4].map((n) => (
            <div
              key={n}
              className="skeleton"
              style={{ height: 160, borderRadius: "var(--r-lg)" }}
            />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div style={{ textAlign: "center", padding: "5rem 2rem" }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 22,
              background: "var(--surface-2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 1.25rem",
            }}
          >
            <FiUser size={28} style={{ color: "var(--text-3)" }} />
          </div>
          <p
            style={{
              fontFamily: "Syne, sans-serif",
              fontWeight: 600,
              color: "var(--text-2)",
            }}
          >
            No employees found
          </p>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(290px, 1fr))",
            gap: "1.25rem",
          }}
        >
          {filtered.map((emp, i) => (
            <motion.div
              key={emp._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: "var(--r-lg)",
                padding: "1.5rem",
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
              {/* Top row */}
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "1rem",
                  marginBottom: "1.25rem",
                }}
              >
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 14,
                    background:
                      "linear-gradient(135deg, var(--accent), var(--accent-2))",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <span
                    style={{
                      color: "#fff",
                      fontFamily: "Syne, sans-serif",
                      fontWeight: 800,
                      fontSize: "1.1rem",
                    }}
                  >
                    {emp.name?.[0]?.toUpperCase() || "E"}
                  </span>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <h3
                    style={{
                      fontFamily: "Syne, sans-serif",
                      fontWeight: 700,
                      fontSize: "0.95rem",
                      color: "var(--text-1)",
                      marginBottom: "0.15rem",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {emp.name}
                  </h3>
                  <p
                    style={{
                      fontSize: "0.78rem",
                      color: "var(--text-3)",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {emp.email}
                  </p>
                </div>
                {/* Status */}
                <span
                  style={{
                    fontSize: "0.68rem",
                    fontFamily: "Syne, sans-serif",
                    fontWeight: 700,
                    padding: "0.2rem 0.6rem",
                    borderRadius: 99,
                    flexShrink: 0,
                    color:
                      emp.inviteStatus === "Active"
                        ? "var(--success)"
                        : "var(--warning)",
                    background:
                      emp.inviteStatus === "Active"
                        ? "rgba(5,150,105,0.1)"
                        : "rgba(217,119,6,0.1)",
                  }}
                >
                  {emp.inviteStatus || "Pending"}
                </span>
              </div>

              {/* Salary */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.6rem 0.875rem",
                  background: "var(--surface-2)",
                  borderRadius: "var(--r-sm)",
                  marginBottom: "1.1rem",
                  border: "1px solid var(--border)",
                }}
              >
                <FiDollarSign size={13} style={{ color: "var(--success)" }} />
                <span style={{ fontSize: "0.82rem", color: "var(--text-2)" }}>
                  Salary:
                </span>
                <span
                  style={{
                    fontFamily: "Syne, sans-serif",
                    fontWeight: 700,
                    fontSize: "0.88rem",
                    color: "var(--text-1)",
                  }}
                >
                  ${emp.salary || 0}
                </span>
              </div>

              {/* Actions */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr",
                  gap: "0.5rem",
                }}
              >
                <button
                  onClick={() => sendInvite(emp.name, emp.email)}
                  style={{
                    padding: "0.5rem",
                    borderRadius: "var(--r-xs)",
                    background: "var(--accent-glow)",
                    color: "var(--accent)",
                    border: "none",
                    cursor: "pointer",
                    fontFamily: "Syne, sans-serif",
                    fontWeight: 600,
                    fontSize: "0.72rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.3rem",
                    transition: "all 0.15s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "var(--accent)";
                    e.currentTarget.style.color = "#fff";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "var(--accent-glow)";
                    e.currentTarget.style.color = "var(--accent)";
                  }}
                  title="Send invite email"
                >
                  <FiSend size={11} /> Invite
                </button>
                <button
                  onClick={() => paySalary(emp._id)}
                  style={{
                    padding: "0.5rem",
                    borderRadius: "var(--r-xs)",
                    background: "rgba(5,150,105,0.1)",
                    color: "var(--success)",
                    border: "none",
                    cursor: "pointer",
                    fontFamily: "Syne, sans-serif",
                    fontWeight: 600,
                    fontSize: "0.72rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.3rem",
                    transition: "all 0.15s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "var(--success)";
                    e.currentTarget.style.color = "#fff";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(5,150,105,0.1)";
                    e.currentTarget.style.color = "var(--success)";
                  }}
                  title="Pay salary"
                >
                  <FiDollarSign size={11} /> Pay
                </button>
                <button
                  onClick={() => deleteEmployee(emp._id)}
                  style={{
                    padding: "0.5rem",
                    borderRadius: "var(--r-xs)",
                    background: "rgba(220,38,38,0.08)",
                    color: "var(--danger)",
                    border: "none",
                    cursor: "pointer",
                    fontFamily: "Syne, sans-serif",
                    fontWeight: 600,
                    fontSize: "0.72rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.3rem",
                    transition: "all 0.15s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "var(--danger)";
                    e.currentTarget.style.color = "#fff";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(220,38,38,0.08)";
                    e.currentTarget.style.color = "var(--danger)";
                  }}
                  title="Remove employee"
                >
                  <FiTrash2 size={11} /> Remove
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminEmployees;
