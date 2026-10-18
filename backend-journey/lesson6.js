// ============================================
// LESSON 6: Express.js - First Server
// Express = framework built on top of http module
// Makes routing and server setup much cleaner
// ============================================

// import express
const express = require("express");

// create express app
// app = your entire server
const app = express();

// port number
const PORT = 3000;

// ============================================
// MIDDLEWARE
// express.json() = allows server to read
// JSON data sent in POST/PUT requests (req.body)
// must be added BEFORE routes
// ============================================
app.use(express.json());

// ============================================
// ROUTES
// app.get(path, callback) = handle GET request
// req = incoming request
// res = response we send back
// ============================================

// HOME route
app.get("/", function (req, res) {
  res.json({ message: "Welcome to Job Board API!" });
});

// JOBS route
app.get("/jobs", function (req, res) {
  res.json({
    message: "All jobs fetched",
    jobs: [
      {
        id: 1,
        title: "React Developer",
        company: "TechCorp",
        city: "Islamabad",
      },
      {
        id: 2,
        title: "Node.js Developer",
        company: "StartupX",
        city: "Lahore",
      },
      {
        id: 3,
        title: "Full Stack Developer",
        company: "Agency",
        city: "Karachi",
      },
    ],
  });
});

// ABOUT route
app.get("/about", function (req, res) {
  res.json({ message: "Job Board API v1.0" });
});

// ============================================
// START SERVER
// app.listen = start listening on PORT
// ============================================
app.listen(PORT, function () {
  console.log("Server running on port", PORT);
});
