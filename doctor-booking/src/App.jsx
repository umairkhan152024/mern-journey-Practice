// ============================================
// FILE: src/App.jsx
// NEW CONCEPT: useState hook
// ============================================
// WHAT IS A HOOK?
// A hook is a special React function
// All hooks start with the word "use"
// useState is the most basic and important hook
// It lets us store data that can change over time
// When that data changes, React re-renders
// the component and updates the screen
// ============================================

// IMPORT useState
// useState is not available automatically
// We must import it from the react package
// This is how we tell React: I want to use useState
import { useState } from "react";

// ============================================
// COMPONENT: DoctorCard
// No changes here — same as before
// ============================================
function DoctorCard({ name, specialty, fee, isAvailable }) {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "16px",
        marginBottom: "12px",
        fontFamily: "sans-serif",
        backgroundColor: "white",
      }}
    >
      <h2 style={{ margin: "0 0 8px", color: "#1a1a2e", fontSize: "18px" }}>
        {name}
      </h2>
      <p style={{ margin: "4px 0", color: "#555", fontSize: "14px" }}>
        Specialty: {specialty}
      </p>
      <p style={{ margin: "4px 0", fontSize: "14px", fontWeight: "500" }}>
        Fee: Rs. {fee}
      </p>
      {isAvailable ? (
        <span
          style={{
            display: "inline-block",
            marginTop: "10px",
            padding: "4px 12px",
            backgroundColor: "#e1f5ee",
            color: "#0f6e56",
            borderRadius: "20px",
            fontSize: "13px",
            fontWeight: "500",
          }}
        >
          Available Today
        </span>
      ) : (
        <span
          style={{
            display: "inline-block",
            marginTop: "10px",
            padding: "4px 12px",
            backgroundColor: "#fcebeb",
            color: "#a32d2d",
            borderRadius: "20px",
            fontSize: "13px",
            fontWeight: "500",
          }}
        >
          Not Available
        </span>
      )}
    </div>
  );
}

// ============================================
// COMPONENT: App
// ============================================
function App() {
  // =============================================
  // STATE 1 — counter
  // =============================================
  // const [count, setCount] = useState(0)
  //
  // count    → the current value, starts at 0
  // setCount → the function to update count
  // useState(0) → initial value is 0
  //
  // When we call setCount(newValue):
  //   1. React updates count to newValue
  //   2. React re-renders this component
  //   3. Screen shows the new value
  // =============================================
  const [count, setCount] = useState(0);

  // =============================================
  // STATE 2 — search query
  // =============================================
  // searchQuery → what user types in search box
  // setSearchQuery → updates the search text
  // useState("") → starts as empty string
  // =============================================
  const [searchQuery, setSearchQuery] = useState("");

  // =============================================
  // DOCTORS DATA — same array as before
  // =============================================
  const doctors = [
    {
      id: 1,
      name: "Dr. Ahmed Khan",
      specialty: "Cardiologist",
      fee: 2000,
      isAvailable: true,
    },
    {
      id: 2,
      name: "Dr. Sara Malik",
      specialty: "Dentist",
      fee: 1500,
      isAvailable: false,
    },
    {
      id: 3,
      name: "Dr. Bilal Akhtar",
      specialty: "Skin Specialist",
      fee: 1800,
      isAvailable: true,
    },
    {
      id: 4,
      name: "Dr. Fatima Noor",
      specialty: "Gynecologist",
      fee: 2500,
      isAvailable: true,
    },
    {
      id: 5,
      name: "Dr. Usman Ali",
      specialty: "Neurologist",
      fee: 3000,
      isAvailable: false,
    },
  ];

  // =============================================
  // FILTERED DOCTORS
  // =============================================
  // This is NOT state — it is a derived value
  // It is calculated from existing state
  //
  // filter() goes through every doctor
  // and keeps only the ones where
  // doctor.name includes the searchQuery text
  //
  // toLowerCase() makes search case-insensitive
  // so typing "ahmed" finds "Dr. Ahmed Khan"
  //
  // Every time searchQuery state changes
  // React re-renders App
  // filteredDoctors recalculates automatically
  // the list on screen updates instantly
  // =============================================
  const filteredDoctors = doctors.filter((doctor) =>
    doctor.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div
      style={{
        maxWidth: "500px",
        margin: "40px auto",
        padding: "0 16px",
        fontFamily: "sans-serif",
      }}
    >
      {/* PAGE TITLE */}
      <h1 style={{ color: "#1a1a2e", marginBottom: "24px" }}>ZENOVA Clinic</h1>

      {/* =============================================
          COUNTER SECTION
          =============================================
          This shows how useState works with a button

          count → current value from state
          {count} shows it on screen

          onClick={()=> setCount(count + 1)}
          when button is clicked:
            setCount runs
            count increases by 1
            React re-renders
            screen shows new number
          ============================================= */}
      <div
        style={{
          backgroundColor: "white",
          border: "1px solid #ddd",
          borderRadius: "8px",
          padding: "16px",
          marginBottom: "24px",
          textAlign: "center",
        }}
      >
        {/* Label */}
        <p style={{ color: "#555", marginBottom: "8px", fontSize: "14px" }}>
          Total Appointments Booked
        </p>

        {/* COUNT VALUE */}
        {/* {count} reads from state */}
        {/* every time setCount is called */}
        {/* this number updates on screen */}
        <p
          style={{
            fontSize: "48px",
            fontWeight: "700",
            color: "#1D9E75",
            margin: "0 0 16px",
          }}
        >
          {count}
        </p>

        {/* BUTTON */}
        {/* onClick — event that fires when button is clicked */}
        {/* () => setCount(count + 1) */}
        {/*   () =>  this is an arrow function */}
        {/*   setCount(count + 1) runs when clicked */}
        {/*   count + 1 means current value plus one */}
        <button
          onClick={() => setCount(count + 1)}
          style={{
            backgroundColor: "#1a1a2e",
            color: "white",
            border: "none",
            borderRadius: "8px",
            padding: "10px 24px",
            fontSize: "14px",
            cursor: "pointer",
            fontWeight: "500",
          }}
        >
          Book Appointment
        </button>
      </div>
      {/* end of counter section */}

      {/* =============================================
          SEARCH INPUT
          =============================================
          This is a CONTROLLED INPUT
          It means React state controls the input value

          value={searchQuery}
          → the input always shows what is in state
          → state is the single source of truth

          onChange={(e) => setSearchQuery(e.target.value)}
          → e is the event object React passes automatically
          → e.target is the input element
          → e.target.value is what the user typed
          → setSearchQuery updates state with new text
          → React re-renders
          → filteredDoctors recalculates
          → list updates on screen
          ============================================= */}
      <input
        type="text"
        placeholder="Search doctor by name..."
        // value connects input to state
        // input always shows what searchQuery contains
        value={searchQuery}
        // onChange fires on every single keystroke
        // e.target.value = the current text in the input
        // setSearchQuery updates state with that text
        onChange={(e) => setSearchQuery(e.target.value)}
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

      {/* HOW MANY RESULTS */}
      {/* filteredDoctors.length counts matching doctors */}
      <p style={{ color: "#888", fontSize: "13px", marginBottom: "16px" }}>
        Showing {filteredDoctors.length} doctors
      </p>

      {/* =============================================
          RENDER FILTERED LIST
          =============================================
          filteredDoctors.length > 0
          means: are there any matching doctors?

          if yes → show the cards with .map()
          if no  → show "no results" message

          this updates in real time as user types
          ============================================= */}
      {filteredDoctors.length > 0 ? (
        // There are results — show cards
        filteredDoctors.map((doctor) => (
          <DoctorCard
            key={doctor.id}
            name={doctor.name}
            specialty={doctor.specialty}
            fee={doctor.fee}
            isAvailable={doctor.isAvailable}
          />
        ))
      ) : (
        // No results found
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
