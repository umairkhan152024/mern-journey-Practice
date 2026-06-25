// ============================================
// LESSON 8: HTTP Methods - GET, POST, PUT, DELETE
// Every API endpoint has a METHOD + ROUTE
// METHOD = what action (read/create/update/delete)
// ROUTE  = which resource (/doctors, /patients)
// ============================================

const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

// ============================================
// IMPORTANT: express.json() middleware
// Allows Express to read JSON data sent
// in POST and PUT request body
// Without this - req.body will be undefined
// Must be added BEFORE your routes
// ============================================
app.use(express.json());

// ============================================
// GET /doctors
// READ - get all doctors
// Browser or React calls this to show doctors list
// ============================================
app.get("/doctors", function (req, res) {
  const doctors = [
    { id: 1, name: "Dr. Ahmed", specialty: "Cardiology" },
    { id: 2, name: "Dr. Sara", specialty: "Neurology" },
    { id: 3, name: "Dr. Ali", specialty: "Pediatrics" },
  ];

  // 200 = success
  res.status(200).json({
    message: "Doctors fetched successfully",
    data: doctors,
  });
});

// ============================================
// POST /doctors
// CREATE - add a new doctor
// React sends new doctor data in request body
// req.body = data sent by React/Postman
// ============================================
app.post("/doctors", function (req, res) {
  // req.body = data React sent us
  const newDoctor = req.body;

  console.log("New doctor received:", newDoctor);

  // 201 = created successfully
  res.status(201).json({
    message: "Doctor created successfully",
    data: newDoctor,
  });
});

// ============================================
// PUT /doctors/:id
// UPDATE - update existing doctor
// :id = dynamic parameter (doctor's id)
// req.params.id = the actual id from URL
// ============================================
app.put("/doctors/:id", function (req, res) {
  // getting id from URL
  const doctorId = req.params.id;

  // getting updated data from request body
  const updatedData = req.body;

  console.log("Updating doctor id:", doctorId);
  console.log("Updated data:", updatedData);

  res.status(200).json({
    message: "Doctor updated successfully",
    id: doctorId,
    data: updatedData,
  });
});

// ============================================
// DELETE /doctors/:id
// DELETE - remove a doctor
// :id = which doctor to delete
// ============================================
app.delete("/doctors/:id", function (req, res) {
  // getting id from URL
  const doctorId = req.params.id;

  console.log("Deleting doctor id:", doctorId);

  res.status(200).json({
    message: "Doctor deleted successfully",
    id: doctorId,
  });
});

app.listen(PORT, function () {
  console.log("ZENOVA API running on port", PORT);
});
