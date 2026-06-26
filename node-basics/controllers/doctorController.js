// ============================================
// LESSON 11: Controllers
// Controller = handles logic for each route
// Keeps routes file clean and simple
// Each function = one API action
// ============================================

// ============================================
// GET all doctors
// This function runs when GET /doctors is called
// ============================================
const getAllDoctors = function (req, res) {
  // hardcoded for now - will come from MongoDB later
  const doctors = [
    { id: 1, name: "Dr. Ahmed", specialty: "Cardiology", city: "Islamabad" },
    { id: 2, name: "Dr. Sara", specialty: "Neurology", city: "Lahore" },
    { id: 3, name: "Dr. Ali", specialty: "Pediatrics", city: "Karachi" },
  ];

  res.status(200).json({
    message: "Doctors fetched successfully",
    count: doctors.length,
    data: doctors,
  });
};

// ============================================
// GET one doctor by id
// This function runs when GET /doctors/:id
// ============================================
const getDoctorById = function (req, res) {
  // get id from URL
  const doctorId = req.params.id;

  // hardcoded for now - will search MongoDB later
  const doctor = {
    id: doctorId,
    name: "Dr. Ahmed",
    specialty: "Cardiology",
    city: "Islamabad",
  };

  res.status(200).json({
    message: "Doctor found",
    data: doctor,
  });
};

// ============================================
// POST - create new doctor
// This function runs when POST /doctors
// ============================================
const createDoctor = function (req, res) {
  // get data from request body
  const { name, specialty, city } = req.body;

  // hardcoded id for now - MongoDB will auto generate later
  const newDoctor = {
    id: 4,
    name: name,
    specialty: specialty,
    city: city,
  };

  res.status(201).json({
    message: "Doctor created successfully",
    data: newDoctor,
  });
};

// ============================================
// PUT - update doctor
// This function runs when PUT /doctors/:id
// ============================================
const updateDoctor = function (req, res) {
  const doctorId = req.params.id;
  const { name, specialty, city } = req.body;

  const updatedDoctor = {
    id: doctorId,
    name: name,
    specialty: specialty,
    city: city,
  };

  res.status(200).json({
    message: "Doctor updated successfully",
    data: updatedDoctor,
  });
};

// ============================================
// DELETE - delete doctor
// This function runs when DELETE /doctors/:id
// ============================================
const deleteDoctor = function (req, res) {
  const doctorId = req.params.id;

  res.status(200).json({
    message: "Doctor deleted successfully",
    deletedId: doctorId,
  });
};

// ============================================
// Export all controller functions
// so routes file can use them
// ============================================
module.exports = {
  getAllDoctors,
  getDoctorById,
  createDoctor,
  updateDoctor,
  deleteDoctor,
};
