// ============================================
// LESSON 4: fs Module - File System
// Built-in Node module - no npm install needed
// Lets you read, write, delete files
// All operations are ASYNC by default
// ============================================

const fs = require("fs");

// ============================================
// WRITE a file
// fs.writeFile(filename, content, callback)
// callback runs after file is written
// if file exists - it OVERWRITES it
// ============================================
fs.writeFile("test.txt", "Hello from Node.js!", function (error) {
  if (error) {
    console.log("Error writing file:", error);
    return;
  }

  console.log("File written successfully!");

  // ============================================
  // READ the file we just created
  // must be INSIDE writeFile callback
  // because we need to wait for write to finish
  // "utf8" = return text not raw bytes
  // ============================================
  fs.readFile("test.txt", "utf8", function (error, data) {
    if (error) {
      console.log("Error reading file:", error);
      return;
    }

    console.log("File content:", data);

    // ============================================
    // APPEND to the file
    // adds content without overwriting
    // ============================================
    fs.appendFile("test.txt", "\nNew line added!", function (error) {
      if (error) {
        console.log("Error appending:", error);
        return;
      }

      console.log("Content appended!");

      // read again to see updated content
      fs.readFile("test.txt", "utf8", function (error, data) {
        console.log("Updated content:", data);
      });
    });
  });
});
