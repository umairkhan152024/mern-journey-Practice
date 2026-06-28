// ============================================
// LESSON 18: UPDATE - Updating Documents
// ============================================
// Two ways to update:
// PUT   = full update (send all fields)
// PATCH = partial update (send only changed fields)
//
// findByIdAndUpdate(id, data, options)
// options:
// { returnDocument: 'after' }  = return updated document
// { runValidators: true }      = validate against schema
//
// FLOW:
// Postman → PUT /doctors/:id → findByIdAndUpdate → MongoDB → Response
// ============================================

const express = require("express");
const mongoose = require("mongoose");
const Doctor = require("./models/Doctor");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// connect to MongoDB then start server
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
// PUT /doctors/:id
// Purpose: Full update of a doctor
// Send ALL fields in body - replaces everything
//
// FLOW:
// 1. Get doctor ID from URL (req.params.id)
// 2. Get new data from body (req.body)
// 3. Find doctor by ID in database
// 4. Replace all fields with new data
// 5. Return updated doctor
// ============================================
app.put("/doctors/:id", async function (req, res) {
  try {
    // get id from URL params
    const doctorId = req.params.id;

    // get new data from request body
    const updateData = req.body;

    // findByIdAndUpdate finds doctor and updates it
    // returnDocument: 'after' = return UPDATED doc not old one
    // runValidators: true = check new data against schema rules
    const updatedDoctor = await Doctor.findByIdAndUpdate(doctorId, updateData, {
      returnDocument: "after", // return updated document
      runValidators: true, // validate new data
    });

    // if no doctor found with that id
    if (!updatedDoctor) {
      return res.status(404).json({
        message: "Doctor not found - check the ID",
      });
    }

    // send updated doctor back
    res.status(200).json({
      message: "Doctor updated successfully",
      data: updatedDoctor,
    });
  } catch (error) {
    res.status(400).json({
      message: "Update failed",
      error: error.message,
    });
  }
});

// ============================================
// PATCH /doctors/:id/availability
// Purpose: Update ONLY the availability field
// PATCH = partial update (only one field changed)
//
// FLOW:
// 1. Get doctor ID from URL
// 2. Get available (true/false) from body
// 3. Update ONLY available field in database
// 4. Return updated doctor
// ============================================
app.patch("/doctors/:id/availability", async function (req, res) {
  try {
    // get id from URL
    const doctorId = req.params.id;

    // get available value from body
    // available = true or false
    const { available } = req.body;

    // update ONLY the available field
    // other fields stay the same
    const updatedDoctor = await Doctor.findByIdAndUpdate(
      doctorId,
      { available: available }, // only change this one field
      { returnDocument: "after" },
    );

    // if doctor not found
    if (!updatedDoctor) {
      return res.status(404).json({
        message: "Doctor not found",
      });
    }

    // send response with updated availability status
    res.status(200).json({
      message: `Doctor is now ${available ? "available" : "unavailable"}`,
      data: updatedDoctor,
    });
  } catch (error) {
    res.status(400).json({
      message: "Update failed",
      error: error.message,
    });
  }
});
