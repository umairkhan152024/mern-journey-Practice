// ============================================
// FILE: src/App.jsx
// REAL APPLICATION — Doctor Cards + Favorites
// ============================================
// Combining everything:
// 1. doctors array — list of doctors
// 2. DoctorCard component — shows one doctor
// 3. useSelector — check if doctor is favorite
// 4. dispatch — add/remove from favorites
// 5. FavoritesCount — shows total count
// ============================================

import { useSelector, useDispatch } from "react-redux";
import { addFavorite, removeFavorite } from "./favoritesSlice";

// doctors data
const doctors = [
  { id: 1, name: "Dr. Ahmed Khan", specialty: "Cardiologist", fee: 2000 },
  { id: 2, name: "Dr. Sara Malik", specialty: "Dentist", fee: 1500 },
  { id: 3, name: "Dr. Bilal Akhtar", specialty: "Skin Specialist", fee: 1800 },
];

// ============================================
// COMPONENT: DoctorCard
// ============================================
function DoctorCard({ doctor }) {
  // READ favorites from store
  const favorites = useSelector((state) => state.favorites.items);

  // get dispatch function
  const dispatch = useDispatch();

  // =============================================
  // isFavorite check
  // =============================================
  // .some() checks if ANY item in favorites
  // has the same id as THIS doctor
  // returns true or false
  // =============================================
  const isFavorite = favorites.some((item) => item.id === doctor.id);

  return (
    <div
      style={{
        backgroundColor: "white",
        // green border if favorite, grey if not
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
        {doctor.specialty}
      </p>
      <p style={{ margin: "4px 0", fontSize: "14px", fontWeight: "500" }}>
        Rs. {doctor.fee}
      </p>

      {/* =============================================
          conditional button based on isFavorite
          ============================================= */}
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
  return (
    <div
      style={{
        maxWidth: "500px",
        margin: "40px auto",
        padding: "0 16px",
      }}
    >
      <FavoritesCount />

      {doctors.map((doctor) => (
        <DoctorCard key={doctor.id} doctor={doctor} />
      ))}
    </div>
  );
}

export default App;
