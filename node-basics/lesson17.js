// ============================================
// LESSON 17: READ - Finding Documents
// ============================================
// In this lesson we learn how to READ data
// from MongoDB using different methods:
//
// Doctor.find()              = get ALL doctors
// Doctor.findById(id)        = get ONE by MongoDB id
// Doctor.find({field: value}) = filter by condition
// .sort({field: 1})          = sort results (1=asc, -1=desc)
//
// FLOW OF EVERY REQUEST:
// Postman → Express Route → Mongoose Command → MongoDB → Response
// ============================================

// STEP 1: Import required packages
const express = require("express"); // web framework
const mongoose = require("mongoose"); // MongoDB connector
const Doctor = require("./models/Doctor"); // Doctor model (blueprint)

// STEP 2: Load environment variables from .env file
require("dotenv").config();

// STEP 3: Create Express app
const app = express();
const PORT = process.env.PORT || 3000;

// STEP 4: Allow Express to read JSON request body
app.use(express.json());

// STEP 5: Connect to MongoDB FIRST, then start server
// We always connect to database before starting server
// Because server needs database to work
mongoose
  .connect(process.env.MONGODB_URI)
  .then(function () {
    // This runs when MongoDB connection is successful
    console.log("Connected to MongoDB!");

    // Start server ONLY after database is connected
    app.listen(PORT, function () {
      console.log("Server running on port", PORT);
    });
  })
  .catch(function (error) {
    // This runs if MongoDB connection fails
    console.error("MongoDB connection failed:", error.message);
  });

// ============================================
// ROUTE 1: GET /doctors
// Purpose: Get ALL doctors from database
// URL: http://localhost:3000/doctors
//
// FLOW:
// Postman sends GET request
//       ↓
// Express receives it here
//       ↓
// Doctor.find() searches ALL documents in doctors collection
//       ↓
// MongoDB returns array of all doctors
//       ↓
// We send them back as JSON response
// ============================================
app.get("/doctors", async function (req, res) {
  try {
    // Doctor.find() = "find ALL documents in doctors collection"
    // returns an array of doctor objects
    // async/await = wait for database to respond before continuing
    const doctors = await Doctor.find();

    // send response with all doctors
    res.status(200).json({
      message: "All doctors fetched",
      count: doctors.length, // how many doctors found
      data: doctors, // array of all doctor objects
    });
  } catch (error) {
    // if database query fails - send error response
    res.status(500).json({ message: error.message });
  }
});

// ============================================
// ROUTE 2: GET /doctors/:id
// Purpose: Get ONE specific doctor by their MongoDB ID
// URL: http://localhost:3000/doctors/6a407b76e1059e25a3f32aef
//
// FLOW:
// Postman sends GET /doctors/6a407b76...
//       ↓
// Express extracts id from URL via req.params.id
//       ↓
// Doctor.findById(id) searches for doctor with that exact id
//       ↓
// MongoDB returns that one doctor (or null if not found)
//       ↓
// We check if found, then send response
// ============================================
app.get("/doctors/:id", async function (req, res) {
  try {
    // req.params.id = the id from URL
    // example: /doctors/6a407b76... → id = "6a407b76..."
    const doctorId = req.params.id;

    // Doctor.findById(id) = "find document where _id matches"
    // returns one doctor object OR null if not found
    const doctor = await Doctor.findById(doctorId);

    // check if doctor was found
    // if doctor is null - it means no doctor with that id exists
    if (!doctor) {
      return res.status(404).json({
        message: "Doctor not found - wrong ID",
      });
    }

    // doctor was found - send it back
    res.status(200).json({
      message: "Doctor found",
      data: doctor,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ============================================
// ROUTE 3: GET /doctors/filter/city?city=Islamabad
// Purpose: Get doctors filtered by city
// URL: http://localhost:3000/doctors/filter/city?city=Islamabad
//
// FLOW:
// Postman sends GET /doctors/filter/city?city=Islamabad
//       ↓
// Express extracts city from query string via req.query.city
//       ↓
// Doctor.find({city: city}) = "find ALL doctors WHERE city matches"
//       ↓
// MongoDB searches and returns matching doctors
//       ↓
// We send them back as JSON
// ============================================
app.get("/doctors/filter/city", async function (req, res) {
  try {
    // req.query.city = value from ?city=Islamabad in URL
    const city = req.query.city;

    // Doctor.find({city: city}) = filter by city
    // only returns doctors where city field matches
    const doctors = await Doctor.find({ city: city });

    res.status(200).json({
      message: `Doctors in ${city}`,
      count: doctors.length,
      data: doctors,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ============================================
// ROUTE 4: GET /doctors/filter/available
// Purpose: Get only available doctors, sorted by fee
// URL: http://localhost:3000/doctors/filter/available
//
// FLOW:
// Postman sends GET /doctors/filter/available
//       ↓
// Doctor.find({available: true}) = only available doctors
// .sort({fee: 1}) = sort by fee lowest first
//       ↓
// MongoDB returns sorted, filtered list
//       ↓
// We send response
// ============================================
app.get("/doctors/filter/available", async function (req, res) {
  try {
    // Doctor.find({available: true}) = only available doctors
    // .sort({fee: 1}) = sort ascending by fee (1=low to high)
    // .sort({fee: -1}) would be high to low
    const doctors = await Doctor.find({ available: true }).sort({ fee: 1 });

    res.status(200).json({
      message: "Available doctors sorted by fee",
      count: doctors.length,
      data: doctors,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
