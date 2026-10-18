// ============================================
// LESSON 7: GET, POST, PUT, DELETE Routes
// These are the 4 HTTP methods
// GET    = read data
// POST   = create data
// PUT    = update data
// DELETE = delete data
// ============================================

const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

// ============================================
// Fake database - array of jobs
// Later we'll replace this with MongoDB
// ============================================
let jobs = [
  { id: 1, title: "React Developer", company: "TechCorp", city: "Islamabad" },
  { id: 2, title: "Node.js Developer", company: "StartupX", city: "Lahore" },
  { id: 3, title: "Full Stack Developer", company: "Agency", city: "Karachi" },
];

// ============================================
// GET /jobs - get ALL jobs
// READ operation
// ============================================
app.get("/jobs", function (req, res) {
  res.status(200).json({
    message: "Jobs fetched successfully",
    count: jobs.length,
    data: jobs,
  });
});

// ============================================
// GET /jobs/:id - get ONE job by id
// :id = dynamic parameter from URL
// req.params.id = actual id value from URL
// ============================================
app.get("/jobs/:id", function (req, res) {
  // get id from URL
  const id = parseInt(req.params.id);

  // find job with matching id
  const job = jobs.find(function (j) {
    return j.id === id;
  });

  // if job not found
  if (!job) {
    return res.status(404).json({ message: "Job not found" });
  }

  res.status(200).json({
    message: "Job found",
    data: job,
  });
});

// ============================================
// POST /jobs - CREATE a new job
// data comes from req.body
// need Postman to test this
// ============================================
app.post("/jobs", function (req, res) {
  // get data from request body
  const { title, company, city } = req.body;

  // create new job object
  const newJob = {
    id: jobs.length + 1, // simple id generation
    title: title,
    company: company,
    city: city,
  };

  // add to our fake database
  jobs.push(newJob);

  res.status(201).json({
    message: "Job created successfully",
    data: newJob,
  });
});

// ============================================
// PUT /jobs/:id - UPDATE a job
// find job by id, update with new data
// ============================================
app.put("/jobs/:id", function (req, res) {
  const id = parseInt(req.params.id);
  const { title, company, city } = req.body;

  // find index of job to update
  const index = jobs.findIndex(function (j) {
    return j.id === id;
  });

  // if job not found
  if (index === -1) {
    return res.status(404).json({ message: "Job not found" });
  }

  // update job
  jobs[index] = { id: id, title: title, company: company, city: city };

  res.status(200).json({
    message: "Job updated successfully",
    data: jobs[index],
  });
});

// ============================================
// DELETE /jobs/:id - DELETE a job
// find job by id, remove from array
// ============================================
app.delete("/jobs/:id", function (req, res) {
  const id = parseInt(req.params.id);

  // find index of job to delete
  const index = jobs.findIndex(function (j) {
    return j.id === id;
  });

  // if job not found
  if (index === -1) {
    return res.status(404).json({ message: "Job not found" });
  }

  // remove job from array
  const deletedJob = jobs.splice(index, 1);

  res.status(200).json({
    message: "Job deleted successfully",
    data: deletedJob[0],
  });
});

app.listen(PORT, function () {
  console.log("Server running on port", PORT);
});
