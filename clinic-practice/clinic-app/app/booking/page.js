// ============================================
// FILE: app/booking/page.js
// ============================================
// This is a CLIENT COMPONENT
// because it needs:
// → useState (form fields)
// → onChange (typing)
// → onClick (submit button)
//
// It sends data to our API route:
// POST /api/appointments
// ============================================

"use client";

import { useState } from "react";

export default function BookingPage() {
  // =============================================
  // FORM STATE
  // =============================================
  const [formData, setFormData] = useState({
    patientName: "",
    phone: "",
    service: "",
  });

  // loading state — true while request is happening
  const [isLoading, setIsLoading] = useState(false);

  // success state — true after successful booking
  const [isSuccess, setIsSuccess] = useState(false);

  // error state — shows if something goes wrong
  const [error, setError] = useState("");

  // =============================================
  // handleChange — one function for all inputs
  // =============================================
  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  // =============================================
  // handleSubmit
  // =============================================
  // sends form data to our API route
  // POST /api/appointments
  // =============================================
  async function handleSubmit(e) {
    // stop page refresh
    e.preventDefault();

    // show loading
    setIsLoading(true);
    setError("");

    try {
      // =========================================
      // fetch to OUR OWN API route
      // =========================================
      // "/api/appointments" = our route.js file
      // method: "POST" = runs POST() function
      // body: JSON.stringify(formData) = sends form data
      // =========================================
      const response = await fetch("/api/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      // read the response from our API
      const data = await response.json();

      if (response.ok) {
        // success — show success message
        setIsSuccess(true);
        // reset form
        setFormData({ patientName: "", phone: "", service: "" });
      } else {
        // API returned an error
        setError(data.error || "Something went wrong");
      }
    } catch (err) {
      setError("Could not connect to server. Try again.");
    }

    // hide loading
    setIsLoading(false);
  }

  // =============================================
  // SUCCESS SCREEN
  // =============================================
  if (isSuccess) {
    return (
      <div
        style={{
          padding: "40px",
          fontFamily: "sans-serif",
          textAlign: "center",
        }}
      >
        <div
          style={{
            width: "64px",
            height: "64px",
            borderRadius: "50%",
            backgroundColor: "#e1f5ee",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 16px",
            fontSize: "28px",
            color: "#0f6e56",
          }}
        >
          ✓
        </div>
        <h2 style={{ color: "#0f6e56", marginBottom: "8px" }}>
          Appointment Booked!
        </h2>
        <p style={{ color: "#555", marginBottom: "24px" }}>
          We will confirm via WhatsApp within 1 hour
        </p>
        <button
          onClick={() => setIsSuccess(false)}
          style={{
            backgroundColor: "#1a1a2e",
            color: "white",
            border: "none",
            borderRadius: "8px",
            padding: "12px 28px",
            fontSize: "14px",
            cursor: "pointer",
          }}
        >
          Book Another
        </button>
      </div>
    );
  }

  // =============================================
  // MAIN FORM
  // =============================================
  return (
    <div
      style={{
        padding: "40px",
        fontFamily: "sans-serif",
        maxWidth: "400px",
      }}
    >
      <h1 style={{ color: "#1a1a2e", marginBottom: "24px" }}>
        Book Appointment
      </h1>

      <form
        onSubmit={handleSubmit}
        style={{
          backgroundColor: "white",
          border: "1px solid #ddd",
          borderRadius: "8px",
          padding: "24px",
        }}
      >
        {/* PATIENT NAME */}
        <div style={{ marginBottom: "16px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "6px",
              fontSize: "14px",
              fontWeight: "500",
              color: "#333",
            }}
          >
            Patient Name
          </label>
          <input
            type="text"
            name="patientName"
            value={formData.patientName}
            onChange={handleChange}
            placeholder="Your full name"
            required
            style={{
              width: "100%",
              padding: "10px 14px",
              fontSize: "14px",
              border: "1px solid #ddd",
              borderRadius: "8px",
              boxSizing: "border-box",
              outline: "none",
            }}
          />
        </div>

        {/* PHONE */}
        <div style={{ marginBottom: "16px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "6px",
              fontSize: "14px",
              fontWeight: "500",
              color: "#333",
            }}
          >
            Phone Number
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="03XX-XXXXXXX"
            required
            style={{
              width: "100%",
              padding: "10px 14px",
              fontSize: "14px",
              border: "1px solid #ddd",
              borderRadius: "8px",
              boxSizing: "border-box",
              outline: "none",
            }}
          />
        </div>

        {/* SERVICE SELECT */}
        <div style={{ marginBottom: "24px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "6px",
              fontSize: "14px",
              fontWeight: "500",
              color: "#333",
            }}
          >
            Service
          </label>
          <select
            name="service"
            value={formData.service}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "10px 14px",
              fontSize: "14px",
              border: "1px solid #ddd",
              borderRadius: "8px",
              boxSizing: "border-box",
              outline: "none",
              backgroundColor: "white",
            }}
          >
            <option value="">Select a service</option>
            <option value="General Consultation">General Consultation</option>
            <option value="Diabetes Checkup">Diabetes Checkup</option>
            <option value="Blood Pressure">Blood Pressure</option>
            <option value="Home Visit">Home Visit</option>
          </select>
        </div>

        {/* ERROR MESSAGE */}
        {error && (
          <p
            style={{ color: "#a32d2d", fontSize: "13px", marginBottom: "12px" }}
          >
            {error}
          </p>
        )}

        {/* SUBMIT BUTTON */}
        <button
          type="submit"
          disabled={isLoading}
          style={{
            width: "100%",
            backgroundColor: "#1a1a2e",
            color: "white",
            border: "none",
            borderRadius: "8px",
            padding: "12px",
            fontSize: "15px",
            fontWeight: "500",
            cursor: "pointer",
            opacity: isLoading ? 0.7 : 1,
          }}
        >
          {isLoading ? "Booking..." : "Book Appointment"}
        </button>
      </form>
    </div>
  );
}
