// ============================================
// FILE: src/App.jsx
// NEW CONCEPT: Conditional rendering
// We added one new prop: isAvailable (true/false)
// Based on that we show green or red badge
// ============================================

function DoctorCard({ name, specialty, fee, isAvailable }) {
  // isAvailable is a boolean — true or false
  // We use it to show different badge colors

  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "16px",
        marginBottom: "12px",
        fontFamily: "sans-serif",
      }}
    >
      {/* Doctor name */}
      <h2 style={{ margin: "0 0 8px", color: "#1a1a2e" }}>{name}</h2>

      {/* Specialty */}
      <p style={{ margin: "4px 0", color: "#555" }}>{specialty}</p>

      {/* Fee */}
      <p style={{ margin: "4px 0", fontWeight: "500" }}>Rs. {fee}</p>

      {/* =============================================
          CONDITIONAL RENDERING
          isAvailable ? show this : show that
          if isAvailable is true  → green badge
          if isAvailable is false → red badge
          ============================================= */}
      {isAvailable ? (
        // true — show green badge
        <span
          style={{
            display: "inline-block",
            marginTop: "10px",
            padding: "4px 12px",
            backgroundColor: "#e1f5ee", // light green
            color: "#0f6e56", // dark green text
            borderRadius: "20px",
            fontSize: "13px",
            fontWeight: "500",
          }}
        >
          Available Today
        </span>
      ) : (
        // false — show red badge
        <span
          style={{
            display: "inline-block",
            marginTop: "10px",
            padding: "4px 12px",
            backgroundColor: "#fcebeb", // light red
            color: "#a32d2d", // dark red text
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

      {/* isAvailable={true}  → green badge */}
      <DoctorCard
        name="Dr. Ahmed Khan"
        specialty="Cardiologist"
        fee={2000}
        isAvailable={true}
      />

      {/* isAvailable={false} → red badge */}
      <DoctorCard
        name="Dr. Sara Malik"
        specialty="Dentist"
        fee={1500}
        isAvailable={false}
      />

      {/* isAvailable={true}  → green badge */}
      <DoctorCard
        name="Dr. Bilal Akhtar"
        specialty="Skin Specialist"
        fee={1800}
        isAvailable={true}
      />
    </div>
  );
}

export default App;
