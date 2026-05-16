// ============================================
// FILE: src/components/DoctorCard.jsx
// PURPOSE: Single doctor card component
// ============================================

function DoctorCard({ name, specialty, city, fee, isAvailable }) {
  return (
    // The card container
    // IMPORTANT: No marginBottom here anymore
    // The grid gap in DoctorList handles spacing between cards
    // If we put marginBottom here it fights with the grid layout
    <div
      style={{
        border: "1px solid #e0e0e0",
        borderRadius: "10px",
        padding: "20px",
        backgroundColor: "white",
        fontFamily: "sans-serif",
      }}
    >
      {/* Doctor name */}
      <h2 style={{ margin: "0 0 8px", color: "#1a1a2e", fontSize: "18px" }}>
        {name}
      </h2>

      {/* Specialty */}
      <p style={{ margin: "4px 0", color: "#555", fontSize: "14px" }}>
        Specialty: {specialty}
      </p>

      {/* City */}
      <p style={{ margin: "4px 0", color: "#555", fontSize: "14px" }}>
        City: {city}
      </p>

      {/* Fee */}
      <p style={{ margin: "4px 0", fontSize: "14px", fontWeight: "500" }}>
        Fee: Rs. {fee}
      </p>

      {/* CONDITIONAL RENDERING */}
      {/* If isAvailable is true — show green badge */}
      {/* If isAvailable is false — show red badge */}
      {isAvailable ? (
        <span
          style={{
            display: "inline-block",
            marginTop: "12px",
            padding: "4px 14px",
            background: "#e1f5ee",
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
            marginTop: "12px",
            padding: "4px 14px",
            background: "#fcebeb",
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

export default DoctorCard;
