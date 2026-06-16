// fs is a built-in Node module - no install needed
// just require it directly
const fs = require("fs");

// ============================================
// PART 1: WRITE a file
// fs.writeFile creates a new file (or overwrites if exists)
// Arguments: (filename, content, callback function)
// ============================================
fs.writeFile("message.txt", "Hello from Node.js!", function (error) {
  // callback runs AFTER file is written
  // if something went wrong, error will have details
  // if everything is fine, error will be null
  if (error) {
    console.log("Error writing file:", error);
    return;
  }

  console.log("File written successfully!");

  // ============================================
  // PART 2: READ the file we just created
  // fs.readFile reads file contents
  // "utf8" means return text, not raw bytes
  // ============================================
  fs.readFile("message.txt", "utf8", function (error, data) {
    if (error) {
      console.log("Error reading file:", error);
      return;
    }

    // data contains the file content as a string
    console.log("File content:", data);
  });
});
