// ============================================
// FILE: src/App.jsx
// useMutation — simple example
// ============================================
// useQuery   → runs automatically (GET doctors)
// useMutation → waits for button click (POST appointment)
// ============================================

import { useQuery, useMutation } from "@tanstack/react-query";
import { useState } from "react";

// =============================================
// fetch function for useQuery
// =============================================
async function fetchDoctors() {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  return response.json();
}

// =============================================
// post function for useMutation
// =============================================
async function bookAppointment(appointmentData) {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(appointmentData),
  });
  return response.json();
}

function App() {
  const [name, setName] = useState("");

  // =============================================
  // useQuery — RUNS AUTOMATICALLY
  // =============================================
  // the moment App component loads
  // fetchDoctors runs by itself
  // we don't click anything
  // =============================================
  const { data: doctors, isLoading } = useQuery({
    queryKey: ["doctors"],
    queryFn: fetchDoctors,
  });

  // =============================================
  // useMutation — WAITS for trigger
  // =============================================
  // bookAppointment does NOT run yet
  // it waits until we call mutation.mutate()
  // =============================================
  const mutation = useMutation({
    mutationFn: bookAppointment,
  });

  function handleBook() {
    // =============================================
    // THIS is what TRIGGERS the mutation
    // =============================================
    // mutation.mutate(data)
    // → NOW bookAppointment actually runs
    // =============================================
    mutation.mutate({ patientName: name });
  }

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "40px auto",
        fontFamily: "sans-serif",
        padding: "0 16px",
      }}
    >
      <h1 style={{ color: "#1a1a2e", marginBottom: "16px" }}>
        useQuery vs useMutation
      </h1>

      {/* =============================================
          useQuery part — runs automatically
          ============================================= */}
      <div
        style={{
          backgroundColor: "#e6f1fb",
          border: "1px solid #b5d4f4",
          borderRadius: "8px",
          padding: "16px",
          marginBottom: "24px",
        }}
      >
        <p style={{ margin: "0 0 8px", fontWeight: "500", color: "#185fa5" }}>
          useQuery (automatic)
        </p>
        {isLoading ? (
          <p style={{ margin: 0, fontSize: "14px", color: "#185fa5" }}>
            Loading doctors...
          </p>
        ) : (
          <p style={{ margin: 0, fontSize: "14px", color: "#185fa5" }}>
            {doctors.length} doctors loaded automatically
          </p>
        )}
      </div>

      {/* =============================================
          useMutation part — waits for click
          ============================================= */}
      <div
        style={{
          backgroundColor: "#fbeaf0",
          border: "1px solid #f4c0d1",
          borderRadius: "8px",
          padding: "16px",
        }}
      >
        <p style={{ margin: "0 0 8px", fontWeight: "500", color: "#993556" }}>
          useMutation (waits for click)
        </p>

        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          style={{
            width: "100%",
            padding: "8px 12px",
            fontSize: "13px",
            border: "1px solid #ddd",
            borderRadius: "6px",
            marginBottom: "10px",
            boxSizing: "border-box",
          }}
        />

        {/* clicking THIS triggers the mutation */}
        <button
          onClick={handleBook}
          disabled={mutation.isPending}
          style={{
            width: "100%",
            backgroundColor: "#993556",
            color: "white",
            border: "none",
            borderRadius: "6px",
            padding: "10px",
            fontSize: "13px",
            cursor: "pointer",
          }}
        >
          {mutation.isPending ? "Booking..." : "Click to trigger mutation"}
        </button>

        {mutation.isSuccess && (
          <p style={{ margin: "10px 0 0", fontSize: "13px", color: "#0f6e56" }}>
            ✓ Mutation triggered successfully!
          </p>
        )}
      </div>
    </div>
  );
}

export default App;
