// ============================================
// FILE: src/components/AppointmentCounter.jsx
// PURPOSE: Shows a counter that goes up when
// user clicks "Book Appointment" button
// This teaches us useState — the most important hook
// ============================================

// IMPORT useState
// useState is not available automatically
// We must import it from the react library
// Every hook starts with the word "use"
import { useState } from "react";

function AppointmentCounter() {
  // =============================================
  // STATE DECLARATION
  // =============================================
  // const [count, setCount] = useState(0)
  //
  // count    → the current value of our counter
  //            starts at 0 because we passed 0 to useState
  //
  // setCount → the ONLY way to change count
  //            when we call setCount(newValue),
  //            React re-renders this component
  //            and shows the new value on screen
  //
  // useState(0) → 0 is the initial value
  //               the very first time this renders,
  //               count will be 0
  // =============================================
  const [count, setCount] = useState(0);

  // =============================================
  // EVENT HANDLER FUNCTION
  // =============================================
  // This function runs when the button is clicked
  // We call setCount to update the state
  // We pass count + 1 to increase by 1 each click
  // =============================================
  function handleBooking() {
    // count + 1 = current value plus one
    // setCount tells React: update count to this new value
    // React then re-renders the component automatically
    setCount(count + 1);
  }

  // =============================================
  // RENDER
  // =============================================
  return (
    <div
      style={{
        backgroundColor: "white",
        border: "1px solid #e0e0e0",
        borderRadius: "10px",
        padding: "24px",
        marginBottom: "30px",
        fontFamily: "sans-serif",
        textAlign: "center",
      }}
    >
      {/* Title */}
      <h2 style={{ color: "#1a1a2e", marginBottom: "8px" }}>
        Appointments Booked
      </h2>

      {/* =============================================
          DISPLAYING STATE VALUE
          {count} reads the current state value
          Every time setCount is called,
          React re-renders and shows the new count here
          ============================================= */}
      <p
        style={{
          fontSize: "48px",
          fontWeight: "700",
          color: "#1D9E75",
          margin: "16px 0",
        }}
      >
        {count}
      </p>

      {/* =============================================
          BUTTON WITH onClick EVENT
          onClick={handleBooking} means:
          when this button is clicked,
          run the handleBooking function
          Notice: onClick not onclick (camelCase in React)
          Notice: {handleBooking} not {handleBooking()}
          We pass the function REFERENCE, not call it
          ============================================= */}
      <button
        onClick={handleBooking}
        style={{
          backgroundColor: "#1a1a2e",
          color: "white",
          border: "none",
          borderRadius: "8px",
          padding: "12px 28px",
          fontSize: "15px",
          cursor: "pointer",
          fontWeight: "500",
        }}
      >
        Book Appointment
      </button>

      {/* =============================================
          CONDITIONAL RENDERING WITH STATE
          When count is 0 — show "No appointments yet"
          When count is more than 0 — show the message
          This is real conditional rendering using state
          ============================================= */}
      {count === 0 ? (
        <p style={{ marginTop: "12px", color: "#aaa", fontSize: "14px" }}>
          No appointments booked yet
        </p>
      ) : (
        <p style={{ marginTop: "12px", color: "#555", fontSize: "14px" }}>
          {count} appointment{count > 1 ? "s" : ""} booked today
        </p>
      )}
      {/* count > 1 ? "s" : "" adds an "s" for plural */}
      {/* 1 appointment vs 2 appointments */}
    </div>
  );
}

export default AppointmentCounter;
