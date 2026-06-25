// ============================================
// LESSON 10: Params, Query Strings, Body
// 3 ways to send data to Express server
// IMPORTANT RULE: specific routes BEFORE
// dynamic routes always!
// ============================================

const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

// middleware to read JSON body
app.use(express.json());

// ============================================
// PART 1: QUERY STRING - req.query
// MUST come BEFORE /doctors/:id route
// otherwise "search" gets treated as :id
// query strings come after ? in URL
// /doctors/search?city=Islamabad&specialty=Cardiology
// req.query.city = "Islamabad"
// req.query.specialty = "Cardiology"
// used for: searching, filtering, sorting
// ============================================
app.get("/doctors/search", function (req, res) {
  // req.query = object with all query params
  const city = req.query.city;
  const specialty = req.query.specialty;

  console.log("Searching city:", city);
  console.log("Searching specialty:", specialty);

  res.json({
    message: "Search results",
    filters: {
      city: city,
      specialty: specialty,
    },
    results: [{ name: "Dr. Ahmed", city: city, specialty: specialty }],
  });
});

// ============================================
// PART 2: URL PARAMS - req.params
// MUST come AFTER specific routes
// :id = dynamic part of URL
// /doctors/1 → req.params.id = "1"
// /doctors/5 → req.params.id = "5"
// used for: getting one specific item
// ============================================
app.get("/doctors/:id", function (req, res) {
  // req.params.id = value from URL
  const doctorId = req.params.id;

  console.log("Doctor ID requested:", doctorId);

  res.json({
    message: "Doctor found",
    doctorId: doctorId,
    name: "Dr. Ahmed",
    specialty: "Cardiology",
  });
});

// ============================================
// PART 3: BODY - req.body
// data sent in POST/PUT request body
// NOT visible in URL - hidden in request
// express.json() middleware reads it
// used for: creating, updating data
// ============================================
app.post("/doctors", function (req, res) {
  // req.body = data sent by Postman/React
  const name = req.body.name;
  const specialty = req.body.specialty;
  const city = req.body.city;

  console.log("New doctor received:");
  console.log("Name:", name);
  console.log("Specialty:", specialty);
  console.log("City:", city);

  res.status(201).json({
    message: "Doctor created successfully",
    doctor: {
      id: 4,
      name: name,
      specialty: specialty,
      city: city,
    },
  });
});

app.listen(PORT, function () {
  console.log("ZENOVA server running on port", PORT);
});
