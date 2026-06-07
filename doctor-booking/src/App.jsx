// ============================================
// FILE: src/App.jsx
// GOAL: understand isActive clearly
// ============================================

import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";

function Home() {
  return (
    <div style={{ padding: "40px", fontFamily: "sans-serif" }}>
      <h1>Home Page</h1>
    </div>
  );
}

function Doctors() {
  return (
    <div style={{ padding: "40px", fontFamily: "sans-serif" }}>
      <h1>Doctors Page</h1>
    </div>
  );
}

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
      {/* =============================================
          NavLink style prop takes a FUNCTION
          NavLink calls this function automatically
          and passes { isActive } to it
          
          { isActive } is an object with one property
          isActive = true  → this link is current page
          isActive = false → this link is not current page
          
          we return a style object based on isActive
          ============================================= */}
      <NavLink
        to="/"
        style={({ isActive }) => ({
          // if isActive is true  → color is white
          // if isActive is false → color is grey
          color: isActive ? "white" : "#aaaaaa",

          // if isActive is true  → green underline
          // if isActive is false → no underline
          borderBottom: isActive ? "2px solid #1D9E75" : "none",

          // remove default underline from link
          textDecoration: "none",
          fontSize: "15px",
          paddingBottom: "4px",
        })}
      >
        Home
      </NavLink>

      <NavLink
        to="/doctors"
        style={({ isActive }) => ({
          color: isActive ? "white" : "#aaaaaa",
          borderBottom: isActive ? "2px solid #1D9E75" : "none",
          textDecoration: "none",
          fontSize: "15px",
          paddingBottom: "4px",
        })}
      >
        Doctors
      </NavLink>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/doctors" element={<Doctors />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
