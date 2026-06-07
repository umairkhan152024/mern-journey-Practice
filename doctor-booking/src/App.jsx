// ============================================
// FILE: src/App.jsx
// STAGE 5 — PIECE 2 OF 5 — FULL VERSION
// ============================================
// 4 pages: Home, Doctors, Booking, About
// NavLink with isActive styling
// Active link = white + green underline
// Inactive link = grey
// ============================================

import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";

// ============================================
// PAGE 1 — Home
// ============================================
function Home() {
  return (
    <div style={{ fontFamily: "sans-serif", padding: "40px" }}>
      <h1 style={{ color: "#1a1a2e", marginBottom: "8px" }}>
        Welcome to ZENOVA Clinic
      </h1>
      <p style={{ color: "#555" }}>Best doctors in Islamabad</p>
    </div>
  );
}

// ============================================
// PAGE 2 — Doctors
// ============================================
function Doctors() {
  return (
    <div style={{ fontFamily: "sans-serif", padding: "40px" }}>
      <h1 style={{ color: "#1a1a2e", marginBottom: "8px" }}>Our Doctors</h1>
      <p style={{ color: "#555" }}>Find the best doctors here</p>
    </div>
  );
}

// ============================================
// PAGE 3 — Booking
// ============================================
function Booking() {
  return (
    <div style={{ fontFamily: "sans-serif", padding: "40px" }}>
      <h1 style={{ color: "#1a1a2e", marginBottom: "8px" }}>
        Book Appointment
      </h1>
      <p style={{ color: "#555" }}>Fill in the form to book your appointment</p>
    </div>
  );
}

// ============================================
// PAGE 4 — About
// ============================================
function About() {
  return (
    <div style={{ fontFamily: "sans-serif", padding: "40px" }}>
      <h1 style={{ color: "#1a1a2e", marginBottom: "8px" }}>About ZENOVA</h1>
      <p style={{ color: "#555" }}>We are the best clinic in Islamabad</p>
    </div>
  );
}

// ============================================
// COMPONENT: Navbar
// ============================================
// NavLink automatically knows active page
// style function receives { isActive }
// isActive true  → white + green underline
// isActive false → grey
// ============================================
function Navbar() {
  return (
    <div
      style={{
        backgroundColor: "#1a1a2e",
        padding: "16px 24px",
        display: "flex",
        gap: "24px",
        fontFamily: "sans-serif",
        alignItems: "center",
      }}
    >
      {/* Clinic name */}
      <span
        style={{
          color: "white",
          fontWeight: "500",
          fontSize: "16px",
          marginRight: "16px",
        }}
      >
        ZENOVA
      </span>

      {/* =============================================
          NavLink — style receives { isActive }
          automatically from React Router
          isActive true  → current page
          isActive false → not current page
          ============================================= */}
      <NavLink
        to="/"
        style={({ isActive }) => ({
          color: isActive ? "white" : "#aaaaaa",
          borderBottom: isActive
            ? "2px solid #1D9E75"
            : "2px solid transparent",
          textDecoration: "none",
          fontSize: "15px",
          fontWeight: isActive ? "500" : "400",
          paddingBottom: "4px",
        })}
      >
        Home
      </NavLink>

      <NavLink
        to="/doctors"
        style={({ isActive }) => ({
          color: isActive ? "white" : "#aaaaaa",
          borderBottom: isActive
            ? "2px solid #1D9E75"
            : "2px solid transparent",
          textDecoration: "none",
          fontSize: "15px",
          fontWeight: isActive ? "500" : "400",
          paddingBottom: "4px",
        })}
      >
        Doctors
      </NavLink>

      <NavLink
        to="/booking"
        style={({ isActive }) => ({
          color: isActive ? "white" : "#aaaaaa",
          borderBottom: isActive
            ? "2px solid #1D9E75"
            : "2px solid transparent",
          textDecoration: "none",
          fontSize: "15px",
          fontWeight: isActive ? "500" : "400",
          paddingBottom: "4px",
        })}
      >
        Booking
      </NavLink>

      <NavLink
        to="/about"
        style={({ isActive }) => ({
          color: isActive ? "white" : "#aaaaaa",
          borderBottom: isActive
            ? "2px solid #1D9E75"
            : "2px solid transparent",
          textDecoration: "none",
          fontSize: "15px",
          fontWeight: isActive ? "500" : "400",
          paddingBottom: "4px",
        })}
      >
        About
      </NavLink>
    </div>
  );
}

// ============================================
// COMPONENT: App
// ============================================
function App() {
  return (
    <BrowserRouter>
      {/* Navbar always visible on every page */}
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
