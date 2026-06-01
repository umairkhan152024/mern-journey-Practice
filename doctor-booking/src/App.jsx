// ============================================
// FILE: src/App.jsx
// GOAL: Practice components and props
// ============================================

// COMPONENT 1 — DoctorCard
// A component is just a function that returns JSX
// This component receives 3 props: name, specialty, fee
// Props are like arguments — we pass data into the component

function DoctorCard({ name, specialty, fee }) {
  return (
    // One root div — JSX must have one root element
    <div
      style={{
        border: "1px solid #dd3c3c",
        borderRadius: "8px",
        padding: "16px",
        marginBottom: "12px",
        fontFamily: "sans-serif",
      }}
    >
      {/* {name} — curly braces show JavaScript value in JSX */}
      <h2 style={{ margin: "0 0 8px", color: "#1a1a2e" }}>{name}</h2>

      {/* {specialty} — reads the specialty prop */}
      <p style={{ margin: "4px 0", color: "#555" }}>{specialty}</p>

      {/* {fee} — reads the fee number prop */}
      <p style={{ margin: "4px 0", fontWeight: "500" }}>Rs. {fee}</p>
    </div>
  );
}

// COMPONENT 2 — App
// App is the parent component
// It uses DoctorCard three times with different props
// Same component — different data — different result

function App() {
  return (
    <div style={{ maxWidth: "500px", margin: "40px auto" }}>
      <h1
        style={{
          color: "#1a1a2e",
          marginBottom: "24px",
          fontFamily: "sans-serif",
        }}
      >
        ZENOVA Clinic
      </h1>

      {/* DoctorCard used 3 times — each with different props */}
      <DoctorCard name="Dr. Ahmed Khan" specialty="Cardiologist" fee={2000} />

      <DoctorCard name="Dr. Sara Malik" specialty="Dentist" fee={1500} />

      <DoctorCard
        name="Dr. Bilal Akhtar"
        specialty="Skin Specialist"
        fee={1800}
      />
    </div>
  );
}

export default App;
