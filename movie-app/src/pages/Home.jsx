// ════════════════════════════════════════════════════════════
//  HOME PAGE — Main movie search page
//  Contains: search input, movies grid, loading, error states
// ════════════════════════════════════════════════════════════

// ─── 1. IMPORTS ─────────────────────────────────────────────
import { useState, useEffect, useRef } from "react";

// ─── 2. API KEY ──────────────────────────────────────────────
// Reads API key from .env file — never hardcode keys!
const API_KEY = import.meta.env.VITE_API_KEY;

// ─── 3. HOME COMPONENT ──────────────────────────────────────
function Home() {
  // ─── 4. STATES ──────────────────────────────────────────
  const [search, setSearch] = useState(""); // what user types
  const [movies, setMovies] = useState([]); // movies from API
  const [loading, setLoading] = useState(false); // show/hide loading
  const [error, setError] = useState(""); // show/hide error

  // ─── 5. REF ─────────────────────────────────────────────
  // Remote control for the search input element
  // We use it to auto focus and keep focus after search
  const searchRef = useRef(null);

  // ─── 6. FETCH MOVIES ────────────────────────────────────
  // Sends request to OMDB API and saves movies in state
  // async → because we use await inside
  const fetchMovies = async (query) => {
    setLoading(true); // 6a. show loading text
    setError(""); // 6b. clear previous error

    try {
      // 6c. Send request to OMDB API with search query and key
      const response = await fetch(
        `https://www.omdbapi.com/?s=${query}&apikey=${API_KEY}`,
      );

      // 6d. Convert response to JavaScript object
      const data = await response.json();

      // 6e. Check if movies were found
      if (data.Response === "True") {
        setMovies(data.Search); // 6f. save movies → UI updates
      } else {
        setError("No movies found!"); // 6g. show error
      }
    } catch {
      // 6h. Network error or API down
      setError("Something went wrong!");
    }

    setLoading(false); // 6i. hide loading text
  };

  // ─── 7. USE EFFECT ──────────────────────────────────────
  // Runs ONCE when page first loads
  // [] → empty array means only runs on mount
  useEffect(() => {
    fetchMovies("Marvel"); // 7a. load Marvel movies by default
    searchRef.current.focus(); // 7b. auto focus search input
  }, []);

  // ─── 8. SEARCH FUNCTION ─────────────────────────────────
  // Runs when user clicks Search or presses Enter
  const searchMovies = () => {
    if (!search) return; // 8a. ignore if input empty
    fetchMovies(search); // 8b. fetch with user's query
    searchRef.current.focus(); // 8c. keep focus on input
  };

  // ─── 9. UI ──────────────────────────────────────────────
  return (
    <div className="p-8">
      {/* ── 9a. SEARCH BOX ────────────────────────────── */}
      <div className="flex gap-4 max-w-xl mx-auto mb-8">
        {/* Input — ref attaches remote control to this element */}
        <input
          ref={searchRef}
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && searchMovies()}
          placeholder="Search movies..."
          className="flex-1 px-4 py-2 rounded-lg bg-gray-800 border border-gray-600 focus:outline-none focus:border-blue-500"
        />

        {/* Search Button */}
        <button
          onClick={searchMovies}
          className="px-6 py-2 bg-blue-500 rounded-lg hover:bg-blue-600 transition-all duration-300"
        >
          Search
        </button>
      </div>

      {/* ── 9b. LOADING — only shows when loading is true ── */}
      {loading && (
        <p className="text-center text-gray-400 text-xl mb-4">Loading...</p>
      )}

      {/* ── 9c. ERROR — only shows when error has message ── */}
      {error && (
        <p className="text-center text-red-400 text-xl mb-4">{error}</p>
      )}

      {/* ── 9d. MOVIES GRID ───────────────────────────────── */}
      {/* Responsive: 1 col → 2 col → 3 col → 4 col */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {/* Loop through movies — each becomes a card */}
        {movies.map((movie) => (
          <div
            key={movie.imdbID}
            className="bg-gray-800 rounded-xl overflow-hidden hover:scale-105 transition-all duration-300 cursor-pointer"
          >
            {/* Poster — show placeholder if no poster */}
            <img
              src={
                movie.Poster !== "N/A"
                  ? movie.Poster
                  : "https://via.placeholder.com/300x450?text=No+Poster"
              }
              alt={movie.Title}
              className="w-full h-64 object-cover"
            />

            {/* Movie Info */}
            <div className="p-4">
              <h3 className="font-bold text-lg mb-1 truncate">{movie.Title}</h3>
              <p className="text-gray-400">{movie.Year}</p>
              <p className="text-blue-400 text-sm capitalize">{movie.Type}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
  // ── END OF UI ────────────────────────────────────────────
}
// ── END OF HOME COMPONENT ───────────────────────────────────

// ─── 10. EXPORT ─────────────────────────────────────────────
export default Home;
