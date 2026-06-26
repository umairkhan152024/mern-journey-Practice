// ============================================
// LESSON 14: MongoDB Local Connection
// connecting to local MongoDB on port 27017
// ============================================

const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT || 3000;

// load .env file variables
require("dotenv").config();

app.use(express.json());

// ============================================
// CONNECT TO MONGODB
// ============================================
mongoose
  .connect(process.env.MONGODB_URI)
  .then(function () {
    console.log("Connected to MongoDB successfully!");
    app.listen(PORT, function () {
      console.log("ZENOVA server running on port", PORT);
    });
  })
  .catch(function (error) {
    console.error("MongoDB connection failed:", error.message);
  });

// ============================================
// HOME ROUTE
// ============================================
app.get("/", function (req, res) {
  res.json({ message: "ZENOVA API running!" });
});

// ============================================
// DATABASE STATUS ROUTE
// ============================================
app.get("/db-status", function (req, res) {
  const state = mongoose.connection.readyState;

  const statusMap = {
    0: "Disconnected",
    1: "Connected",
    2: "Connecting",
    3: "Disconnecting",
  };

  res.json({
    status: statusMap[state],
    database: "zenova",
  });
});
