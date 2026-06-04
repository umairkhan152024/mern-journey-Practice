// ============================================
// FILE: src/App.jsx
// PIECE 6 OF 6 — Complete form with dropdown
// ============================================
// GOAL: add one more field — select dropdown
// for choosing a doctor
//
// NEW THING: select element
// works EXACTLY like input
// same name, value, onChange pattern
// only difference is it shows a dropdown
// instead of a text box
// ============================================

import { useState } from "react";

function App() {
  // formData now has THREE fields
  // name, phone — same as before
  // doctor — NEW field for selected doctor
  const [formData, setFormData] = useState({
    name: "", // patient name
    phone: "", // phone number
    doctor: "", // selected doctor — empty at start
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  // handleChange is exactly the same
  // it works for ALL inputs including select
  // because select also has name and value
  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setIsSubmitted(true);
  }

  function handleReset() {
    setFormData({
      name: "",
      phone: "",
      doctor: "", // reset doctor back to empty
    });
    setIsSubmitted(false);
  }

  // success screen
  if (isSubmitted) {
    return (
      <div
        style={{
          maxWidth: "400px",
          margin: "40px auto",
          fontFamily: "sans-serif",
          padding: "0 16px",
          textAlign: "center",
        }}
      >
        {/* Green checkmark */}
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

        <h2 style={{ color: "#0f6e56", marginBottom: "16px" }}>
          Appointment Booked!
        </h2>

        {/* show all three submitted values */}
        <p style={{ color: "#555", margin: "6px 0" }}>Name: {formData.name}</p>
        <p style={{ color: "#555", margin: "6px 0" }}>
          Phone: {formData.phone}
        </p>

        {/* formData.doctor shows selected doctor name */}
        <p style={{ color: "#555", margin: "6px 0" }}>
          Doctor: {formData.doctor}
        </p>

        <button
          onClick={handleReset}
          style={{
            marginTop: "24px",
            backgroundColor: "#1a1a2e",
            color: "white",
            border: "none",
            borderRadius: "8px",
            padding: "12px 28px",
            fontSize: "14px",
            cursor: "pointer",
            fontWeight: "500",
          }}
        >
          Book Another Appointment
        </button>
      </div>
    );
  }

  // main form
  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "40px auto",
        fontFamily: "sans-serif",
        padding: "0 16px",
      }}
    >
      <h1 style={{ color: "#1a1a2e", marginBottom: "24px" }}>
        Book an Appointment
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
        {/* INPUT 1 — name */}
        {/* no change from before */}
        <div style={{ marginBottom: "14px" }}>
          <label
            htmlFor="name"
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
            id="name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your full name"
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

        {/* INPUT 2 — phone */}
        {/* no change from before */}
        <div style={{ marginBottom: "14px" }}>
          <label
            htmlFor="phone"
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
            id="phone"
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

        {/* =============================================
            SELECT — doctor dropdown
            =============================================
            select works EXACTLY like input
            same pattern:
              name="doctor"         → field identifier
              value={formData.doctor} → controlled by state
              onChange={handleChange} → updates state
              required              → cannot submit empty
            
            inside select we put option elements
            each option has a value
            when user selects one:
              e.target.value = that option's value
              formData.doctor updates to that value
            ============================================= */}
        <div style={{ marginBottom: "24px" }}>
          <label
            htmlFor="doctor"
            style={{
              display: "block",
              marginBottom: "6px",
              fontSize: "14px",
              fontWeight: "500",
              color: "#333",
            }}
          >
            Select Doctor
          </label>

          <select
            id="doctor"
            name="doctor"
            value={formData.doctor}
            onChange={handleChange}
            required
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
            {/* default option — value is empty string */}
            {/* required means this cannot be selected on submit */}
            <option value="">-- Select a doctor --</option>

            {/* each option value is the doctor name */}
            {/* when selected formData.doctor = this value */}
            <option value="Dr. Ahmed Khan">
              Dr. Ahmed Khan — Cardiologist
            </option>
            <option value="Dr. Sara Malik">Dr. Sara Malik — Dentist</option>
            <option value="Dr. Bilal Akhtar">
              Dr. Bilal Akhtar — Skin Specialist
            </option>
            <option value="Dr. Fatima Noor">
              Dr. Fatima Noor — Gynecologist
            </option>
            <option value="Dr. Usman Ali">Dr. Usman Ali — Neurologist</option>
          </select>
        </div>

        {/* SUBMIT BUTTON */}
        <button
          type="submit"
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
          }}
        >
          Book Appointment
        </button>
      </form>
    </div>
  );
}

export default App;
