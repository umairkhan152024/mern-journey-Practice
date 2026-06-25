// ============================================
// STEP 1: Load the http module
// http is built into Node - no npm install
// It lets us create a server
// ============================================
const http = require("http");

console.log("Step 1 done - http module loaded!");
// ============================================
// STEP 2: Create a server
// http.createServer creates a server
// The function inside runs every time
// someone visits your server in browser
// req = request (what browser is asking)
// res = response (what we send back)
// ============================================
const server = http.createServer(function (req, res) {
  // this line runs every time browser visits
  console.log("Step 2: Someone visited the server!");

  // res.end = send response back to browser
  // whatever you write here - browser shows it
  res.end("Hello from ZENOVA Server!");
});

console.log("Step 2 done - server created!");
// ============================================
// STEP 3: Start listening on a port
// server.listen tells server WHICH DOOR to use
// Port 3000 = door number 3000
// Without this - server exists but nobody
// can reach it - like a phone that's off
// ============================================
server.listen(3000, function () {
  // this runs ONCE when server starts
  // confirms server is ready and waiting
  console.log("Step 3: Server is ON - listening on port 3000");
  console.log("Step 3: Open browser and go to http://localhost:3000");
});
