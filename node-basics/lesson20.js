// ============================================
// LESSON 20: Relationships Between Collections
// ============================================
// Connecting Doctor, Patient, and Appointment
//
// KEY CONCEPTS:
// 1. Reference - store ID instead of full object
// 2. populate() - replace ID with full object
//
// FLOW:
// Book appointment → store doctorId + patientId
// Get appointment  → populate() fills full info
// ============================================

// import required packages
const express = require("express");
const mongoose = require("mongoose");

// import all three models
const Doctor = require("./models/Doctor");
const Patient = require("./models/Patient");
const Appointment = require("./models/Appointment");

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
// GET /doctors - get all doctors
// added here for testing purposes
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

// ============================================
// POST /patients - Create a new patient
// ============================================
app.post("/patients", async function (req, res) {
  try {
    // create new patient from request body
    const newPatient = new Patient(req.body);

    // save to database
    const savedPatient = await newPatient.save();

    res.status(201).json({
      message: "Patient created successfully",
      data: savedPatient,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// ============================================
// GET /patients - get all patients
// ============================================
app.get("/patients", async function (req, res) {
  try {
    const patients = await Patient.find();
    res.status(200).json({
      message: "All patients",
      count: patients.length,
      data: patients,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ============================================
// POST /appointments - Book an appointment
// This is the most important route
// It connects doctor and patient via their IDs
//
// FLOW:
// 1. Receive doctorId, patientId, date, time, reason, fee
// 2. Create appointment storing only IDs
// 3. Save to database
// 4. Use populate() to fill in full doctor/patient info
// 5. Return complete appointment details
// ============================================
app.post("/appointments", async function (req, res) {
  try {
    // get all data from request body
    const { doctorId, patientId, date, time, reason, fee } = req.body;

    // create new appointment object
    // storing IDs not full objects - that's referencing
    const newAppointment = new Appointment({
      doctor: doctorId, // store doctor's MongoDB ID
      patient: patientId, // store patient's MongoDB ID
      date: date,
      time: time,
      reason: reason,
      fee: fee,
    });

    // save appointment to database
    const savedAppointment = await newAppointment.save();

    // populate = replace IDs with full doctor/patient objects
    // findById gets fresh copy from database
    // .populate("doctor") = replace doctor ID with full doctor info
    // .populate("patient") = replace patient ID with full patient info
    const populatedAppointment = await Appointment.findById(
      savedAppointment._id,
    )
      .populate("doctor")
      .populate("patient");

    res.status(201).json({
      message: "Appointment booked successfully",
      data: populatedAppointment,
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed to book appointment",
      error: error.message,
    });
  }
});

// ============================================
// GET /appointments - Get ALL appointments
// with full doctor and patient details
//
// .populate("doctor")  = fills in complete doctor object
// .populate("patient") = fills in complete patient object
// instead of just showing IDs
// ============================================
app.get("/appointments", async function (req, res) {
  try {
    // find all appointments
    // populate both doctor and patient fields
    const appointments = await Appointment.find()
      .populate("doctor") // replace doctor ID with full doctor info
      .populate("patient"); // replace patient ID with full patient info

    res.status(200).json({
      message: "All appointments",
      count: appointments.length,
      data: appointments,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ============================================
// GET /appointments/:id - Get ONE appointment
// with full doctor and patient details
// ============================================
app.get("/appointments/:id", async function (req, res) {
  try {
    // find appointment by id and populate
    const appointment = await Appointment.findById(req.params.id)
      .populate("doctor")
      .populate("patient");

    // if not found
    if (!appointment) {
      return res.status(404).json({
        message: "Appointment not found",
      });
    }

    res.status(200).json({
      message: "Appointment found",
      data: appointment,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ============================================
// PATCH /appointments/:id/status
// Update appointment status
// pending → confirmed → completed
//        → cancelled
// ============================================
app.patch("/appointments/:id/status", async function (req, res) {
  try {
    const appointmentId = req.params.id;
    const { status } = req.body;

    // update only status field
    const updatedAppointment = await Appointment.findByIdAndUpdate(
      appointmentId,
      { status: status },
      { returnDocument: "after" },
    )
      .populate("doctor")
      .populate("patient");

    if (!updatedAppointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    res.status(200).json({
      message: `Appointment status updated to ${status}`,
      data: updatedAppointment,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
