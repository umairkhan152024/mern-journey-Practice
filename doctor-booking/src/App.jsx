// ============================================
// FILE: src/App.jsx
// STAGE 3 — PIECE 5 OF 5 — FINAL
// ============================================
// COMBINING EVERYTHING:
// 1. useEffect with [] — fetch doctors on load
// 2. loading state — show loading while fetching
// 3. error state — show error if fetch fails
// 4. search state — filter doctors by name
// 5. .map() — render doctor cards from API data
// ============================================

import { useState, useEffect } from "react";

// ============================================
// COMPONENT: DoctorCard
// ============================================
// same as before — receives props and shows card
// now data comes from API not hardcoded array
// ============================================
function DoctorCard({ name, email, phone, city }) {
  return (
    <div
      style={{
        backgroundColor: "white",
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "16px",
        marginBottom: "12px",
      }}
    >
      {/* name from API */}
      <h2 style={{ margin: "0 0 6px", color: "#1a1a2e", fontSize: "16px" }}>
        {name}
      </h2>

      {/* email from API */}
      <p style={{ margin: "4px 0", color: "#555", fontSize: "14px" }}>
        Email: {email}
      </p>

      {/* phone from API */}
      <p style={{ margin: "4px 0", color: "#555", fontSize: "14px" }}>
        Phone: {phone}
      </p>

      {/* city from API — nested inside address object */}
      {/* user.address.city is how we access nested data */}
      <p style={{ margin: "4px 0", color: "#555", fontSize: "14px" }}>
        City: {city}
      </p>
    </div>
  );
}

// ============================================
// COMPONENT: App
// ============================================
function App() {
  // doctors from API — starts empty
  const [doctors, setDoctors] = useState([]);

  // loading state — true while fetching
  const [isLoading, setIsLoading] = useState(true);

  // error state — null means no error
  const [error, setError] = useState(null);

  // search query — filters doctors by name
  const [searchQuery, setSearchQuery] = useState("");

  // =============================================
  // useEffect — fetch doctors ONCE on load
  // =============================================
  // [] means run only once
  // when component first mounts
  // fetches all doctors from API
  // stores them in doctors state
  // =============================================
  useEffect(() => {
    async function fetchDoctors() {
      try {
        // fetch 10 users from fake API
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users",
        );

        // if response is not ok throw error
        // this jumps to catch block
        if (!response.ok) {
          throw new Error("Could not load doctors. Please try again.");
        }

        // convert response to JavaScript array
        const data = await response.json();

        // store in state — React re-renders
        // doctors array now has 10 items
        setDoctors(data);

        // data arrived — hide loading
        setIsLoading(false);
      } catch (err) {
        // something went wrong
        // store error message
        setError(err.message);

        // hide loading — show error instead
        setIsLoading(false);
      }
    }

    // call the function to start fetching
    fetchDoctors();
  }, []);
  // [] — only runs once when app first loads

  // =============================================
  // FILTER DOCTORS BY SEARCH
  // =============================================
  // not a state — derived value
  // recalculates every time searchQuery changes
  // or every time doctors array changes
  // =============================================
  const filteredDoctors = doctors.filter((doctor) =>
    doctor.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  // =============================================
  // RENDER 1 — loading state
  // =============================================
  // isLoading is true — data still coming
  // show loading message
  // =============================================
  if (isLoading) {
    return (
      <div
        style={{
          maxWidth: "500px",
          margin: "40px auto",
          fontFamily: "sans-serif",
          textAlign: "center",
          color: "#888",
        }}
      >
        <p style={{ fontSize: "18px" }}>Loading doctors...</p>
        <p style={{ fontSize: "14px" }}>Please wait</p>
      </div>
    );
  }

  // =============================================
  // RENDER 2 — error state
  // =============================================
  // error is not null — something went wrong
  // show error message
  // =============================================
  if (error) {
    return (
      <div
        style={{
          maxWidth: "500px",
          margin: "40px auto",
          fontFamily: "sans-serif",
          padding: "0 16px",
        }}
      >
        <div
          style={{
            backgroundColor: "#fcebeb",
            border: "1px solid #f0a0a0",
            borderRadius: "8px",
            padding: "24px",
            textAlign: "center",
            color: "#a32d2d",
          }}
        >
          <p style={{ fontSize: "16px", fontWeight: "500", margin: "0 0 8px" }}>
            Something went wrong
          </p>
          <p style={{ fontSize: "14px", margin: 0 }}>{error}</p>
        </div>
      </div>
    );
  }

  // =============================================
  // RENDER 3 — success state
  // =============================================
  // no loading, no error
  // show doctors with search filter
  // =============================================
  return (
    <div
      style={{
        maxWidth: "500px",
        margin: "40px auto",
        fontFamily: "sans-serif",
        padding: "0 16px",
      }}
    >
      {/* HEADER */}
      <h1 style={{ color: "#1a1a2e", marginBottom: "4px" }}>ZENOVA Clinic</h1>
      <p style={{ color: "#888", fontSize: "14px", marginBottom: "24px" }}>
        {doctors.length} doctors loaded from API
      </p>

      {/* SEARCH INPUT */}
      {/* connected to searchQuery state */}
      {/* filters doctors in real time */}
      <input
        type="text"
        placeholder="Search doctor by name..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{
          width: "100%",
          padding: "10px 14px",
          fontSize: "14px",
          border: "1px solid #ddd",
          borderRadius: "8px",
          marginBottom: "8px",
          boxSizing: "border-box",
          outline: "none",
        }}
      />

      {/* results count */}
      <p style={{ color: "#888", fontSize: "13px", marginBottom: "16px" }}>
        Showing {filteredDoctors.length} doctors
      </p>

      {/* DOCTOR LIST */}
      {/* if filteredDoctors has items — show cards */}
      {/* if empty — show no results message */}
      {filteredDoctors.length > 0 ? (
        filteredDoctors.map((doctor) => (
          <DoctorCard
            key={doctor.id}
            name={doctor.name}
            email={doctor.email}
            phone={doctor.phone}
            city={doctor.address.city}
          />
        ))
      ) : (
        <div
          style={{
            textAlign: "center",
            padding: "40px",
            color: "#aaa",
            fontSize: "14px",
            border: "1px solid #ddd",
            borderRadius: "8px",
            backgroundColor: "white",
          }}
        >
          No doctors found for "{searchQuery}"
        </div>
      )}
    </div>
  );
}

export default App;
