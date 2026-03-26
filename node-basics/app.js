// ════════════════════════════════════════════════════════════
//  EXPRESS SERVER — ROUTE PARAMETERS
//  Umair Khan | ZENOVA | MERN Stack Journey
// ════════════════════════════════════════════════════════════

// ─── 1. IMPORTS ─────────────────────────────────────────────
const express = require("express");

// ─── 2. CREATE SERVER ───────────────────────────────────────
const app = express();

// ─── 3. PORT ────────────────────────────────────────────────
const PORT = 3000;

// ─── 4. MIDDLEWARE ──────────────────────────────────────────
app.use(express.json());
app.use((req, res, next) => {
  console.log(`Request: ${req.method} ${req.url}`);
  next();
});

// ─── 5. FAKE DATABASE ───────────────────────────────────────
// Array of movies — pretending this is a database
// Later we replace this with real MongoDB!
const movies = [
  { id: 1, title: "Batman", year: "2022" },
  { id: 2, title: "Avengers", year: "2019" },
  { id: 3, title: "Spider-Man", year: "2021" },
];

// ─── 6. ROUTES ──────────────────────────────────────────────

// ── Route 1 — Get ALL movies ───────────────────────────────
// localhost:3000/movies
app.get("/movies", (req, res) => {
  // Send all movies back as JSON
  res.json({
    success: true,
    count: movies.length, // how many movies total
    data: movies, // the actual movies array
  });
});

// ── Route 2 — Get ONE movie by ID ─────────────────────────
// localhost:3000/movies/1
// localhost:3000/movies/2
// :id = route parameter — catches whatever is in the URL
app.get("/movies/:id", (req, res) => {
  // ── 6a. Get id from URL ──────────────────────────────
  // req.params.id → grabs :id value from URL
  // Number() → converts string "1" to number 1
  const id = Number(req.params.id);

  // ── 6b. Find movie with matching id ─────────────────
  // .find() loops through array and returns matching item
  const movie = movies.find((m) => m.id === id);

  // ── 6c. If movie not found → send 404 error ─────────
  if (!movie) {
    return res.status(404).json({
      success: false,
      message: "Movie not found!",
    });
  }

  // ── 6d. Movie found → send it back ──────────────────
  res.json({
    success: true,
    data: movie,
  });
});

// ─── 7. START SERVER ────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
