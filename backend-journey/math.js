// ============================================
// math.js - a helper file
// module.exports makes these functions
// available to other files that require() this
// ============================================

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

// export all three functions
module.exports = { add, subtract, multiply };
