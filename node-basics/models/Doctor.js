// ============================================
// LESSON 15: Mongoose Schema and Model
// Schema = blueprint of data structure
// Model  = tool to interact with database
// ============================================

const mongoose = require("mongoose");

// ============================================
// STEP 1: Create a Schema
// Schema defines structure of each document
// Like a form with specific fields
// Each field has a type and rules
// ============================================
const doctorSchema = new mongoose.Schema(
  {
    // name field - must be a string, required
    name: {
      type: String,
      required: true, // cannot be empty
      trim: true, // removes extra spaces
    },

    // specialty field
    specialty: {
      type: String,
      required: true,
      trim: true,
    },

    // city field
    city: {
      type: String,
      required: true,
      trim: true,
    },

    // experience in years
    experience: {
      type: Number,
      required: true,
      min: 0, // minimum value 0
      max: 50, // maximum value 50
    },

    // is doctor available for appointments?
    available: {
      type: Boolean,
      default: true, // default value is true
    },

    // doctor's fee in PKR
    fee: {
      type: Number,
      required: true,
    },

    // email field - must be unique
    email: {
      type: String,
      required: true,
      unique: true, // no two doctors can have same email
      lowercase: true, // automatically converts to lowercase
    },
  },
  {
    // ============================================
    // timestamps option
    // automatically adds createdAt and updatedAt
    // fields to every document
    // ============================================
    timestamps: true,
  },
);

// ============================================
// STEP 2: Create a Model from Schema
// mongoose.model("Doctor", doctorSchema)
// "Doctor" = model name (MongoDB creates
// "doctors" collection automatically)
// doctorSchema = blueprint to use
// ============================================
const Doctor = mongoose.model("Doctor", doctorSchema);

// export model so other files can use it
module.exports = Doctor;
