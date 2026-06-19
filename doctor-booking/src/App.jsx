// ============================================
// FILE: src/App.jsx
// REACT QUERY — useQuery
// ============================================
// COMPARE:
//
// OLD WAY (useEffect):
//   const [doctors, setDoctors] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);
//   useEffect(() => { fetch... }, []);
//   → 10+ lines of code
//
// NEW WAY (React Query):
//   const { data, isLoading, error } = useQuery({...});
//   → 4 lines of code
//   → PLUS automatic caching
// ============================================

// useQuery — the main React Query hook
import { useQuery } from "@tanstack/react-query";

// =============================================
// FETCH FUNCTION
// =============================================
// React Query calls this automatically
// we just describe HOW to fetch
// =============================================
async function fetchDoctors() {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");

  if (!response.ok) {
    throw new Error("Could not fetch doctors");
  }

  return response.json();
}

function App() {
  // =============================================
  // useQuery — THE MAIN CONCEPT
  // =============================================
  // queryKey: ["doctors"]
  //   → cache label for this data
  //   → React Query remembers data under this key
  //
  // queryFn: fetchDoctors
  //   → the function that does the actual fetching
  //   → React Query calls it automatically
  //
  // Returns automatically:
  //   data      → the fetched doctors
  //   isLoading → true while fetching
  //   error     → not null if something failed
  // =============================================
  const { data, isLoading, error } = useQuery({
    queryKey: ["doctors"],
    queryFn: fetchDoctors,
  });

  // LOADING
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

  // ERROR
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
          <p style={{ fontWeight: "500", margin: "0 0 8px" }}>
            Something went wrong
          </p>
          <p style={{ fontSize: "14px", margin: 0 }}>{error.message}</p>
        </div>
      </div>
    );
  }

  // SUCCESS
  return (
    <div
      style={{
        maxWidth: "500px",
        margin: "40px auto",
        padding: "0 16px",
        fontFamily: "sans-serif",
      }}
    >
      <h1 style={{ color: "#1a1a2e", marginBottom: "16px" }}>ZENOVA Clinic</h1>

      {data.map((doctor) => (
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
            {doctor.email}
          </p>
        </div>
      ))}
    </div>
  );
}

export default App;
