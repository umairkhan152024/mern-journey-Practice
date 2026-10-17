// ============================================
// LESSON 1: Sync vs Async + Event Loop
// Sync  = runs immediately, line by line
// Async = runs later, Node moves on without waiting
// Event Loop = brings async task back when done
// ============================================

// SYNC: runs immediately
console.log("1. First - nodemon works!");
console.log("2. Second - nodemon works!");

// ASYNC: Node sends to background, moves on
setTimeout(function () {
  console.log("3. Third - ran after 2 seconds");
}, 2000);

// SYNC: runs immediately
console.log("2. Second");
