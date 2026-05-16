// ============================================
// FILE: src/App.jsx
// PURPOSE: Root component — main page
// Now imports AppointmentCounter along with DoctorList
// ============================================

// Import DoctorList — the grid of doctor cards
import DoctorList from "./components/DoctorList";

// Import AppointmentCounter — our new useState component
import AppointmentCounter from "./components/AppointmentCounter";

function App() {
  return (
    // Full page wrapper
    <div
      style={{ width: "100%", minHeight: "100vh", backgroundColor: "#f5f5f5" }}
    >
      {/* ======================== */}
      {/* HEADER                   */}
      {/* ======================== */}
      <div
        style={{
          width: "100%",
          backgroundColor: "#1a1a2e",
          color: "white",
          padding: "28px 40px",
          fontFamily: "sans-serif",
          boxSizing: "border-box",
        }}
      >
        <h1 style={{ fontSize: "26px", fontWeight: "700" }}>ZENOVA Clinic</h1>
        <p style={{ marginTop: "6px", color: "#aaaaaa", fontSize: "14px" }}>
          Find and book the best doctors in Islamabad
        </p>
      </div>

      {/* ======================== */}
      {/* MAIN CONTENT             */}
      {/* ======================== */}
      <div style={{ padding: "40px", boxSizing: "border-box" }}>
        {/* AppointmentCounter sits above the doctor list */}
        {/* It has its OWN state — isolated inside the component */}
        {/* DoctorList has no idea this counter exists */}
        {/* This is called LOCAL STATE */}
        <AppointmentCounter />

        {/* Doctor grid below the counter */}
        <DoctorList />
      </div>
    </div>
  );
}

export default App;
