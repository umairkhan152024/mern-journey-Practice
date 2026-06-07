// ============================================
// FILE: src/App.jsx
// STAGE 5 — PIECE 3 OF 5
// ============================================
// NEW THING: useNavigate
// ============================================
// useNavigate gives you a function
// you call that function with a path
// React Router sends user to that page
// automatically — no link clicking needed
//
// REAL USE CASE:
// User submits booking form
// → navigate("/") sends them to home page
// automatically after submit
// ============================================

import {
  BrowserRouter,
  Routes,
  Route,
  NavLink,
  useNavigate,
} from "react-router-dom";

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
// PAGE 2 — Booking
// ============================================
// This page has a form
// When user submits the form
// useNavigate sends them to home page
// automatically
// ============================================
function Booking() {
  // =============================================
  // useNavigate hook
  // =============================================
  // useNavigate() returns a function
  // we store it in navigate variable
  // when we call navigate("/")
  // React Router sends user to / (home page)
  // =============================================
  const navigate = useNavigate();

  // =============================================
  // handleSubmit
  // =============================================
  // runs when user clicks Book button
  // after booking is done
  // navigate("/") sends user to home page
  // automatically — no link clicking needed
  // =============================================
  function handleSubmit(e) {
    // stop page refresh — always first line
    e.preventDefault();

    // booking logic would go here
    // like saving to database
    // for now we just navigate

    // =============================================
    // navigate("/")
    // =============================================
    // this sends user to home page automatically
    // like clicking the Home NavLink
    // but done in code — not by user
    //
    // you can navigate to any page:
    // navigate("/")        → home page
    // navigate("/doctors") → doctors page
    // navigate("/about")   → about page
    // =============================================
    navigate("/");
  }

  return (
    <div
      style={{ fontFamily: "sans-serif", padding: "40px", maxWidth: "400px" }}
    >
      <h1 style={{ color: "#1a1a2e", marginBottom: "24px" }}>
        Book Appointment
      </h1>

      <form onSubmit={handleSubmit}>
        {/* name input */}
        <input
          type="text"
          placeholder="Your name"
          required
          style={{
            width: "100%",
            padding: "10px 14px",
            fontSize: "14px",
            border: "1px solid #ddd",
            borderRadius: "8px",
            marginBottom: "12px",
            boxSizing: "border-box",
            outline: "none",
          }}
        />

        {/* phone input */}
        <input
          type="tel"
          placeholder="Your phone"
          required
          style={{
            width: "100%",
            padding: "10px 14px",
            fontSize: "14px",
            border: "1px solid #ddd",
            borderRadius: "8px",
            marginBottom: "16px",
            boxSizing: "border-box",
            outline: "none",
          }}
        />

        {/* submit button */}
        {/* clicking this runs handleSubmit */}
        {/* handleSubmit calls navigate("/") */}
        {/* user goes to home page automatically */}
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

// ============================================
// PAGE 3 — Doctors
// ============================================
function Doctors() {
  return (
    <div style={{ fontFamily: "sans-serif", padding: "40px" }}>
      <h1 style={{ color: "#1a1a2e" }}>Our Doctors</h1>
    </div>
  );
}

// ============================================
// PAGE 4 — About
// ============================================
function About() {
  return (
    <div style={{ fontFamily: "sans-serif", padding: "40px" }}>
      <h1 style={{ color: "#1a1a2e" }}>About ZENOVA</h1>
    </div>
  );
}

// ============================================
// COMPONENT: Navbar
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

      <NavLink
        to="/"
        style={({ isActive }) => ({
          color: isActive ? "white" : "#aaaaaa",
          textDecoration: "none",
          fontSize: "15px",
          borderBottom: isActive
            ? "2px solid #1D9E75"
            : "2px solid transparent",
          paddingBottom: "4px",
        })}
      >
        Home
      </NavLink>

      <NavLink
        to="/doctors"
        style={({ isActive }) => ({
          color: isActive ? "white" : "#aaaaaa",
          textDecoration: "none",
          fontSize: "15px",
          borderBottom: isActive
            ? "2px solid #1D9E75"
            : "2px solid transparent",
          paddingBottom: "4px",
        })}
      >
        Doctors
      </NavLink>

      <NavLink
        to="/booking"
        style={({ isActive }) => ({
          color: isActive ? "white" : "#aaaaaa",
          textDecoration: "none",
          fontSize: "15px",
          borderBottom: isActive
            ? "2px solid #1D9E75"
            : "2px solid transparent",
          paddingBottom: "4px",
        })}
      >
        Booking
      </NavLink>

      <NavLink
        to="/about"
        style={({ isActive }) => ({
          color: isActive ? "white" : "#aaaaaa",
          textDecoration: "none",
          fontSize: "15px",
          borderBottom: isActive
            ? "2px solid #1D9E75"
            : "2px solid transparent",
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
