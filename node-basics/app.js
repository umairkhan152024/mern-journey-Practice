// ════════════════════════════════════════════════════════════
//  EXPRESS SERVER — COMPLETE
//  Umair Khan | ZENOVA | MERN Stack Journey | Stage 4
// ════════════════════════════════════════════════════════════

// ─── 1. IMPORTS ─────────────────────────────────────────────
// require() = Node.js way of importing packages
const express = require("express");

// ─── 2. CREATE SERVER ───────────────────────────────────────
// app = our server instance
// All routes and middleware go through app
const app = express();

// ─── 3. PORT ────────────────────────────────────────────────
// 3000 = standard port for Express servers
const PORT = 3000;

// ─── 4. MIDDLEWARE ──────────────────────────────────────────

// ── 4a. express.json() ────────────────────────────────────
// Allows server to READ JSON data sent from browser
// Without this → req.body is always undefined!
app.use(express.json());

// ── 4b. Custom Logger ─────────────────────────────────────
// Runs on EVERY request before reaching any route
// req.method → GET, POST, PUT, DELETE
// req.url    → /movies, /movies/1, /movies/search
app.use((req, res, next) => {
  console.log(`Request: ${req.method} ${req.url}`);
  // next() → move to next middleware or route
  // Without next() → request gets STUCK here forever!
  next();
});

// ─── 5. FAKE DATABASE ───────────────────────────────────────
// Pretending this array is our database
// Later we replace this with real MongoDB!
const movies = [
  { id: 1, title: "Batman", year: "2022" },
  { id: 2, title: "Avengers", year: "2019" },
  { id: 3, title: "Spider-Man", year: "2021" },
  { id: 4, title: "Iron Man", year: "2022" },
];

// ─── 6. ROUTES ──────────────────────────────────────────────

// ── Route 1 — Home ────────────────────────────────────────
// GET localhost:3000/
// Returns welcome message
app.get("/", (req, res) => {
  res.send("Welcome to ZENOVA API!");
});

// ── Route 2 — Get ALL movies ──────────────────────────────
// GET localhost:3000/movies
// Returns every movie in our fake database
app.get("/movies", (req, res) => {
  res.json({
    success: true,
    count: movies.length, // total number of movies
    data: movies, // the full movies array
  });
});

// ── Route 3 — Search movies by year ───────────────────────
// GET localhost:3000/movies/search?year=2022
// ?year=2022 = query string → filters movies by year
// IMPORTANT: /search must come BEFORE /:id route!
// Otherwise Express thinks 'search' is an ID!
app.get("/movies/search", (req, res) => {
  // req.query → object of all query string values
  // Example: ?year=2022 → req.query = { year: '2022' }
  const year = req.query.year;

  // If no year provided → return all movies
  if (!year) {
    return res.json({
      success: true,
      data: movies,
    });
  }

  // .filter() → loops array, returns only matching items
  const filtered = movies.filter((m) => m.year === year);

  res.json({
    success: true,
    count: filtered.length,
    data: filtered,
  });
});

// ── Route 4 — Get ONE movie by ID ─────────────────────────
// GET localhost:3000/movies/1
// GET localhost:3000/movies/2
// :id = route parameter → catches any value in URL
app.get("/movies/:id", (req, res) => {
  // req.params.id → grabs :id value from URL
  // Number() → converts string "1" to number 1
  const id = Number(req.params.id);

  // .find() → loops array, returns first matching item
  const movie = movies.find((m) => m.id === id);

  // If movie not found → send 404 error
  if (!movie) {
    return res.status(404).json({
      success: false,
      message: "Movie not found!",
    });
  }

  // Movie found → send it back
  res.json({
    success: true,
    data: movie,
  });
});

// ─── 7. START SERVER ────────────────────────────────────────
// app.listen() → starts server on PORT 3000
// Callback runs when server successfully starts
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
