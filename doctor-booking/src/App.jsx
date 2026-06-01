// ============================================
// FILE: src/App.jsx
// NEW CONCEPT: Forms
// ============================================
// A form in React works like this:
//
// User types in input
//   → onChange fires
//     → setState updates
//       → React re-renders
//         → input shows new value
//
// User clicks submit
//   → onSubmit fires
//     → e.preventDefault() stops page refresh
//       → we read data from state
//         → we show success message
// ============================================

// import useState — we need it for form data
import { useState } from "react";

// ============================================
// COMPONENT: BookingForm
// ============================================
// This component has its own state
// It manages all the form fields
// and the submission process
// ============================================

function BookingForm() {
  // =============================================
  // STATE 1 — formData object
  // =============================================
  // We store ALL form fields in ONE state object
  // This is the standard pattern for forms
  //
  // Instead of:
  //   const [name, setName] = useState("")
  //   const [phone, setPhone] = useState("")
  //   const [doctor, setDoctor] = useState("")
  //
  // We do ONE state object with all fields:
  //   formData.name   → patient name field
  //   formData.phone  → phone number field
  //   formData.doctor → selected doctor field
  //
  // All fields start as empty string ""
  // =============================================
  const [formData, setFormData] = useState({
    name: "", // patient name — empty at start
    phone: "", // phone number — empty at start
    doctor: "", // selected doctor — empty at start
  });

  // =============================================
  // STATE 2 — isSubmitted boolean
  // =============================================
  // false → show the form
  // true  → show the success message
  // starts as false because form shows first
  // =============================================
  const [isSubmitted, setIsSubmitted] = useState(false);

  // =============================================
  // FUNCTION: handleChange
  // =============================================
  // This ONE function handles ALL input changes
  // We do not need a separate function for each input
  //
  // HOW IT WORKS:
  // e.target.name  → which input field changed
  //                  this matches the name="" attribute
  //                  on each input element
  // e.target.value → what the user typed
  //
  // ...formData → spread operator
  //               keeps all existing field values
  //               only updates the one that changed
  //
  // EXAMPLE:
  // user types "Umair" in name field
  //   e.target.name  = "name"
  //   e.target.value = "Umair"
  //   result: { name: "Umair", phone: "", doctor: "" }
  //
  // user types "0300" in phone field
  //   e.target.name  = "phone"
  //   e.target.value = "0300"
  //   result: { name: "Umair", phone: "0300", doctor: "" }
  // =============================================
  function handleChange(e) {
    setFormData({
      ...formData, // keep all existing values
      [e.target.name]: e.target.value, // update only the changed field
    });
  }

  // =============================================
  // FUNCTION: handleSubmit
  // =============================================
  // This runs when user clicks the submit button
  //
  // STEP 1: e.preventDefault()
  //   By default, when a form submits
  //   the browser refreshes the entire page
  //   This destroys all React state
  //   preventDefault() stops that from happening
  //   ALWAYS write this as the very first line
  //
  // STEP 2: setIsSubmitted(true)
  //   Changes isSubmitted state to true
  //   React re-renders
  //   We show success message instead of form
  // =============================================
  function handleSubmit(e) {
    // STEP 1 — stop browser page refresh
    // always first line in handleSubmit
    e.preventDefault();

    // STEP 2 — mark form as submitted
    // this triggers showing the success message
    setIsSubmitted(true);
  }

  // =============================================
  // FUNCTION: handleReset
  // =============================================
  // Runs when user clicks "Book Another"
  // Resets all form fields back to empty
  // Sets isSubmitted back to false
  // Shows the form again
  // =============================================
  function handleReset() {
    // reset all fields to empty string
    setFormData({
      name: "",
      phone: "",
      doctor: "",
    });

    // hide success message, show form again
    setIsSubmitted(false);
  }

  // =============================================
  // CONDITIONAL RENDER — success message
  // =============================================
  // if isSubmitted is true
  // return the success screen EARLY
  // the form below never renders
  // this pattern is called "early return"
  // =============================================
  if (isSubmitted) {
    return (
      // Success screen wrapper
      <div
        style={{
          maxWidth: "500px",
          margin: "40px auto",
          padding: "0 16px",
          fontFamily: "sans-serif",
          textAlign: "center",
        }}
      >
        {/* Green checkmark circle */}
        <div
          style={{
            width: "64px",
            height: "64px",
            borderRadius: "50%", // makes it a circle
            backgroundColor: "#e1f5ee", // light green
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 16px",
            fontSize: "28px",
          }}
        >
          ✓
        </div>

        {/* Success title */}
        <h2 style={{ color: "#0f6e56", marginBottom: "8px" }}>
          Appointment Booked!
        </h2>

        {/* Show the data user submitted */}
        {/* We read from formData state */}
        {/* Even after submit, state still holds the values */}
        <p style={{ color: "#555", margin: "6px 0" }}>
          Patient: {formData.name}
        </p>
        <p style={{ color: "#555", margin: "6px 0" }}>
          Phone: {formData.phone}
        </p>
        <p style={{ color: "#555", margin: "6px 0" }}>
          Doctor: {formData.doctor}
        </p>

        {/* Reset button — goes back to form */}
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
  // end of early return

  // =============================================
  // MAIN FORM RENDER
  // =============================================
  // This only renders when isSubmitted is false
  // which is the default state
  // =============================================
  return (
    <div
      style={{
        maxWidth: "500px",
        margin: "40px auto",
        padding: "0 16px",
        fontFamily: "sans-serif",
      }}
    >
      {/* Page title */}
      <h1 style={{ color: "#1a1a2e", marginBottom: "24px" }}>
        Book an Appointment
      </h1>

      {/* =============================================
          THE FORM ELEMENT
          =============================================
          onSubmit={handleSubmit}
          → when user clicks submit button
          → or presses Enter key
          → handleSubmit function runs
          ============================================= */}
      <form
        onSubmit={handleSubmit}
        style={{
          backgroundColor: "white",
          border: "1px solid #ddd",
          borderRadius: "8px",
          padding: "24px",
        }}
      >
        {/* ========================= */}
        {/* INPUT 1 — Patient Name    */}
        {/* ========================= */}
        <div style={{ marginBottom: "16px" }}>
          {/* label — tells user what this field is */}
          {/* htmlFor="name" connects label to input */}
          {/* htmlFor in JSX = for in HTML */}
          {/* clicking label focuses the input */}
          <label
            htmlFor="name"
            style={{
              display: "block", // label on its own line
              marginBottom: "6px",
              fontSize: "14px",
              fontWeight: "500",
              color: "#333",
            }}
          >
            Patient Name
          </label>

          {/* CONTROLLED INPUT */}
          {/* name="name" → matches formData.name key */}
          {/*               handleChange uses this to know */}
          {/*               which field to update */}
          {/* value={formData.name} → input shows state value */}
          {/*                         state controls the input */}
          {/* onChange={handleChange} → fires on every keystroke */}
          {/*                           updates formData.name */}
          {/* required → cannot submit if empty */}
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
        {/* end of name field */}

        {/* ========================= */}
        {/* INPUT 2 — Phone Number    */}
        {/* ========================= */}
        <div style={{ marginBottom: "16px" }}>
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

          {/* name="phone" → matches formData.phone */}
          {/* value={formData.phone} → controlled by state */}
          {/* onChange={handleChange} → updates formData.phone */}
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
        {/* end of phone field */}

        {/* ========================= */}
        {/* INPUT 3 — Select Doctor   */}
        {/* ========================= */}
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

          {/* select = dropdown element */}
          {/* works exactly like input */}
          {/* name="doctor" → matches formData.doctor */}
          {/* value={formData.doctor} → controlled by state */}
          {/* onChange={handleChange} → updates formData.doctor */}
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
            {/* default empty option */}
            {/* value="" means nothing selected yet */}
            <option value="">-- Select a doctor --</option>

            {/* each option has a value */}
            {/* when selected, formData.doctor = that value */}
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
        {/* end of doctor select */}

        {/* ========================= */}
        {/* SUBMIT BUTTON             */}
        {/* ========================= */}
        {/* type="submit" → clicking this */}
        {/* triggers the form onSubmit   */}
        {/* which runs handleSubmit      */}
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
      {/* end of form */}
    </div>
  );
}
// end of BookingForm component

// ============================================
// COMPONENT: App
// ============================================
// App just renders BookingForm
// BookingForm manages its own state internally
// This is called LOCAL STATE
// ============================================
function App() {
  return (
    <div>
      <BookingForm />
    </div>
  );
}

export default App;
