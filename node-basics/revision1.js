// ============================================
// REVISION LESSON 1: Sync vs Async
// RULE: Synchronous = runs immediately, in order
//       Asynchronous = runs later, non-blocking
// ============================================

// ============================================
// EXAMPLE 1: Basic sync vs async
// ============================================
console.log("Example 1 START");

setTimeout(function () {
  // this runs AFTER 2 seconds - Node doesn't wait
  console.log("Example 1: I run after 2 seconds");
}, 2000);

console.log("Example 1 END"); // this runs immediately

// ============================================
// EXAMPLE 2: Zero delay still runs last
// Even setTimeout(0) runs AFTER all sync code
// This proves Node finishes sync code first
// ============================================
console.log("Example 2 START");

setTimeout(function () {
  // 0 milliseconds delay - but STILL runs last
  console.log("Example 2: Zero delay but still last!");
}, 0);

console.log("Example 2 END");

// ============================================
// EXAMPLE 3: Multiple timeouts - order matters
// Shorter delay runs before longer delay
// ============================================
console.log("Example 3 START");

setTimeout(function () {
  console.log("Example 3: I run after 3 seconds");
}, 3000);

setTimeout(function () {
  console.log("Example 3: I run after 1 second");
}, 1000);

setTimeout(function () {
  console.log("Example 3: I run after 2 seconds");
}, 2000);

console.log("Example 3 END");

// ============================================
// EXAMPLE 4: Real world analogy - food order
// You order food (async task starts)
// You don't stand and wait - you do other things
// Food arrives (callback runs)
// ============================================
console.log("Example 4: You walk into restaurant");

setTimeout(function () {
  // this is the "food arriving" callback
  console.log("Example 4: Your food has arrived - eat now!");
}, 1500);

console.log("Example 4: You sit down and look at menu");
console.log("Example 4: You talk to your friend");
// ============================================
// EXAMPLE 5: Nested timeouts
// Second timeout starts AFTER first one finishes
// This is how we chain async operations
// ============================================
console.log("Example 5 START");

setTimeout(function () {
  console.log("Example 5: First task done");

  // second timeout starts INSIDE first callback
  // it only begins after first one completes
  setTimeout(function () {
    console.log("Example 5: Second task done");

    // third timeout inside second
    setTimeout(function () {
      console.log("Example 5: Third task done - all finished!");
    }, 500);
  }, 500);
}, 500);

console.log("Example 5 END");
