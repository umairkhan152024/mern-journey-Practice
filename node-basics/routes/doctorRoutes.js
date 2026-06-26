// ============================================
// LESSON 11: Routes file
// Routes file ONLY defines which URL
// connects to which controller function
// No logic here - just routing
// Clean and simple
// ============================================

const express = require("express");

// express.Router() creates a mini router
// we attach routes to this router
// then export it for server.js to use
const router = express.Router();

// import all controller functions
const {
  getAllDoctors,
  getDoctorById,
  createDoctor,
  updateDoctor,
  deleteDoctor,
} = require("../controllers/doctorController");

// ============================================
// ROUTES - connecting URL to controller
// router.get/post/put/delete
// first argument  = URL path
// second argument = controller function to run
// ============================================

// GET all doctors → runs getAllDoctors function
router.get("/", getAllDoctors);

// GET one doctor → runs getDoctorById function
router.get("/:id", getDoctorById);

// POST create doctor → runs createDoctor function
router.post("/", createDoctor);

// PUT update doctor → runs updateDoctor function
router.put("/:id", updateDoctor);

// DELETE doctor → runs deleteDoctor function
router.delete("/:id", deleteDoctor);

// export router so server.js can use it
module.exports = router;
