// ============================================
// FILE: src/App.jsx
// STAGE 4 — PIECE 4 OF 4 — FINAL
// ============================================
// REAL WORLD USE CASE:
// Logged in user stored in Context
// Any component reads it directly
//
// FLOW:
// User clicks Login → user state updates
// → Context updates
// → Header shows user name
// → DoctorCard shows "Book as Umair"
// → Footer shows user email
//
// User clicks Logout → user state = null
// → Context updates
// → everything shows "not logged in"
// ============================================

import { createContext, useContext, useState } from "react";

// create the noticeboard
const UserContext = createContext();

// ============================================
// COMPONENT: Header
// ============================================
function Header() {
  // read user and logout function from Context
  const { user, logout } = useContext(UserContext);

  return (
    <div
      style={{
        backgroundColor: "#1a1a2e",
        color: "white",
        padding: "16px 20px",
        borderRadius: "8px",
        marginBottom: "16px",
        fontFamily: "sans-serif",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <h1 style={{ margin: 0, fontSize: "18px" }}>ZENOVA Clinic</h1>

      {/* =============================================
          CONDITIONAL RENDERING WITH CONTEXT
          if user is not null — show name and logout
          if user is null — show "not logged in"
          ============================================= */}
      {user ? (
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          {/* user.name from Context */}
          <p style={{ margin: 0, color: "#aaa", fontSize: "13px" }}>
            {user.name}
          </p>

          {/* logout button — calls logout from Context */}
          <button
            onClick={logout}
            style={{
              backgroundColor: "transparent",
              color: "#aaa",
              border: "1px solid #aaa",
              borderRadius: "6px",
              padding: "4px 12px",
              fontSize: "12px",
              cursor: "pointer",
            }}
          >
            Logout
          </button>
        </div>
      ) : (
        <p style={{ margin: 0, color: "#aaa", fontSize: "13px" }}>
          Not logged in
        </p>
      )}
    </div>
  );
}

// ============================================
// COMPONENT: DoctorCard
// ============================================
function DoctorCard({ name, specialty, fee }) {
  // read user from Context
  const { user } = useContext(UserContext);

  return (
    <div
      style={{
        backgroundColor: "white",
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "16px",
        marginBottom: "12px",
        fontFamily: "sans-serif",
      }}
    >
      <h2 style={{ margin: "0 0 6px", color: "#1a1a2e", fontSize: "16px" }}>
        {name}
      </h2>
      <p style={{ margin: "4px 0", color: "#555", fontSize: "14px" }}>
        {specialty}
      </p>
      <p style={{ margin: "4px 0", fontSize: "14px", fontWeight: "500" }}>
        Rs. {fee}
      </p>

      {/* =============================================
          if user is logged in — show Book button
          if not logged in — show Login required
          ============================================= */}
      {user ? (
        <button
          style={{
            marginTop: "12px",
            backgroundColor: "#1a1a2e",
            color: "white",
            border: "none",
            borderRadius: "8px",
            padding: "8px 16px",
            fontSize: "13px",
            cursor: "pointer",
          }}
        >
          {/* user.name from Context — no props needed */}
          Book as {user.name}
        </button>
      ) : (
        <p
          style={{
            marginTop: "12px",
            color: "#a32d2d",
            fontSize: "13px",
          }}
        >
          Please login to book
        </p>
      )}
    </div>
  );
}

// ============================================
// COMPONENT: DoctorList
// ============================================
function DoctorList() {
  const doctors = [
    { id: 1, name: "Dr. Ahmed Khan", specialty: "Cardiologist", fee: 2000 },
    { id: 2, name: "Dr. Sara Malik", specialty: "Dentist", fee: 1500 },
    {
      id: 3,
      name: "Dr. Bilal Akhtar",
      specialty: "Skin Specialist",
      fee: 1800,
    },
  ];

  return (
    <div>
      {doctors.map((doctor) => (
        <DoctorCard
          key={doctor.id}
          name={doctor.name}
          specialty={doctor.specialty}
          fee={doctor.fee}
        />
      ))}
    </div>
  );
}

// ============================================
// COMPONENT: Footer
// ============================================
function Footer() {
  // read user from Context
  const { user } = useContext(UserContext);

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
      {/* if logged in show email — if not show message */}
      {user ? (
        <p style={{ margin: 0 }}>Logged in as {user.email}</p>
      ) : (
        <p style={{ margin: 0 }}>Please login to access all features</p>
      )}
    </div>
  );
}

// ============================================
// COMPONENT: LoginForm
// ============================================
// shows when user is NOT logged in
// calls login function from Context
// ============================================
function LoginForm() {
  // read login function from Context
  const { login } = useContext(UserContext);

  return (
    <div
      style={{
        backgroundColor: "white",
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "24px",
        marginBottom: "16px",
        fontFamily: "sans-serif",
        textAlign: "center",
      }}
    >
      <h2 style={{ color: "#1a1a2e", marginBottom: "16px" }}>
        Login to ZENOVA
      </h2>

      {/* clicking this calls login from Context */}
      {/* sets user state in App */}
      {/* every component updates */}
      <button
        onClick={login}
        style={{
          backgroundColor: "#1D9E75",
          color: "white",
          border: "none",
          borderRadius: "8px",
          padding: "12px 28px",
          fontSize: "14px",
          cursor: "pointer",
          fontWeight: "500",
        }}
      >
        Login as Umair Khan
      </button>
    </div>
  );
}

// ============================================
// COMPONENT: App — THE PRINCIPAL
// ============================================
function App() {
  // =============================================
  // USER STATE
  // =============================================
  // null = not logged in
  // object = logged in user data
  // starts as null — nobody logged in
  // =============================================
  const [user, setUser] = useState(null);

  // =============================================
  // LOGIN FUNCTION
  // =============================================
  // sets user state to a user object
  // Context updates → all components update
  // =============================================
  function login() {
    setUser({
      name: "Umair Khan",
      email: "umair@zenova.com",
      role: "Admin",
    });
  }

  // =============================================
  // LOGOUT FUNCTION
  // =============================================
  // sets user state back to null
  // Context updates → all components update
  // =============================================
  function logout() {
    setUser(null);
  }

  return (
    <div
      style={{
        maxWidth: "500px",
        margin: "40px auto",
        padding: "0 16px",
      }}
    >
      {/* =============================================
          PROVIDER
          =============================================
          sharing 3 things through Context:
          1. user       → the logged in user object
          2. login      → function to log in
          3. logout     → function to log out
          
          any component inside can read all 3
          ============================================= */}
      <UserContext.Provider value={{ user, login, logout }}>
        {/* Header — shows user name and logout button */}
        <Header />

        {/* show LoginForm if not logged in */}
        {/* show DoctorList if logged in */}
        {user ? <DoctorList /> : <LoginForm />}

        {/* Footer — shows user email */}
        <Footer />
      </UserContext.Provider>
    </div>
  );
}

export default App;
