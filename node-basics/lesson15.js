// ============================================
// LESSON 15: Testing Schema and Model
// Connecting to MongoDB and using Doctor model
// ============================================

const mongoose = require("mongoose");
const Doctor = require("./models/Doctor");

require("dotenv").config();

// ============================================
// CONNECT TO MONGODB
// ============================================
mongoose
  .connect(process.env.MONGODB_URI)
  .then(async function () {
    console.log("Connected to MongoDB!");

    // ============================================
    // TEST 1: Create a new doctor
    // new Doctor({}) = creates doctor object
    // doctor.save() = saves to database
    // ============================================
    const doctor = new Doctor({
      name: "Dr. Ahmed Hassan",
      specialty: "Cardiology",
      city: "Islamabad",
      experience: 10,
      available: true,
      fee: 2000,
      email: "ahmed.balouch@zenova.com",
    });

    // save to database
    const savedDoctor = await doctor.save();
    console.log("Doctor saved successfully!");
    console.log("Doctor ID:", savedDoctor._id);
    console.log("Doctor Name:", savedDoctor.name);
    console.log("Created At:", savedDoctor.createdAt);

    // ============================================
    // TEST 2: Find all doctors
    // Doctor.find() = get all doctors from database
    // ============================================
    const allDoctors = await Doctor.find();
    console.log("Total doctors in database:", allDoctors.length);

    // close connection after done
    mongoose.connection.close();
    console.log("Connection closed.");
  })
  .catch(function (error) {
    console.error("Error:", error.message);
  });
