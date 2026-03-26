// ════════════════════════════════════════════════════════════
//  EXPRESS SERVER — WITH MIDDLEWARE
//  Umair Khan | ZENOVA | MERN Stack Journey
// ════════════════════════════════════════════════════════════

// ─── 1. IMPORTS ─────────────────────────────────────────────
const express = require("express");

// ─── 2. CREATE SERVER ───────────────────────────────────────
const app = express();

// ─── 3. PORT ────────────────────────────────────────────────
const PORT = 3000;

// ─── 4. MIDDLEWARE ──────────────────────────────────────────
// Middleware 1 — express.json()
// Allows server to READ JSON data sent from browser
// Without this → req.body is undefined!
app.use(express.json());

// Middleware 2 — Custom logger
// Runs on EVERY request before reaching any route
// req.method → GET, POST, PUT, DELETE
// req.url    → /, /movies, /about
app.use((req, res, next) => {
  // ── 4a. Log every request ─────────────────────────────
  console.log(`Request: ${req.method} ${req.url}`);

  // ── 4b. next() → move to next middleware or route ─────
  // Without next() → request gets STUCK here forever!
  next();
});

// ─── 5. ROUTES ──────────────────────────────────────────────

// ── Route 1 — Home ────────────────────────────────────────
app.get("/", (req, res) => {
  res.send("Welcome to ZENOVA API! — Nodemon is watching!");
});

// ── Route 2 — About ───────────────────────────────────────
app.get("/about", (req, res) => {
  res.send("ZENOVA — Healthcare Digital Agency");
});

// ── Route 3 — Movies ──────────────────────────────────────
app.get("/movies", (req, res) => {
  res.json({
    success: true,
    data: [
      { title: "Batman", year: "2022" },
      { title: "Avengers", year: "2019" },
      { title: "Spider-Man", year: "2021" },
    ],
  });
});

// ─── 6. START SERVER ────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
