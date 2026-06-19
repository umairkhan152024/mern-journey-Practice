// ============================================
// FILE: src/App.jsx
// COMBINING Redux + React Query
// ============================================
// React Query → fetches doctors (server data)
// Redux       → tracks favorites (app data)
//
// DoctorCard uses BOTH at the same time
// ============================================

import { useQuery } from "@tanstack/react-query";
import { useSelector, useDispatch } from "react-redux";
import { addFavorite, removeFavorite } from "./favoritesSlice";

// =============================================
// fetch function for React Query
// =============================================
async function fetchDoctors() {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  if (!response.ok) {
    throw new Error("Could not fetch doctors");
  }
  return response.json();
}

// ============================================
// COMPONENT: DoctorCard
// ============================================
// uses Redux for favorites logic
// receives doctor data as props (from React Query)
// ============================================
function DoctorCard({ doctor }) {
  // REDUX — read favorites
  const favorites = useSelector((state) => state.favorites.items);
  const dispatch = useDispatch();

  const isFavorite = favorites.some((item) => item.id === doctor.id);

  return (
    <div
      style={{
        backgroundColor: "white",
        border: isFavorite ? "2px solid #1D9E75" : "1px solid #ddd",
        borderRadius: "8px",
        padding: "16px",
        marginBottom: "12px",
        fontFamily: "sans-serif",
      }}
    >
      <h2 style={{ margin: "0 0 6px", color: "#1a1a2e", fontSize: "16px" }}>
        {doctor.name}
      </h2>
      <p style={{ margin: "4px 0", color: "#555", fontSize: "14px" }}>
        {doctor.email}
      </p>

      {isFavorite ? (
        <button
          onClick={() => dispatch(removeFavorite(doctor.id))}
          style={{
            marginTop: "10px",
            backgroundColor: "#fcebeb",
            color: "#a32d2d",
            border: "none",
            borderRadius: "8px",
            padding: "8px 16px",
            fontSize: "13px",
            cursor: "pointer",
          }}
        >
          ♥ Remove Favorite
        </button>
      ) : (
        <button
          onClick={() => dispatch(addFavorite(doctor))}
          style={{
            marginTop: "10px",
            backgroundColor: "#e1f5ee",
            color: "#0f6e56",
            border: "none",
            borderRadius: "8px",
            padding: "8px 16px",
            fontSize: "13px",
            cursor: "pointer",
          }}
        >
          ♡ Add Favorite
        </button>
      )}
    </div>
  );
}

// ============================================
// COMPONENT: FavoritesCount
// ============================================
// pure Redux — no React Query here
// ============================================
function FavoritesCount() {
  const favorites = useSelector((state) => state.favorites.items);

  return (
    <div
      style={{
        backgroundColor: "#1a1a2e",
        color: "white",
        padding: "16px 24px",
        borderRadius: "8px",
        marginBottom: "24px",
        fontFamily: "sans-serif",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <h1 style={{ margin: 0, fontSize: "18px" }}>ZENOVA Clinic</h1>
      <p style={{ margin: 0, fontSize: "14px", color: "#aaa" }}>
        ♥ {favorites.length} favorites
      </p>
    </div>
  );
}

// ============================================
// COMPONENT: App
// ============================================
function App() {
  // =============================================
  // REACT QUERY — fetch doctors from server
  // =============================================
  const {
    data: doctors,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["doctors"],
    queryFn: fetchDoctors,
  });

  if (isLoading) {
    return (
      <div
        style={{
          maxWidth: "500px",
          margin: "40px auto",
          textAlign: "center",
          fontFamily: "sans-serif",
          color: "#888",
        }}
      >
        <p style={{ fontSize: "18px" }}>Loading doctors...</p>
      </div>
    );
  }

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
          {error.message}
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        maxWidth: "500px",
        margin: "40px auto",
        padding: "0 16px",
      }}
    >
      {/* REDUX component */}
      <FavoritesCount />

      {/* React Query data, mapped through DoctorCard */}
      {/* each DoctorCard uses Redux internally */}
      {doctors.map((doctor) => (
        <DoctorCard key={doctor.id} doctor={doctor} />
      ))}
    </div>
  );
}

export default App;
