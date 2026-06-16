// ============================================
// EXAMPLE 4 — onKeyDown
// CONCEPT: detecting specific key presses
// ============================================
// onKeyDown fires when user presses ANY key
// e.key tells us WHICH key was pressed
//
// Common keys:
// e.key === "Enter"   → Enter key
// e.key === "Escape"  → Escape key
// e.key === "Backspace" → Backspace key
// e.key === "a"       → letter a
// e.key === " "       → spacebar
//
// REAL USE CASE:
// press Enter to search
// press Escape to close a modal
// press arrow keys to navigate
// ============================================

import { useState } from "react";

function App() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [message, setMessage] = useState("");

  // doctors list to search through
  const doctors = [
    "Dr. Ahmed Khan",
    "Dr. Sara Malik",
    "Dr. Bilal Akhtar",
    "Dr. Fatima Noor",
    "Dr. Usman Ali",
  ];

  // =============================================
  // handleKeyDown
  // =============================================
  // fires on every key press
  // e.key tells us which key
  //
  // Enter  → run the search
  // Escape → clear everything
  // =============================================
  function handleKeyDown(e) {
    // =============================================
    // Enter key pressed
    // =============================================
    // filter doctors that match search text
    // show results
    // =============================================
    if (e.key === "Enter") {
      setMessage("Enter pressed — searching...");

      // filter doctors by search text
      const filtered = doctors.filter((doctor) =>
        doctor.toLowerCase().includes(search.toLowerCase()),
      );

      setResults(filtered);
    }

    // =============================================
    // Escape key pressed
    // =============================================
    // clear search and results
    // =============================================
    if (e.key === "Escape") {
      setMessage("Escape pressed — cleared!");
      setSearch("");
      setResults([]);
    }
  }

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "40px auto",
        fontFamily: "sans-serif",
        padding: "0 16px",
      }}
    >
      <h1 style={{ color: "#1a1a2e", marginBottom: "8px" }}>
        onKeyDown Example
      </h1>

      <p style={{ color: "#888", fontSize: "13px", marginBottom: "24px" }}>
        Type a name → press Enter to search → press Escape to clear
      </p>

      {/* =============================================
          INPUT with onKeyDown
          =============================================
          onChange → updates search state on every keystroke
          onKeyDown → checks which key was pressed
                      Enter  → search
                      Escape → clear
          ============================================= */}
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type doctor name and press Enter..."
        style={{
          width: "100%",
          padding: "10px 14px",
          fontSize: "14px",
          border: "1px solid #ddd",
          borderRadius: "8px",
          boxSizing: "border-box",
          outline: "none",
          marginBottom: "12px",
        }}
      />

      {/* show which key was pressed */}
      {message && (
        <p
          style={{
            color: "#378ADD",
            fontSize: "13px",
            marginBottom: "12px",
          }}
        >
          {message}
        </p>
      )}

      {/* RESULTS */}
      {results.length > 0 ? (
        <div>
          <p style={{ color: "#888", fontSize: "13px", marginBottom: "8px" }}>
            {results.length} doctor(s) found:
          </p>

          {results.map((doctor, index) => (
            <div
              key={index}
              style={{
                backgroundColor: "white",
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "12px 16px",
                marginBottom: "8px",
              }}
            >
              <p style={{ margin: 0, color: "#1a1a2e", fontSize: "14px" }}>
                {doctor}
              </p>
            </div>
          ))}
        </div>
      ) : (
        search && (
          <p style={{ color: "#aaa", fontSize: "14px" }}>
            Press Enter to search for "{search}"
          </p>
        )
      )}
    </div>
  );
}

export default App;
