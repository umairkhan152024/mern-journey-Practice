// ============================================
// FILE: src/App.jsx
// STAGE 4 — PIECE 3 OF 4
// ============================================
// GOAL: combine useState with Context
//
// When state changes → Context value updates
// → every component reading Context updates too
//
// REAL EXAMPLE:
// User clicks "Change City" button
// City changes in state
// Header and Footer both update automatically
// because they read city from Context
// ============================================

import { createContext, useContext, useState } from "react";

// create the noticeboard
const ClinicContext = createContext();

// ============================================
// COMPONENT: Header
// ============================================
// reads clinicName and city from Context
// when Context updates — this updates too
// ============================================
function Header() {
  const { clinicName, city } = useContext(ClinicContext);

  return (
    <div
      style={{
        backgroundColor: "#1a1a2e",
        color: "white",
        padding: "20px",
        borderRadius: "8px",
        marginBottom: "16px",
        fontFamily: "sans-serif",
      }}
    >
      <h1 style={{ margin: "0 0 4px", fontSize: "20px" }}>{clinicName}</h1>
      {/* city from Context */}
      {/* when city state changes in App */}
      {/* this updates automatically */}
      <p style={{ margin: 0, color: "#aaa", fontSize: "14px" }}>{city}</p>
    </div>
  );
}

// ============================================
// COMPONENT: Footer
// ============================================
// also reads city from Context
// also updates when city changes
// ============================================
function Footer() {
  const { city } = useContext(ClinicContext);

  return (
    <div
      style={{
        marginTop: "16px",
        padding: "16px",
        borderTop: "1px solid #ddd",
        fontFamily: "sans-serif",
        fontSize: "13px",
        color: "#888",
        textAlign: "center",
      }}
    >
      {/* city from Context */}
      Currently serving patients in {city}
    </div>
  );
}

// ============================================
// COMPONENT: App
// ============================================
function App() {
  // =============================================
  // STATE — city
  // =============================================
  // city is stored in useState
  // it is passed into Context Provider as value
  //
  // when setCity is called:
  //   1. city state updates
  //   2. Context value updates
  //   3. Header re-renders with new city
  //   4. Footer re-renders with new city
  //
  // ONE state change → EVERY component updates
  // this is the power of Context + useState
  // =============================================
  const [city, setCity] = useState("Islamabad");

  return (
    <div
      style={{
        maxWidth: "500px",
        margin: "40px auto",
        padding: "0 16px",
      }}
    >
      {/* =============================================
          PROVIDER — noticeboard
          =============================================
          value has two things:
          1. clinicName — static, never changes
          2. city — comes from state, can change

          when city state changes
          Provider value updates
          all components inside re-render
          ============================================= */}
      <ClinicContext.Provider
        value={{
          clinicName: "ZENOVA Medical Center",
          city: city,
          // city: city means:
          // left side  = key name in Context
          // right side = city state value
        }}
      >
        {/* Header reads city from Context */}
        <Header />

        {/* =============================================
            BUTTONS — change city state
            =============================================
            when clicked → setCity updates state
            → Context value updates
            → Header and Footer both update
            notice: buttons are NOT inside Header
            or Footer — they are in App
            but Header and Footer still update
            because they read from Context
            ============================================= */}
        <div
          style={{
            display: "flex",
            gap: "10px",
            marginBottom: "16px",
            flexWrap: "wrap",
          }}
        >
          {/* each button sets city to a different value */}
          <button
            onClick={() => setCity("Islamabad")}
            style={{
              padding: "10px 20px",
              backgroundColor: city === "Islamabad" ? "#1a1a2e" : "white",
              color: city === "Islamabad" ? "white" : "#1a1a2e",
              border: "1px solid #1a1a2e",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "14px",
              fontFamily: "sans-serif",
            }}
          >
            Islamabad
          </button>

          <button
            onClick={() => setCity("Lahore")}
            style={{
              padding: "10px 20px",
              backgroundColor: city === "Lahore" ? "#1a1a2e" : "white",
              color: city === "Lahore" ? "white" : "#1a1a2e",
              border: "1px solid #1a1a2e",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "14px",
              fontFamily: "sans-serif",
            }}
          >
            Lahore
          </button>

          <button
            onClick={() => setCity("Karachi")}
            style={{
              padding: "10px 20px",
              backgroundColor: city === "Karachi" ? "#1a1a2e" : "white",
              color: city === "Karachi" ? "white" : "#1a1a2e",
              border: "1px solid #1a1a2e",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "14px",
              fontFamily: "sans-serif",
            }}
          >
            Karachi
          </button>
        </div>

        {/* Footer also reads city from Context */}
        <Footer />
      </ClinicContext.Provider>
    </div>
  );
}

export default App;
