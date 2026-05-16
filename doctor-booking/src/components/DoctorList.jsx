// ============================================
// FILE: src/components/DoctorList.jsx
// PURPOSE: Shows all doctor cards in a grid
// ============================================

import DoctorCard from "./DoctorCard";

function DoctorList() {
  return (
    // Outer wrapper — full width, padding on all sides
    <div
      style={{
        width: "100%",
        boxSizing: "border-box",
        padding: "40px",
        fontFamily: "sans-serif",
        backgroundColor: "#f5f5f5",
      }}
    >
      {/* Section title */}
      <h2 style={{ marginBottom: "24px", color: "#1a1a2e" }}>Our Doctors</h2>

      {/* ========================= */}
      {/* CSS GRID CONTAINER        */}
      {/* ========================= */}
      {/* This is the key part      */}
      {/* display grid activates CSS grid layout */}
      {/* gridTemplateColumns: repeat(3, 1fr) */}
      {/*   repeat = repeat the pattern */}
      {/*   3 = three times */}
      {/*   1fr = one equal fraction of width */}
      {/*   Result: 3 equal columns side by side */}
      {/* gap: 24px = space between each card */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "24px",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        {/* Card 1 — isAvailable true = green */}
        <DoctorCard
          name="Dr. Ahmed Khan"
          specialty="Cardiologist"
          city="Islamabad"
          fee={2000}
          isAvailable={true}
        />

        {/* Card 2 — isAvailable false = red */}
        <DoctorCard
          name="Dr. Sara Malik"
          specialty="Dentist"
          city="Rawalpindi"
          fee={1500}
          isAvailable={false}
        />

        {/* Card 3 — isAvailable true = green */}
        <DoctorCard
          name="Dr. Bilal Akhtar"
          specialty="Skin Specialist"
          city="Islamabad"
          fee={1800}
          isAvailable={true}
        />
      </div>
      {/* End of grid */}
    </div>
  );
}

export default DoctorList;
