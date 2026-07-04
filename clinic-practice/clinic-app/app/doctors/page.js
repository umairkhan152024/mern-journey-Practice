// ============================================
// FILE: app/doctors/page.js
// ============================================

import Link from "next/link";

const doctors = [
  { id: 1, name: "Dr. Ahmed Khan", specialty: "Cardiologist" },
  { id: 2, name: "Dr. Sara Malik", specialty: "Dentist" },
  { id: 3, name: "Dr. Bilal Akhtar", specialty: "Skin Specialist" },
];

export default function Doctors() {
  return (
    <div style={{ padding: "40px", fontFamily: "sans-serif" }}>
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

          {/* =============================================
              Link to dynamic route
              =============================================
              doctor.id = 1 → href="/doctors/1"
              doctor.id = 2 → href="/doctors/2"
              ============================================= */}
          <Link
            href={`/doctors/${doctor.id}`}
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
