// ============================================
// LESSON 19: DELETE - Removing Documents
// ============================================
// Two types of delete:
//
// HARD DELETE: permanently removes from database
// Doctor.findByIdAndDelete(id)
// data is GONE FOREVER
//
// SOFT DELETE: marks as deleted but keeps in database
// Doctor.findByIdAndUpdate(id, { isDeleted: true })
// data stays, just hidden from normal queries
// CAN BE RECOVERED
//
// FLOW:
// Postman → DELETE /doctors/:id → findByIdAndDelete → MongoDB → Response
// ============================================

const express = require("express");
const mongoose = require("mongoose");
const Doctor = require("./models/Doctor");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

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
// DELETE /doctors/:id - HARD DELETE
// Purpose: Permanently remove doctor from database
// Used by: Admin only
//
// FLOW:
// 1. Get doctor ID from URL
// 2. Find doctor in database
// 3. Delete permanently
// 4. Send confirmation response
// ============================================
app.delete("/doctors/:id", async function (req, res) {
  try {
    // get id from URL
    const doctorId = req.params.id;

    // findByIdAndDelete = find doctor and remove permanently
    // returns deleted doctor object (for confirmation)
    const deletedDoctor = await Doctor.findByIdAndDelete(doctorId);

    // if doctor not found
    if (!deletedDoctor) {
      return res.status(404).json({
        message: "Doctor not found - check the ID",
      });
    }

    // send confirmation - doctor is gone
    res.status(200).json({
      message: "Doctor deleted permanently",
      deletedDoctor: deletedDoctor.name,
    });
  } catch (error) {
    res.status(500).json({
      message: "Delete failed",
      error: error.message,
    });
  }
});

// ============================================
// GET /doctors - get all doctors
// for testing - verify deletion worked
// ============================================
app.get("/doctors", async function (req, res) {
  try {
    const doctors = await Doctor.find();

    res.status(200).json({
      message: "All doctors",
      count: doctors.length,
      data: doctors,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
