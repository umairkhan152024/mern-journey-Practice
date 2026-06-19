// ============================================
// FILE: src/App.jsx
// REDUX — Using it for real
// ============================================
// We will do 3 things:
// 1. READ favorites with useSelector
// 2. ADD a favorite with dispatch
// 3. REMOVE a favorite with dispatch
// ============================================

// useSelector → READ from store
// useDispatch → get the dispatch function
import { useSelector, useDispatch } from "react-redux";

// import the actions (request slips)
import { addFavorite, removeFavorite } from "./favoritesSlice";

function App() {
  // =============================================
  // READ favorites from store
  // =============================================
  const favorites = useSelector((state) => state.favorites.items);

  // =============================================
  // get dispatch function
  // =============================================
  // dispatch is how we send request slips
  // =============================================
  const dispatch = useDispatch();

  // a sample doctor to add
  const sampleDoctor = {
    id: 1,
    name: "Dr. Ahmed Khan",
    specialty: "Cardiologist",
  };

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "40px auto",
        fontFamily: "sans-serif",
        padding: "0 16px",
      }}
    >
      <h1 style={{ color: "#1a1a2e", marginBottom: "24px" }}>
        Redux in Action
      </h1>

      {/* =============================================
          ADD BUTTON
          =============================================
          dispatch(addFavorite(sampleDoctor))
          → sends a request slip
          → "please add this doctor"
          → reducer adds it to items array
          → useSelector sees the change
          → component re-renders
          ============================================= */}
      <button
        onClick={() => dispatch(addFavorite(sampleDoctor))}
        style={{
          width: "100%",
          backgroundColor: "#1D9E75",
          color: "white",
          border: "none",
          borderRadius: "8px",
          padding: "12px",
          fontSize: "14px",
          cursor: "pointer",
          marginBottom: "12px",
        }}
      >
        Add Dr. Ahmed to Favorites
      </button>

      {/* =============================================
          REMOVE BUTTON
          =============================================
          dispatch(removeFavorite(1))
          → sends a request slip
          → "please remove doctor with id 1"
          → reducer filters it out
          ============================================= */}
      <button
        onClick={() => dispatch(removeFavorite(1))}
        style={{
          width: "100%",
          backgroundColor: "#a32d2d",
          color: "white",
          border: "none",
          borderRadius: "8px",
          padding: "12px",
          fontSize: "14px",
          cursor: "pointer",
          marginBottom: "24px",
        }}
      >
        Remove Dr. Ahmed from Favorites
      </button>

      {/* SHOW CURRENT FAVORITES */}
      <div
        style={{
          backgroundColor: "#e1f5ee",
          border: "1px solid #9fe1cb",
          borderRadius: "8px",
          padding: "16px",
        }}
      >
        <p style={{ margin: "0 0 8px", color: "#0f6e56", fontSize: "14px" }}>
          Favorites count: {favorites.length}
        </p>

        {favorites.map((doctor) => (
          <p
            key={doctor.id}
            style={{ margin: "4px 0", color: "#0f6e56", fontSize: "13px" }}
          >
            {doctor.name} — {doctor.specialty}
          </p>
        ))}
      </div>
    </div>
  );
}

export default App;
