// ─── STEP 1: IMPORTS ─────────────────────────────────────────
// useState  → store data that changes UI
// useEffect → run code on page load
// useRef    → access DOM elements directly
import { useState, useEffect, useRef } from "react";

// ─── STEP 2: API KEY FROM .env FILE ──────────────────────────
// Never hardcode API keys — always use environment variables
const API_KEY = import.meta.env.VITE_API_KEY;

// ─── STEP 3: MAIN APP COMPONENT ──────────────────────────────
function App() {
  // ─── STEP 4: STATE VARIABLES ───────────────────────────────
  // These 4 states control everything in the UI
  const [search, setSearch] = useState(""); // what user types in input
  const [movies, setMovies] = useState([]); // movies returned from API
  const [loading, setLoading] = useState(false); // show/hide loading text
  const [error, setError] = useState(""); // show/hide error message

  // ─── STEP 5: useRef ────────────────────────────────────────
  // searchRef is a remote control for the input element
  // searchRef.current = the actual input on screen
  const searchRef = useRef(null);

  // ─── STEP 6: FETCH MOVIES FUNCTION ─────────────────────────
  // This function talks to OMDB API and gets movies
  // async because we use await inside
  const fetchMovies = async (query) => {
    setLoading(true); // show "Loading..." text
    setError(""); // clear any previous error

    try {
      // Step 6a — send request to OMDB API
      // s= means search query
      // apikey= means our API key
      const response = await fetch(
        `https://www.omdbapi.com/?s=${query}&apikey=${API_KEY}`,
      );

      // Step 6b — open the envelope (convert to JavaScript object)
      const data = await response.json();

      // Step 6c — check if OMDB found movies
      if (data.Response === "True") {
        setMovies(data.Search); // save movies in state → UI updates
      } else {
        setError("No movies found!"); // show error message
      }
    } catch {
      // Step 6d — catch network errors (no internet etc)
      setError("Something went wrong!");
    }

    setLoading(false); // hide "Loading..." text
  };

  // ─── STEP 7: useEffect ─────────────────────────────────────
  // Runs ONCE when page first loads
  // [] means no dependencies — only runs on mount
  useEffect(() => {
    fetchMovies("Marvel"); // load Marvel movies by default // eslint-disable-line react-hooks/set-state-in-effect
    searchRef.current.focus(); // auto focus the search input
  }, []);

  // ─── STEP 8: SEARCH FUNCTION ───────────────────────────────
  // Called when user clicks Search button or presses Enter
  const searchMovies = () => {
    if (!search) return; // do nothing if input is empty
    fetchMovies(search); // fetch movies with user's search term
    searchRef.current.focus(); // keep focus on input after search
  };

  // ─── STEP 9: UI / JSX ──────────────────────────────────────
  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      {/* ── HEADER ───────────────────────────────────────── */}
      {/* ZENOVA logo left, title center, name right */}
      <div className="flex items-center justify-between max-w-6xl mx-auto mb-8">
        {/* ZENOVA Logo */}
        <div className="text-2xl font-bold text-blue-400 tracking-widest">
          ZEN<span className="text-white">OVA</span>
        </div>

        {/* App Title */}
        <h1 className="text-4xl font-bold">🎬 Movie Search</h1>

        {/* Developer Name */}
        <div className="text-gray-500 text-sm">by Umair Khan</div>
      </div>

      {/* ── SEARCH BOX ───────────────────────────────────── */}
      <div className="flex gap-4 max-w-xl mx-auto mb-8">
        {/* Input Field */}
        {/* ref={searchRef} → attaches our remote control to this input */}
        {/* onChange → every keystroke updates search state */}
        {/* onKeyPress → pressing Enter triggers search */}
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
        {/* onClick → calls searchMovies function when clicked */}
        <button
          onClick={searchMovies}
          className="px-6 py-2 bg-blue-500 rounded-lg hover:bg-blue-600 transition-all duration-300"
        >
          Search
        </button>
      </div>

      {/* ── LOADING ──────────────────────────────────────── */}
      {/* Only shows when loading is true */}
      {loading && (
        <p className="text-center text-gray-400 text-xl mb-4">Loading...</p>
      )}

      {/* ── ERROR ────────────────────────────────────────── */}
      {/* Only shows when error has a message */}
      {error && (
        <p className="text-center text-red-400 text-xl mb-4">{error}</p>
      )}

      {/* ── MOVIES GRID ──────────────────────────────────── */}
      {/* Responsive grid — 1 col mobile, 2 tablet, 3 medium, 4 large */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {/* Loop through movies array and render a card for each */}
        {/* key={movie.imdbID} → unique ID required by React for lists */}
        {movies.map((movie) => (
          <div
            key={movie.imdbID}
            className="bg-gray-800 rounded-xl overflow-hidden hover:scale-105 transition-all duration-300 cursor-pointer"
          >
            {/* Movie Poster */}
            {/* If poster exists show it, otherwise show placeholder */}
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
              {/* truncate → adds ... if title is too long */}
              <h3 className="font-bold text-lg mb-1 truncate">{movie.Title}</h3>
              <p className="text-gray-400">{movie.Year}</p>
              {/* capitalize → first letter uppercase */}
              <p className="text-blue-400 text-sm capitalize">{movie.Type}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── STEP 10: EXPORT ─────────────────────────────────────────
// Export so main.jsx can use this component
export default App;
