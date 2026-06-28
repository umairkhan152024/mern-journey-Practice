// ============================================
// LESSON 20: Patient Model
// Simple patient schema
// ============================================

const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema(
  {
    // patient name
    name: {
      type: String,
      required: true,
      trim: true,
    },

    // patient email
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    // patient phone number
    phone: {
      type: String,
      required: true,
    },

    // patient age
    age: {
      type: Number,
      required: true,
      min: 0,
      max: 120,
    },
  },
  {
    timestamps: true,
  },
);

const Patient = mongoose.model("Patient", patientSchema);
module.exports = Patient;
