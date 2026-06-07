// ============================================
// FILE: src/App.jsx
// STAGE 5 — PIECE 1 OF 5
// ============================================
// GOAL: understand basic routing
// We have two pages:
// /        → Home page
// /doctors → Doctors page
//
// When URL is /        → Home component shows
// When URL is /doctors → Doctors component shows
// No page refresh — React Router handles it
// ============================================

// IMPORT from react-router-dom
// BrowserRouter → enables routing in the app
// Routes        → container for all routes
// Route         → one single route definition
// Link          → like <a> tag but no page refresh
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

// ============================================
// PAGE 1 — Home
// ============================================
// this component shows when URL is /
// it is a normal React component
// nothing special about it
// React Router just decides WHEN to show it
// ============================================
function Home() {
  return (
    <div style={{ fontFamily: "sans-serif", padding: "20px" }}>
      <h1 style={{ color: "#1a1a2e" }}>Welcome to ZENOVA Clinic</h1>

      <p style={{ color: "#555" }}>Best doctors in Islamabad</p>
    </div>
  );
}

// ============================================
// PAGE 2 — Doctors
// ============================================
// this component shows when URL is /doctors
// also a normal React component
// ============================================
function Doctors() {
  return (
    <div style={{ fontFamily: "sans-serif", padding: "20px" }}>
      <h1 style={{ color: "#1a1a2e" }}>Our Doctors</h1>

      <p style={{ color: "#555" }}>Find the best doctors here</p>
    </div>
  );
}

// ============================================
// COMPONENT: Navbar
// ============================================
// navigation bar with links to each page
// Link is like <a> tag but:
//   → does NOT refresh the page
//   → just changes the URL
//   → React Router shows the right component
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
      }}
    >
      {/* Link to="/" → goes to home page */}
      {/* to is like href in normal <a> tag */}
      <Link
        to="/"
        style={{
          color: "white",
          textDecoration: "none",
          fontSize: "15px",
        }}
      >
        Home
      </Link>

      {/* Link to="/doctors" → goes to doctors page */}
      <Link
        to="/doctors"
        style={{
          color: "white",
          textDecoration: "none",
          fontSize: "15px",
        }}
      >
        Doctors
      </Link>
    </div>
  );
}

// ============================================
// COMPONENT: App
// ============================================
function App() {
  return (
    // =============================================
    // BrowserRouter
    // =============================================
    // wraps the ENTIRE app
    // enables React Router for everything inside
    // without this — routing does not work
    // always put it at the very top level
    // =============================================
    <BrowserRouter>
      {/* Navbar shows on every page */}
      {/* it is outside Routes */}
      {/* so it never disappears */}
      <Navbar />

      {/* =============================================
          Routes — container for all routes
          =============================================
          React Router looks at the current URL
          finds the matching Route
          shows that component
          hides all other components
          ============================================= */}
      <Routes>
        {/* Route 1 */}
        {/* path="/" means: when URL is localhost:5173/ */}
        {/* element={<Home />} means: show Home component */}
        <Route path="/" element={<Home />} />

        {/* Route 2 */}
        {/* path="/doctors" means: when URL is localhost:5173/doctors */}
        {/* element={<Doctors />} means: show Doctors component */}
        <Route path="/doctors" element={<Doctors />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
