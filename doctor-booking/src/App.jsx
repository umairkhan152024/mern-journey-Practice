// ============================================
// FILE: src/App.jsx
// STAGE 5 — PIECE 5 OF 5 — FINAL
// ============================================
// NEW THING: 404 page
// ============================================
// What happens when user goes to a URL
// that does not exist?
// like localhost:5173/randompage
//
// Without 404 page → blank screen
// With 404 page    → friendly error message
//
// path="*" means: match ANYTHING
// that did not match the routes above it
// ============================================

import {
  BrowserRouter,
  Routes,
  Route,
  NavLink,
  Link,
  useParams,
  useNavigate,
} from "react-router-dom";

// doctors data
const doctors = [
  {
    id: 1,
    name: "Dr. Ahmed Khan",
    specialty: "Cardiologist",
    fee: 2000,
    city: "Islamabad",
  },
  {
    id: 2,
    name: "Dr. Sara Malik",
    specialty: "Dentist",
    fee: 1500,
    city: "Rawalpindi",
  },
  {
    id: 3,
    name: "Dr. Bilal Akhtar",
    specialty: "Skin Specialist",
    fee: 1800,
    city: "Islamabad",
  },
];

// ============================================
// PAGE: Home
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
// PAGE: Doctors — all doctors
// ============================================
function Doctors() {
  return (
    <div
      style={{ fontFamily: "sans-serif", padding: "40px", maxWidth: "500px" }}
    >
      <h1 style={{ color: "#1a1a2e", marginBottom: "24px" }}>Our Doctors</h1>

      {doctors.map((doctor) => (
        <div
          key={doctor.id}
          style={{
            backgroundColor: "white",
            border: "1px solid #ddd",
            borderRadius: "8px",
            padding: "16px",
            marginBottom: "12px",
          }}
        >
          <h2 style={{ margin: "0 0 6px", color: "#1a1a2e", fontSize: "16px" }}>
            {doctor.name}
          </h2>
          <p style={{ margin: "4px 0", color: "#555", fontSize: "14px" }}>
            {doctor.specialty}
          </p>
          <Link
            to={`/doctors/${doctor.id}`}
            style={{
              display: "inline-block",
              marginTop: "10px",
              padding: "6px 16px",
              backgroundColor: "#1a1a2e",
              color: "white",
              borderRadius: "6px",
              textDecoration: "none",
              fontSize: "13px",
            }}
          >
            View Profile
          </Link>
        </div>
      ))}
    </div>
  );
}

// ============================================
// PAGE: DoctorProfile — one doctor
// ============================================
function DoctorProfile() {
  const { id } = useParams();
  const navigate = useNavigate();

  const doctor = doctors.find((d) => d.id === Number(id));

  // doctor not found
  if (!doctor) {
    return (
      <div style={{ fontFamily: "sans-serif", padding: "40px" }}>
        <h2 style={{ color: "#a32d2d" }}>Doctor not found</h2>
        <Link to="/doctors" style={{ color: "#1a1a2e" }}>
          Go back to doctors
        </Link>
      </div>
    );
  }

  return (
    <div
      style={{ fontFamily: "sans-serif", padding: "40px", maxWidth: "400px" }}
    >
      <Link
        to="/doctors"
        style={{
          color: "#555",
          textDecoration: "none",
          fontSize: "14px",
          display: "inline-block",
          marginBottom: "24px",
        }}
      >
        ← Back to all doctors
      </Link>

      <div
        style={{
          backgroundColor: "white",
          border: "1px solid #ddd",
          borderRadius: "8px",
          padding: "24px",
        }}
      >
        <h1 style={{ margin: "0 0 8px", color: "#1a1a2e" }}>{doctor.name}</h1>
        <p style={{ margin: "6px 0", color: "#555", fontSize: "15px" }}>
          Specialty: {doctor.specialty}
        </p>
        <p style={{ margin: "6px 0", color: "#555", fontSize: "15px" }}>
          City: {doctor.city}
        </p>
        <p style={{ margin: "6px 0", fontSize: "15px", fontWeight: "500" }}>
          Fee: Rs. {doctor.fee}
        </p>

        {/* book button — navigate to booking page */}
        <button
          onClick={() => navigate("/booking")}
          style={{
            marginTop: "16px",
            padding: "10px 24px",
            backgroundColor: "#1D9E75",
            color: "white",
            border: "none",
            borderRadius: "8px",
            fontSize: "14px",
            fontWeight: "500",
            cursor: "pointer",
          }}
        >
          Book Appointment
        </button>
      </div>
    </div>
  );
}

// ============================================
// PAGE: Booking
// ============================================
function Booking() {
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
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
// PAGE: NotFound — 404 page
// ============================================
// this shows when user goes to any URL
// that does not match any route above
// like /randompage or /xyz
//
// path="*" in Route means:
// match ANYTHING that did not match above
// ============================================
function NotFound() {
  // useNavigate to go back home
  const navigate = useNavigate();

  return (
    <div
      style={{
        fontFamily: "sans-serif",
        padding: "40px",
        textAlign: "center",
        maxWidth: "400px",
        margin: "0 auto",
      }}
    >
      {/* big 404 number */}
      <p
        style={{
          fontSize: "80px",
          fontWeight: "700",
          color: "#e0e0e0",
          margin: "0 0 8px",
          lineHeight: "1",
        }}
      >
        404
      </p>

      {/* error title */}
      <h2 style={{ color: "#1a1a2e", marginBottom: "8px" }}>Page not found</h2>

      {/* error message */}
      <p style={{ color: "#888", fontSize: "14px", marginBottom: "24px" }}>
        The page you are looking for does not exist.
      </p>

      {/* go home button */}
      {/* navigate("/") sends user back to home */}
      <button
        onClick={() => navigate("/")}
        style={{
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
        Go back to Home
      </button>
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
        <Route path="/doctors/:id" element={<DoctorProfile />} />
        <Route path="/booking" element={<Booking />} />

        {/* =============================================
            404 ROUTE — always last
            =============================================
            path="*" matches ANYTHING
            that did not match the routes above
            
            IMPORTANT: always put this LAST
            React Router checks routes top to bottom
            first match wins
            if * was first — it would match everything
            and nobody would ever see other pages
            ============================================= */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
