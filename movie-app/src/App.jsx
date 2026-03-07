// ─── IMPORTS ───────────────────────────────────────────
import { useState, useEffect } from "react";

// ─── API KEY FROM ENV FILE ──────────────────────────────
const API_KEY = import.meta.env.VITE_API_KEY;

// ─── MAIN APP COMPONENT ────────────────────────────────
function App() {
  // ─── STATE VARIABLES ─────────────────────────────────
  const [search, setSearch] = useState(""); // what user types
  const [movies, setMovies] = useState([]); // movies from API
  const [loading, setLoading] = useState(false); // loading state
  const [error, setError] = useState(""); // error message

  // ─── FETCH MOVIES FROM API ───────────────────────────
  const fetchMovies = async (query) => {
    // Step 1 — start loading
    setLoading(true);
    setError("");

    try {
      // Step 2 — send request to OMDB API
      const response = await fetch(
        `https://www.omdbapi.com/?s=${query}&apikey=${API_KEY}`,
      );

      // Step 3 — open the envelope (parse JSON)
      const data = await response.json();

      // Step 4 — save movies or show error
      if (data.Response === "True") {
        setMovies(data.Search);
      } else {
        setError("No movies found!");
      }
    } catch {
      // Step 5 — catch any network errors
      setError("Something went wrong!");
    }

    // Step 6 — stop loading
    setLoading(false);
  };

  // ─── RUN ONCE WHEN PAGE LOADS ────────────────────────
  useEffect(() => {
    fetchMovies("Marvel"); // eslint-disable-line
  }, []);
  // ─── SEARCH WHEN BUTTON CLICKED ──────────────────────
  const searchMovies = () => {
    if (!search) return; // do nothing if input is empty
    fetchMovies(search);
  };

  // ─── UI ──────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      {/* ── HEADER ── */}
      <div className="flex items-center justify-between max-w-6xl mx-auto mb-8">
        <div className="text-2xl font-bold text-blue-400 tracking-widest">
          ZEN<span className="text-white">OVA</span>
        </div>
        <h1 className="text-4xl font-bold">🎬 Movie Search</h1>
        <div className="text-gray-500 text-sm">by Umair Khan</div>
      </div>

      {/* ── SEARCH BOX ── */}
      <div className="flex gap-4 max-w-xl mx-auto mb-8">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && searchMovies()}
          placeholder="Search movies..."
          className="flex-1 px-4 py-2 rounded-lg bg-gray-800 border border-gray-600 focus:outline-none focus:border-blue-500"
        />
        <button
          onClick={searchMovies}
          className="px-6 py-2 bg-blue-500 rounded-lg hover:bg-blue-600 transition-all duration-300"
        >
          Search
        </button>
      </div>

      {/* ── LOADING ── */}
      {loading && (
        <p className="text-center text-gray-400 text-xl mb-4">Loading...</p>
      )}

      {/* ── ERROR ── */}
      {error && (
        <p className="text-center text-red-400 text-xl mb-4">{error}</p>
      )}

      {/* ── MOVIES GRID ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {movies.map((movie) => (
          <div
            key={movie.imdbID}
            className="bg-gray-800 rounded-xl overflow-hidden hover:scale-105 transition-all duration-300 cursor-pointer"
          >
            {/* Movie Poster */}
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
}

// ─── EXPORT ──────────────────────────────────────────────
export default App;
