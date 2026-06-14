// ============================================
// FILE: src/App.jsx
// ============================================
// This is where we USE Redux
//
// useSelector → open the fridge and LOOK
// useDispatch → write a note to the fridge
// ============================================

// useSelector → READ from store
// useDispatch → CHANGE the store
import { useSelector, useDispatch } from "react-redux";

// import the actions (notes) from favoritesSlice
import { addFavorite, removeFavorite } from "./favoritesSlice";

// doctors data — hardcoded for now
const doctors = [
  { id: 1, name: "Dr. Ahmed Khan", specialty: "Cardiologist" },
  { id: 2, name: "Dr. Sara Malik", specialty: "Dentist" },
  { id: 3, name: "Dr. Bilal Akhtar", specialty: "Skin Specialist" },
];

// ============================================
// COMPONENT: DoctorCard
// ============================================
function DoctorCard({ doctor }) {
  // =============================================
  // useSelector — READ from store
  // =============================================
  // open the fridge
  // look at the favorites shelf
  // get the items array
  // =============================================
  const favorites = useSelector((state) => state.favorites.items);

  // =============================================
  // useDispatch — get dispatch function
  // =============================================
  // dispatch is how we write notes
  // and send them to the store
  // =============================================
  const dispatch = useDispatch();

  // =============================================
  // isFavorite
  // =============================================
  // check if THIS doctor is already in favorites
  // .some() returns true if any item matches
  // =============================================
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
      {/* doctor name */}
      <h2 style={{ margin: "0 0 6px", color: "#1a1a2e", fontSize: "16px" }}>
        {doctor.name}
      </h2>

      {/* specialty */}
      <p style={{ margin: "4px 0", color: "#555", fontSize: "14px" }}>
        {doctor.specialty}
      </p>

      {/* =============================================
          ADD / REMOVE FAVORITE BUTTON
          =============================================
          if already favorite → show Remove button
          if not favorite     → show Add button

          clicking Add:
          dispatch(addFavorite(doctor))
          → sends note to fridge
          → "please add this doctor to favorites"
          → reducer runs
          → items array updated
          → useSelector sees change
          → component re-renders

          clicking Remove:
          dispatch(removeFavorite(doctor.id))
          → sends note to fridge
          → "please remove doctor with this id"
          → reducer filters it out
          ============================================= */}
      {isFavorite ? (
        // already favorite — show remove button
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
        // not favorite — show add button
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
// shows how many favorites in the store
// reads from Redux store using useSelector
// ============================================
function FavoritesCount() {
  // read favorites from store
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

      {/* favorites count from Redux store */}
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
      {/* FavoritesCount reads from Redux */}
      {/* updates automatically when favorites change */}
      <FavoritesCount />

      {/* render all doctor cards */}
      {doctors.map((doctor) => (
        <DoctorCard key={doctor.id} doctor={doctor} />
      ))}
    </div>
  );
}

export default App;
