// ============================================
// LESSON 9: Middleware
// Middleware = function that runs between
// request and response
// app.use() = register middleware
// next() = pass control to next middleware
// Without next() - request gets STUCK forever
// ============================================

const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// ============================================
// MIDDLEWARE 1: Logger
// Runs on EVERY request automatically
// Logs method and URL to terminal
// next() passes request to next middleware
// or to the route handler
// ============================================
app.use(function (req, res, next) {
  // get current time
  const time = new Date().toLocaleTimeString();

  // log every request details
  console.log(`[${time}] ${req.method} ${req.url}`);

  // MUST call next() - otherwise request stops here
  // next() = "I'm done, pass to next function"
  next();
});

// ============================================
// MIDDLEWARE 2: Maintenance mode check
// If maintenance mode is ON - block all requests
// Send 503 Service Unavailable
// If OFF - let request through with next()
// ============================================
const maintenanceMode = true; // change to true to test

app.use(function (req, res, next) {
  if (maintenanceMode === true) {
    // block request - don't call next()
    res.status(503).json({
      message: "ZENOVA Clinic API is under maintenance. Try again later.",
    });
  } else {
    // let request through
    next();
  }
});

// ============================================
// ROUTES - these run AFTER middleware
// ============================================
app.get("/", function (req, res) {
  res.json({ message: "Welcome to ZENOVA API!" });
});

app.get("/doctors", function (req, res) {
  res.json({ message: "Doctors list", data: ["Dr. Ahmed", "Dr. Sara"] });
});

app.listen(PORT, function () {
  console.log("ZENOVA server running on port", PORT);
});
