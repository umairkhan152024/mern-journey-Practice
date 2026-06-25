// ============================================
// LESSON 7: Express.js - First Server
// Express = framework built on top of http
// Makes routing, middleware, APIs much cleaner
// npm install express (already done)
// ============================================

// load express package
const express = require("express");

// ============================================
// express() creates your app
// app = your entire server
// all routes, middleware attached to app
// ============================================
const app = express();

// ============================================
// PORT = door number server listens on
// process.env.PORT = from .env file
// || 3000 = if .env not set, use 3000
// ============================================
const PORT = process.env.PORT || 3000;

// ============================================
// app.get = handle GET requests
// GET = browser asking for data (reading)
// "/" = home route
// req = request from browser
// res = response we send back
// ============================================
app.get("/", function (req, res) {
  // res.send = send response back
  // Express automatically sets Content-Type
  // no need for res.writeHead like before!
  res.send("Welcome to ZENOVA Clinic API!");
});

// ============================================
// /about route
// ============================================
app.get("/about", function (req, res) {
  res.send("ZENOVA - Best Clinic in Islamabad!");
});

// ============================================
// /doctors route - sending JSON data
// res.json = sends JSON response
// automatically sets Content-Type to json
// no need for JSON.stringify like before!
// ============================================
app.get("/doctors", function (req, res) {
  const doctors = [
    { name: "Dr. Ahmed", specialty: "Cardiology" },
    { name: "Dr. Sara", specialty: "Neurology" },
    { name: "Dr. Ali", specialty: "Pediatrics" },
  ];

  // res.json automatically converts to JSON
  // much cleaner than raw http!
  res.json(doctors);
});

// ============================================
// app.listen starts server on PORT
// same as server.listen in raw http
// but cleaner syntax
// ============================================
app.listen(PORT, function () {
  console.log("ZENOVA Express server running on port", PORT);
});
