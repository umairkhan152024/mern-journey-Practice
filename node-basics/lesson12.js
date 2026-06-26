// ============================================
// LESSON 12: Validation with express-validator
// Validation = checking data before saving
// Never trust data coming from user/Postman
// Always validate first, then save
// ============================================

const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// ============================================
// Import validation tools from express-validator
// body   = validate fields in req.body
// validationResult = collect all errors
// ============================================
const { body, validationResult } = require("express-validator");

// ============================================
// VALIDATION RULES
// These are like form rules:
// name must not be empty
// specialty must not be empty
// city must not be empty
// age must be a number between 18 and 100
// ============================================
const doctorValidationRules = [
  // name field - must not be empty
  body("name").notEmpty().withMessage("Doctor name is required"),

  // specialty field - must not be empty
  body("specialty").notEmpty().withMessage("Specialty is required"),

  // city field - must not be empty
  body("city").notEmpty().withMessage("City is required"),

  // experience field - must be a number
  // must be between 0 and 50
  body("experience")
    .isNumeric()
    .withMessage("Experience must be a number")
    .isInt({ min: 0, max: 50 })
    .withMessage("Experience must be between 0 and 50 years"),
];

// ============================================
// POST /doctors with validation
// validation rules run as middleware
// BEFORE the main route function
// if errors exist - return 400 Bad Request
// if no errors - create doctor
// ============================================
app.post("/doctors", doctorValidationRules, function (req, res) {
  // validationResult checks if any rules failed
  const errors = validationResult(req);

  // if errors exist - send error response
  // do NOT save to database
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: "Validation failed",
      errors: errors.array(),
    });
  }

  // if we reach here - all validation passed
  const { name, specialty, city, experience } = req.body;

  const newDoctor = {
    id: 4,
    name: name,
    specialty: specialty,
    city: city,
    experience: experience,
  };

  res.status(201).json({
    message: "Doctor created successfully",
    data: newDoctor,
  });
});

app.listen(PORT, function () {
  console.log("ZENOVA server running on port", PORT);
});
