// ============================================
// FILE: src/App.jsx
// STAGE 5 — PIECE 4 OF 5
// ============================================
// NEW THING: useParams
// ============================================
// URL parameters are dynamic values in the URL
// /doctors/1  → id = 1
// /doctors/2  → id = 2
// /doctors/3  → id = 3
//
// useParams reads these values
// so we can show different content
// based on the URL
// ============================================

import {
  BrowserRouter,
  Routes,
  Route,
  NavLink,
  Link,
  useParams,
} from "react-router-dom";

// doctors data array
// same as before
// each doctor has an id
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
// PAGE: Doctors — shows ALL doctors
// ============================================
// each doctor card has a Link
// clicking it goes to /doctors/1
// or /doctors/2 etc
// ============================================
function Doctors() {
  return (
    <div
      style={{ fontFamily: "sans-serif", padding: "40px", maxWidth: "500px" }}
    >
      <h1 style={{ color: "#1a1a2e", marginBottom: "24px" }}>Our Doctors</h1>

      {/* map through all doctors */}
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

          {/* =============================================
              Link to doctor's own page
              =============================================
              to={`/doctors/${doctor.id}`}
              for doctor with id 1 → /doctors/1
              for doctor with id 2 → /doctors/2
              clicking this shows that doctor's page
              ============================================= */}
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
// PAGE: DoctorProfile — shows ONE doctor
// ============================================
// this page shows when URL is /doctors/1
// or /doctors/2 etc
//
// useParams reads the id from the URL
// we use that id to find the right doctor
// ============================================
function DoctorProfile() {
  // =============================================
  // useParams
  // =============================================
  // reads the dynamic part of the URL
  // Route is defined as /doctors/:id
  // :id is the dynamic part
  //
  // URL is /doctors/1 → id = "1"
  // URL is /doctors/2 → id = "2"
  // URL is /doctors/3 → id = "3"
  //
  // we get { id } from useParams
  // =============================================
  const { id } = useParams();

  // find the doctor whose id matches
  // Number(id) converts "1" string to 1 number
  // because URL params are always strings
  // but our doctor ids are numbers
  const doctor = doctors.find((d) => d.id === Number(id));

  // if doctor not found — show error message
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

  // doctor found — show their profile
  return (
    <div
      style={{ fontFamily: "sans-serif", padding: "40px", maxWidth: "400px" }}
    >
      {/* back button */}
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

      {/* doctor profile card */}
      <div
        style={{
          backgroundColor: "white",
          border: "1px solid #ddd",
          borderRadius: "8px",
          padding: "24px",
        }}
      >
        {/* name */}
        <h1 style={{ margin: "0 0 8px", color: "#1a1a2e" }}>{doctor.name}</h1>

        {/* specialty */}
        <p style={{ margin: "6px 0", color: "#555", fontSize: "15px" }}>
          Specialty: {doctor.specialty}
        </p>

        {/* city */}
        <p style={{ margin: "6px 0", color: "#555", fontSize: "15px" }}>
          City: {doctor.city}
        </p>

        {/* fee */}
        <p style={{ margin: "6px 0", fontSize: "15px", fontWeight: "500" }}>
          Fee: Rs. {doctor.fee}
        </p>

        {/* book button */}
        <Link
          to="/booking"
          style={{
            display: "inline-block",
            marginTop: "16px",
            padding: "10px 24px",
            backgroundColor: "#1D9E75",
            color: "white",
            borderRadius: "8px",
            textDecoration: "none",
            fontSize: "14px",
            fontWeight: "500",
          }}
        >
          Book Appointment
        </Link>
      </div>
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
        <Route path="/booking" element={<Home />} />

        {/* =============================================
            DYNAMIC ROUTE
            =============================================
            :id is a URL parameter
            it matches any value after /doctors/
            /doctors/1 → id = 1
            /doctors/2 → id = 2
            /doctors/99 → id = 99
            
            DoctorProfile reads id with useParams
            finds the right doctor
            shows their profile
            ============================================= */}
        <Route path="/doctors/:id" element={<DoctorProfile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
