// ════════════════════════════════════════════════════════════
//  CUSTOM HOOK — useFetchMovies
//  Purpose: handles ALL movie fetching logic
//  Returns: movies, loading, error, fetchMovies
//  Home.jsx uses this hook — keeps Home.jsx clean (UI only)
// ════════════════════════════════════════════════════════════

// ─── 1. IMPORTS ─────────────────────────────────────────────
// We can use hooks inside custom hooks!
import { useState, useEffect } from "react";

// ─── 2. API KEY ──────────────────────────────────────────────
const API_KEY = import.meta.env.VITE_API_KEY;

// ─── 3. CUSTOM HOOK ─────────────────────────────────────────
// Starts with "use" → this is the rule for custom hooks
// Accepts defaultQuery → what to search on page load
function useFetchMovies(defaultQuery = "Marvel") {
  // ─── 4. STATES ──────────────────────────────────────────
  // Same states as before — but now they live HERE not in Home.jsx
  const [movies, setMovies] = useState([]); // movies from API
  const [loading, setLoading] = useState(false); // loading state
  const [error, setError] = useState(""); // error message

  // ─── 5. FETCH MOVIES FUNCTION ───────────────────────────
  // All fetching logic lives here — Home.jsx stays clean
  const fetchMovies = async (query) => {
    setLoading(true); // 5a. show loading
    setError(""); // 5b. clear error

    try {
      // 5c. Send request to OMDB API
      const response = await fetch(
        `https://www.omdbapi.com/?s=${query}&apikey=${API_KEY}`,
      );

      // 5d. Convert to JavaScript object
      const data = await response.json();

      // 5e. Save movies or show error
      if (data.Response === "True") {
        setMovies(data.Search); // save movies → UI updates
      } else {
        setError("No movies found!");
      }
    } catch {
      // 5f. Network error
      setError("Something went wrong!");
    }

    setLoading(false); // 5g. hide loading
  };

  // ─── 6. RUN ON PAGE LOAD ────────────────────────────────
  // Load default movies when hook is first used
  useEffect(() => {
    fetchMovies(defaultQuery);
  }, []);

  // ─── 7. RETURN ──────────────────────────────────────────
  // Return everything Home.jsx needs
  // Home.jsx will destructure these values
  return { movies, loading, error, fetchMovies };
}
// ── END OF CUSTOM HOOK ───────────────────────────────────────

// ─── 8. EXPORT ──────────────────────────────────────────────
export default useFetchMovies;
