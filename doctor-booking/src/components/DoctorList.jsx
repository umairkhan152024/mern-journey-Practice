// ============================================
// FILE: src/components/DoctorList.jsx
// PURPOSE: Shows doctors in a grid
// NOW has a search bar that filters by name
// This teaches useState with text input
// ============================================

import { useState } from "react";
import DoctorCard from "./DoctorCard";

function DoctorList() {
  // =============================================
  // STATE — search query
  // searchQuery holds whatever the user is typing
  // starts as empty string ""
  // every keystroke updates this state
  // =============================================
  const [searchQuery, setSearchQuery] = useState("");

  // =============================================
  // DOCTORS DATA ARRAY
  // We move the doctors into an array of objects
  // This is much better than hardcoding each card
  // Now we can filter, sort, and map over them
  // =============================================
  const doctors = [
    {
      id: 1,
      name: "Dr. Ahmed Khan",
      specialty: "Cardiologist",
      city: "Islamabad",
      fee: 2000,
      isAvailable: true,
    },
    {
      id: 2,
      name: "Dr. Sara Malik",
      specialty: "Dentist",
      city: "Rawalpindi",
      fee: 1500,
      isAvailable: false,
    },
    {
      id: 3,
      name: "Dr. Bilal Akhtar",
      specialty: "Skin Specialist",
      city: "Islamabad",
      fee: 1800,
      isAvailable: true,
    },
    {
      id: 4,
      name: "Dr. Fatima Noor",
      specialty: "Gynecologist",
      city: "Islamabad",
      fee: 2500,
      isAvailable: true,
    },
    {
      id: 5,
      name: "Dr. Usman Ali",
      specialty: "Neurologist",
      city: "Rawalpindi",
      fee: 3000,
      isAvailable: false,
    },
    {
      id: 6,
      name: "Dr. Ayesha Tariq",
      specialty: "Pediatrician",
      city: "Islamabad",
      fee: 1200,
      isAvailable: true,
    },
  ];

  // =============================================
  // FILTERING LOGIC
  // filter() goes through every doctor in the array
  // For each doctor, it checks:
  // does doctor.name include the searchQuery text?
  // toLowerCase() makes the search case-insensitive
  // so "ahmed" finds "Dr. Ahmed Khan"
  // filteredDoctors is a new array with only matches
  // =============================================
  const filteredDoctors = doctors.filter((doctor) =>
    doctor.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div
      style={{
        width: "100%",
        boxSizing: "border-box",
        fontFamily: "sans-serif",
      }}
    >
      {/* Section title */}
      <h2 style={{ marginBottom: "20px", color: "#1a1a2e" }}>Our Doctors</h2>

      {/* ========================= */}
      {/* SEARCH BAR                */}
      {/* ========================= */}

      {/* This is a CONTROLLED INPUT */}
      {/* value={searchQuery} — the input shows what's in state */}
      {/* onChange — fires every time user types a character */}
      {/* e is the event object — e.target.value is what was typed */}
      {/* setSearchQuery updates state with the new typed value */}
      {/* React re-renders → filteredDoctors recalculates → grid updates */}
      {/* This all happens instantly on every keystroke */}
      <input
        type="text"
        placeholder="Search doctor by name..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{
          width: "100%",
          padding: "12px 16px",
          fontSize: "15px",
          border: "1px solid #e0e0e0",
          borderRadius: "8px",
          marginBottom: "24px",
          boxSizing: "border-box",
          outline: "none",
        }}
      />

      {/* ========================= */}
      {/* RESULTS COUNT             */}
      {/* ========================= */}

      {/* Shows how many doctors match the search */}
      {/* Updates in real time as you type */}
      <p style={{ marginBottom: "16px", color: "#888", fontSize: "14px" }}>
        Showing {filteredDoctors.length} doctor
        {filteredDoctors.length !== 1 ? "s" : ""}
      </p>

      {/* ========================= */}
      {/* DOCTOR GRID               */}
      {/* ========================= */}

      {/* filteredDoctors.length > 0 checks if any results exist */}
      {/* If yes — show the grid */}
      {/* If no — show "No doctors found" message */}
      {filteredDoctors.length > 0 ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "24px",
            width: "100%",
          }}
        >
          {/* ========================= */}
          {/* .map() — renders the list */}
          {/* ========================= */}

          {/* map() goes through every item in filteredDoctors */}
          {/* For each doctor object, it returns a DoctorCard */}
          {/* key={doctor.id} — React needs a unique key for lists */}
          {/* We spread the doctor object as props using {...doctor} */}
          {/* {...doctor} is shorthand for: */}
          {/* name={doctor.name} specialty={doctor.specialty} etc */}
          {filteredDoctors.map((doctor) => (
            <DoctorCard
              key={doctor.id}
              name={doctor.name}
              specialty={doctor.specialty}
              city={doctor.city}
              fee={doctor.fee}
              isAvailable={doctor.isAvailable}
            />
          ))}
        </div>
      ) : (
        // No results found message
        <div
          style={{
            textAlign: "center",
            padding: "40px",
            color: "#aaa",
            fontSize: "15px",
          }}
        >
          No doctors found for "{searchQuery}"
        </div>
      )}
    </div>
  );
}

export default DoctorList;
