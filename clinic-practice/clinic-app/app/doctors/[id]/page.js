// ============================================
// FILE: app/doctors/[id]/page.js
// ============================================

import Link from "next/link";

const doctors = [
  { id: 1, name: "Dr. Ahmed Khan", specialty: "Cardiologist", fee: 2000 },
  { id: 2, name: "Dr. Sara Malik", specialty: "Dentist", fee: 1500 },
  { id: 3, name: "Dr. Bilal Akhtar", specialty: "Skin Specialist", fee: 1800 },
];

export default function DoctorProfile({ params }) {
  const doctor = doctors.find((d) => d.id === Number(params.id));

  if (!doctor) {
    return (
      <div style={{ padding: "40px", fontFamily: "sans-serif" }}>
        <h2 style={{ color: "#a32d2d" }}>Doctor not found</h2>
        <Link href="/doctors" style={{ color: "#1a1a2e" }}>
          Back to doctors
        </Link>
      </div>
    );
  }

  return (
    <div style={{ padding: "40px", fontFamily: "sans-serif" }}>
      <Link
        href="/doctors"
        style={{
          color: "#555",
          textDecoration: "none",
          fontSize: "14px",
          display: "inline-block",
          marginBottom: "24px",
        }}
      >
        Back to all doctors
      </Link>

      <div
        style={{
          backgroundColor: "white",
          border: "1px solid #ddd",
          borderRadius: "8px",
          padding: "24px",
          maxWidth: "400px",
        }}
      >
        <h1 style={{ margin: "0 0 8px", color: "#1a1a2e" }}>{doctor.name}</h1>
        <p style={{ margin: "6px 0", color: "#555", fontSize: "15px" }}>
          Specialty: {doctor.specialty}
        </p>
        <p style={{ margin: "6px 0", fontSize: "15px", fontWeight: "500" }}>
          Fee: Rs. {doctor.fee}
        </p>
      </div>
    </div>
  );
}
