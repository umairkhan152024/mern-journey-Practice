// ════════════════════════════════════════════════════════════
//  HOME PAGE — UI only, no fetch logic here!
//  All fetching logic moved to useFetchMovies.js custom hook
// ════════════════════════════════════════════════════════════

// ─── 1. IMPORTS ─────────────────────────────────────────────
import { useState, useRef } from "react";

// ─── 2. IMPORT CUSTOM HOOK ──────────────────────────────────
// useFetchMovies handles all fetching logic
import useFetchMovies from "../hooks/useFetchMovies";

// ─── 3. HOME COMPONENT ──────────────────────────────────────
function Home() {
  // ─── 4. CUSTOM HOOK ───────────────────────────────────────
  // ONE LINE replaces all fetch logic!
  // We get movies, loading, error, fetchMovies from the hook
  const { movies, loading, error, fetchMovies } = useFetchMovies("Marvel");

  // ─── 5. LOCAL STATE ───────────────────────────────────────
  // search stays here — it belongs to UI not fetch logic
  const [search, setSearch] = useState("");

  // ─── 6. REF ───────────────────────────────────────────────
  // Remote control for search input
  const searchRef = useRef(null);

  // ─── 7. SEARCH FUNCTION ───────────────────────────────────
  // Calls fetchMovies from our custom hook
  const searchMovies = () => {
    if (!search) return; // 7a. ignore if empty
    fetchMovies(search); // 7b. fetch with user query
    searchRef.current.focus(); // 7c. keep focus on input
  };

  // ─── 8. UI ────────────────────────────────────────────────
  return (
    <div className="p-8">
      {/* ── 8a. SEARCH BOX ────────────────────────────── */}
      <div className="flex gap-4 max-w-xl mx-auto mb-8">
        {/* Input */}
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

      {/* ── 8b. LOADING ───────────────────────────────── */}
      {loading && (
        <p className="text-center text-gray-400 text-xl mb-4">Loading...</p>
      )}

      {/* ── 8c. ERROR ─────────────────────────────────── */}
      {error && (
        <p className="text-center text-red-400 text-xl mb-4">{error}</p>
      )}

      {/* ── 8d. MOVIES GRID ───────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {movies.map((movie) => (
          <div
            key={movie.imdbID}
            className="bg-gray-800 rounded-xl overflow-hidden hover:scale-105 transition-all duration-300 cursor-pointer"
          >
            {/* Poster */}
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

// ─── 9. EXPORT ──────────────────────────────────────────────
export default Home;
