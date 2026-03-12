// ════════════════════════════════════════════════════════════
//  FIRST EXPRESS SERVER
//  This is the simplest possible web server
// ════════════════════════════════════════════════════════════

// ─── 1. IMPORT EXPRESS ──────────────────────────────────────
// require() = Node.js way of importing packages
// Like import in React but older syntax
const express = require("express");

// ─── 2. CREATE SERVER ───────────────────────────────────────
// app = our server instance
// All routes and settings go through app
const app = express();

// ─── 3. PORT ────────────────────────────────────────────────
// Port = door number our server listens on
// 3000 is standard for Node.js/Express
const PORT = 3000;

// ─── 4. ROUTES ──────────────────────────────────────────────
// Route = when someone visits this URL, do this!
// app.get(URL, function(req, res))
// req = request  → what browser sent to server
// res = response → what server sends back to browser

// Route 1 — Home page
app.get("/", (req, res) => {
  // res.send() → sends text back to browser
  res.send("Welcome to ZENOVA API!");
});

// Route 2 — About page
app.get("/about", (req, res) => {
  res.send("ZENOVA — Healthcare Digital Agency");
});

// Route 3 — Movies page — sends JSON data
app.get("/movies", (req, res) => {
  // res.json() → sends JSON data back to browser
  res.json({
    success: true,
    data: [
      { title: "Batman", year: "2022" },
      { title: "Avengers", year: "2019" },
      { title: "Spider-Man", year: "2021" },
    ],
  });
});

// ─── 5. START SERVER ────────────────────────────────────────
// app.listen() → starts the server on PORT 3000
// () => console.log → runs when server successfully starts
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
