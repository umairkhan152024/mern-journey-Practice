// ============================================
// LESSON 11: server.js - Main entry point
// This is where everything comes together
// 1. Create Express app
// 2. Add middleware
// 3. Connect routes
// 4. Start listening
// ============================================

const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

// ============================================
// MIDDLEWARE
// express.json() = reads JSON request body
// must be added BEFORE routes
// ============================================
app.use(express.json());

// ============================================
// ROUTES
// import doctorRoutes from routes folder
// app.use("/doctors", doctorRoutes) means:
// ALL requests starting with /doctors
// go to doctorRoutes file
// ============================================
const doctorRoutes = require("./routes/doctorRoutes");

// attach doctor routes with /doctors prefix
app.use("/doctors", doctorRoutes);

// ============================================
// HOME ROUTE
// simple welcome message
// confirms server is running
// ============================================
app.get("/", function (req, res) {
  res.json({
    message: "Welcome to ZENOVA API!",
    version: "1.0.0",
  });
});

// ============================================
// START SERVER
// listen on PORT
// ============================================
app.listen(PORT, function () {
  console.log("ZENOVA server running on port", PORT);
});
