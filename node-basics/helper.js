// ============================================
// LESSON 2: module.exports - "putting things
// outside your door for neighbors to use"
// ============================================

// EXAMPLE 1: Exporting a single function
function greet(name) {
  // simple greeting function
  return "Hello " + name + ", welcome to ZENOVA!";
}

// module.exports makes this function available
// to any file that requires this file
module.exports = greet;
