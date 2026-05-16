// ============================================
// FILE: src/App.jsx
// PURPOSE: Root component — the main page frame
// ============================================

import DoctorList from "./components/DoctorList";

function App() {
  return (
    // This outer div is the FULL PAGE wrapper
    // width: "100%" means stretch to fill the entire browser window
    // minHeight: "100vh" means at least full screen height
    // vh = viewport height — 100vh = 100% of screen height
    <div
      style={{ width: "100%", minHeight: "100vh", backgroundColor: "#f5f5f5" }}
    >
      {/* ===================== */}
      {/* HEADER SECTION        */}
      {/* ===================== */}

      {/* width: "100%" makes the header stretch full width */}
      {/* boxSizing: "border-box" means padding is INCLUDED in the width */}
      {/* Without this, padding adds EXTRA width and breaks layout */}
      <div
        style={{
          width: "100%",
          boxSizing: "border-box",
          backgroundColor: "#1a1a2e",
          color: "white",
          padding: "28px 40px",
          fontFamily: "sans-serif",
        }}
      >
        {/* Clinic name */}
        <h1 style={{ margin: 0, fontSize: "26px", fontWeight: "700" }}>
          ZENOVA Clinic
        </h1>

        {/* Subtitle */}
        <p style={{ margin: "6px 0 0", color: "#aaaaaa", fontSize: "14px" }}>
          Find and book the best doctors in Islamabad
        </p>
      </div>
      {/* End of header */}

      {/* ===================== */}
      {/* MAIN CONTENT SECTION  */}
      {/* ===================== */}

      {/* DoctorList lives here */}
      {/* It contains the 3-column grid of doctor cards */}
      <DoctorList />
    </div>
    // End of full page wrapper
  );
}

export default App;
