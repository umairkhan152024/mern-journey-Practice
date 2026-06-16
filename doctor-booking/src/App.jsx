// ============================================
// EXAMPLE 5 — useState with an object
// CONCEPT: storing multiple values in one state
// ============================================
// object holds multiple related values together
// {} = empty object
//
// REAL USE CASE:
// form data — name, phone, doctor, date
// user profile — name, email, role
// doctor info — name, specialty, fee, city
//
// KEY RULE:
// when updating ONE field
// keep all other fields with spread operator
// {...formData, name: "new value"}
// ============================================

import { useState } from "react";

function App() {

  // =============================================
  // useState with object
  // =============================================
  // formData holds ALL form fields in ONE state
  // instead of separate useState for each field
  //
  // formData.name    → patient name
  // formData.phone   → phone number
  // formData.doctor  → selected doctor
  // =============================================
  const [formData, setFormData] = useState({
    name: "",      // empty at start
    phone: "",     // empty at start
    doctor: "",    // empty at start
  });

  // tracks if form was submitted
  const [isSubmitted, setIsSubmitted] = useState(false);


  // =============================================
  // handleChange — ONE function for ALL inputs
  // =============================================
  // e.target.name  → which field changed
  //                  matches name="" on input
  // e.target.value → what user typed
  //
  // ...formData    → keep ALL existing values
  // [e.target.name]: e.target.value
  //                → update ONLY changed field
  //
  // EXAMPLE:
  // user types "Umair" in name field
  // e.target.name  = "name"
  // e.target.value = "Umair"
  // result: { name: "Umair", phone: "", doctor: "" }
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
  // stops page refresh
  // sets isSubmitted to true
  // shows success screen
  // =============================================
  function handleSubmit(e) {
    e.preventDefault();
    setIsSubmitted(true);
  }


  // =============================================
  // handleReset
  // =============================================
  // clears all fields back to empty
  // sets isSubmitted back to false
  // shows form again
  // =============================================
  function handleReset() {
    setFormData({
      name: "",
      phone: "",
      doctor: "",
    });
    setIsSubmitted(false);
  }


  // SUCCESS SCREEN
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

        {/* green circle */}
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

        {/* show submitted data from formData state */}
        {/* formData still holds values after submit */}
        {/* because we never cleared it */}
        <p style={{ color: "#555", margin: "6px 0" }}>
          Name: {formData.name}
        </p>
        <p style={{ color: "#555", margin: "6px 0" }}>
          Phone: {formData.phone}
        </p>
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
          }}
        >
          Book Another
        </button>

      </div>
    );
  }


  // MAIN FORM
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

        {/* NAME INPUT */}
        {/* name="name" → matches formData.name key */}
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
            placeholder="Enter your name"
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


        {/* PHONE INPUT */}
        {/* name="phone" → matches formData.phone key */}
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


        {/* DOCTOR SELECT */}
        {/* name="doctor" → matches formData.doctor key */}
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
            <option value="">-- Select a doctor --</option>
            <option value="Dr. Ahmed Khan">Dr. Ahmed Khan</option>
            <option value="Dr. Sara Malik">Dr. Sara Malik</option>
            <option value="Dr. Bilal Akhtar">Dr. Bilal Akhtar</option>
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