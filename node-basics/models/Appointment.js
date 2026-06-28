// ============================================
// LESSON 20: Appointment Model
// This model connects Doctor and Patient
// Uses REFERENCES - stores IDs not full objects
// ============================================

const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    // ============================================
    // RELATIONSHIP FIELDS
    // Instead of storing full doctor/patient info
    // we store their MongoDB IDs (references)
    // mongoose.Schema.Types.ObjectId = MongoDB ID type
    // ref: "Doctor" = which model this ID belongs to
    // ============================================

    // which doctor this appointment is with
    // stores Doctor's _id
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor", // reference to Doctor model
      required: true,
    },

    // which patient booked this appointment
    // stores Patient's _id
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient", // reference to Patient model
      required: true,
    },

    // appointment date
    date: {
      type: Date,
      required: true,
    },

    // appointment time
    time: {
      type: String,
      required: true,
    },

    // reason for visit
    reason: {
      type: String,
      required: true,
    },

    // appointment status
    status: {
      type: String,
      // only these values allowed
      enum: ["pending", "confirmed", "cancelled", "completed"],
      default: "pending", // default is pending
    },

    // fee for this appointment
    fee: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Appointment = mongoose.model("Appointment", appointmentSchema);
module.exports = Appointment;
