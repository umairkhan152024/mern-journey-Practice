// ============================================
// FILE: app/admin/page.js
// ============================================
// Admin dashboard — shows all appointments
//
// "use client" because we need:
// → useState (password check, appointments)
// → useEffect (fetch appointments on load)
//
// In a real app this would have
// proper authentication
// ============================================

"use client";

import { useState, useEffect } from "react";

export default function AdminPage() {
  // simple password protection
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // appointments from API
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // =============================================
  // fetch appointments from our API
  // =============================================
  // GET /api/appointments
  // returns all appointments from MongoDB
  // =============================================
  useEffect(() => {
    // only fetch if logged in
    if (!isLoggedIn) return;

    async function fetchAppointments() {
      setIsLoading(true);
      try {
        const response = await fetch("/api/appointments");
        const data = await response.json();
        setAppointments(data);
      } catch (err) {
        console.log("Error fetching appointments:", err);
      }
      setIsLoading(false);
    }

    fetchAppointments();
  }, [isLoggedIn]);
  // runs when isLoggedIn changes
  // when user logs in → fetch starts

  // =============================================
  // handleLogin — simple password check
  // =============================================
  function handleLogin(e) {
    e.preventDefault();

    // simple hardcoded password for now
    // in real app → check against database
    if (password === "admin123") {
      setIsLoggedIn(true);
      setError("");
    } else {
      setError("Wrong password");
    }
  }

  // =============================================
  // LOGIN SCREEN
  // =============================================
  if (!isLoggedIn) {
    return (
      <div
        style={{
          padding: "40px",
          fontFamily: "sans-serif",
          maxWidth: "300px",
          margin: "0 auto",
        }}
      >
        <h1 style={{ color: "#1a1a2e", marginBottom: "24px" }}>Admin Login</h1>

        <form onSubmit={handleLogin}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            required
            style={{
              width: "100%",
              padding: "10px 14px",
              fontSize: "14px",
              border: "1px solid #ddd",
              borderRadius: "8px",
              marginBottom: "12px",
              boxSizing: "border-box",
              outline: "none",
            }}
          />

          {error && (
            <p
              style={{
                color: "#a32d2d",
                fontSize: "13px",
                marginBottom: "8px",
              }}
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            style={{
              width: "100%",
              backgroundColor: "#1a1a2e",
              color: "white",
              border: "none",
              borderRadius: "8px",
              padding: "12px",
              fontSize: "14px",
              cursor: "pointer",
            }}
          >
            Login
          </button>
        </form>

        <p style={{ color: "#888", fontSize: "12px", marginTop: "8px" }}>
          Hint: admin123
        </p>
      </div>
    );
  }

  // =============================================
  // DASHBOARD — shows after login
  // =============================================
  return (
    <div style={{ padding: "40px", fontFamily: "sans-serif" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "24px",
        }}
      >
        <h1 style={{ color: "#1a1a2e", margin: 0 }}>Admin Dashboard</h1>

        <button
          onClick={() => setIsLoggedIn(false)}
          style={{
            backgroundColor: "white",
            color: "#1a1a2e",
            border: "1px solid #ddd",
            borderRadius: "8px",
            padding: "8px 16px",
            fontSize: "13px",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>

      {/* LOADING */}
      {isLoading && <p style={{ color: "#888" }}>Loading appointments...</p>}

      {/* NO APPOINTMENTS */}
      {!isLoading && appointments.length === 0 && (
        <p style={{ color: "#888" }}>No appointments yet.</p>
      )}

      {/* APPOINTMENTS LIST */}
      {!isLoading && appointments.length > 0 && (
        <div>
          <p style={{ color: "#888", fontSize: "14px", marginBottom: "16px" }}>
            Total: {appointments.length} appointments
          </p>

          {appointments.map((apt) => (
            <div
              key={apt._id}
              style={{
                backgroundColor: "white",
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "16px",
                marginBottom: "12px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                {/* patient name */}
                <h3
                  style={{
                    margin: "0 0 4px",
                    color: "#1a1a2e",
                    fontSize: "15px",
                  }}
                >
                  {apt.patientName}
                </h3>

                {/* phone */}
                <p style={{ margin: "2px 0", color: "#555", fontSize: "13px" }}>
                  Phone: {apt.phone}
                </p>

                {/* service */}
                <p style={{ margin: "2px 0", color: "#555", fontSize: "13px" }}>
                  Service: {apt.service || "Not specified"}
                </p>

                {/* date */}
                <p style={{ margin: "2px 0", color: "#888", fontSize: "12px" }}>
                  {new Date(apt.createdAt).toLocaleString()}
                </p>
              </div>

              {/* status badge */}
              <span
                style={{
                  backgroundColor: "#e1f5ee",
                  color: "#0f6e56",
                  padding: "4px 12px",
                  borderRadius: "20px",
                  fontSize: "12px",
                  fontWeight: "500",
                }}
              >
                {apt.status}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
