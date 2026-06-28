// ============================================
// LESSON 16: CREATE - Save data to MongoDB
// Combining Express routes with MongoDB
// POST /doctors = create new doctor in database
// ============================================

const express = require("express");
const mongoose = require("mongoose");
const Doctor = require("./models/Doctor");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// connect to MongoDB first
mongoose
  .connect(process.env.MONGODB_URI)
  .then(function () {
    console.log("Connected to MongoDB!");

    app.listen(PORT, function () {
      console.log("Server running on port", PORT);
    });
  })
  .catch(function (error) {
    console.error("MongoDB connection failed:", error.message);
  });

// ============================================
// POST /doctors - CREATE new doctor
// 1. Receive data from Postman/React
// 2. Validate it
// 3. Save to MongoDB
// 4. Send response back
// ============================================
app.post("/doctors", async function (req, res) {
  try {
    // get data from request body
    const { name, specialty, city, experience, fee, email } = req.body;

    // create new doctor object using Doctor model
    const newDoctor = new Doctor({
      name: name,
      specialty: specialty,
      city: city,
      experience: experience,
      fee: fee,
      email: email,
    });

    // save to MongoDB database
    const savedDoctor = await newDoctor.save();

    // send success response
    res.status(201).json({
      message: "Doctor created successfully",
      data: savedDoctor,
    });
  } catch (error) {
    // if something goes wrong - send error response
    res.status(400).json({
      message: "Failed to create doctor",
      error: error.message,
    });
  }
});

// ============================================
// GET /doctors - READ all doctors
// fetch all doctors from MongoDB
// ============================================
app.get("/doctors", async function (req, res) {
  try {
    // Doctor.find() = get ALL doctors from database
    const doctors = await Doctor.find();

    res.status(200).json({
      message: "Doctors fetched successfully",
      count: doctors.length,
      data: doctors,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch doctors",
      error: error.message,
    });
  }
});
