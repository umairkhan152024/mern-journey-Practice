// ============================================
// LESSON 13: Error Handling Middleware
// Catches ALL errors in your Express app
// Prevents server from crashing
// Sends clean error response to client
// Must have 4 parameters: err, req, res, next
// Must be added LAST - after all routes
// ============================================

const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

// converts incoming JSON text to JavaScript object
// must be added before all routes
app.use(express.json());

// ============================================
// ROUTE 1: Normal working route
// everything works fine here
// ============================================
app.get("/", function (req, res) {
  res.json({ message: "ZENOVA API is running!" });
});

// ============================================
// ROUTE 2: Route that throws an error
// simulates database crash or file not found
// try = attempt something risky
// catch = if it fails, catch the error
// next(error) = pass error to error middleware
// ============================================
app.get("/crash", function (req, res, next) {
  try {
    // simulating something going wrong
    throw new Error("Database connection failed!");
  } catch (error) {
    // pass error to error handling middleware
    next(error);
  }
});

// ============================================
// ROUTE 3: Async error example
// async = function that does async operations
// await = wait for async operation to finish
// Promise.reject = simulates async failure
// ============================================
app.get("/async-crash", async function (req, res, next) {
  try {
    // simulating async database query failing
    const result = await Promise.reject(new Error("MongoDB query failed!"));
    res.json({ data: result });
  } catch (error) {
    // always use next(error) in catch blocks
    next(error);
  }
});

// ============================================
// 404 HANDLER
// runs when NO route matches the URL
// must be AFTER all routes
// must be BEFORE error handling middleware
// ============================================
app.use(function (req, res, next) {
  res.status(404).json({
    message: "Route not found",
    url: req.url,
  });
});

// ============================================
// ERROR HANDLING MIDDLEWARE
// MUST have exactly 4 parameters: err, req, res, next
// Express recognizes error middleware by 4 params
// must be LAST - after everything else
// err = the error that was thrown
// ============================================
app.use(function (err, req, res, next) {
  // log error in terminal for debugging
  console.error("ERROR CAUGHT:", err.message);

  // send clean response to client
  // never show sensitive details to user
  res.status(500).json({
    message: "Something went wrong",
    error: err.message,
  });
});

app.listen(PORT, function () {
  console.log("ZENOVA server running on port", PORT);
});
