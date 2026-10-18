// ============================================
// LESSON 5: HTTP Module - Raw Server
// Built-in Node module - no npm install needed
// This is what Express is built on top of
// ============================================

const http = require("http");

// ============================================
// createServer - creates a server
// callback runs on EVERY incoming request
// req = request from browser (what they want)
// res = response we send back
// ============================================
const server = http.createServer(function (req, res) {
  // log every request
  console.log("Request received:", req.url);

  // ============================================
  // ROUTING - different response for different URLs
  // req.url = the path after localhost:3000
  // ============================================
  if (req.url === "/") {
    // 200 = success
    // Content-Type = what kind of data we're sending
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Welcome to ZENOVA Clinic!");
  } else if (req.url === "/about") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("ZENOVA - Best Clinic in Islamabad!");
  } else if (req.url === "/doctors") {
    // sending JSON data
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        doctors: ["Dr. Ahmed", "Dr. Sara", "Dr. Ali"],
      }),
    );
  } else {
    // 404 = not found
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("404 - Page Not Found!");
  }
});

// ============================================
// listen - start server on port 3000
// callback runs once when server starts
// ============================================
server.listen(3000, function () {
  console.log("Server running at http://localhost:3000");
});
