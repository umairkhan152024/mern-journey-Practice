// Lesson 9: literal types (exact allowed values)

// Only these three exact strings are allowed
let appointmentStatus: "pending" | "approved" | "rejected";
appointmentStatus = "approved";

// A role limited to three exact values
let role: "doctor" | "patient" | "admin" = "doctor";

console.log(appointmentStatus, role);

// Mini-test 1 (deliberate error, commented out): "done" is not an allowed value
// appointmentStatus = "done";

// Mini-test 2 (deliberate error, commented out): typo in the role
// role = "docter";
