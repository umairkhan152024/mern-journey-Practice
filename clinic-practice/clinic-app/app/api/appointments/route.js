// ============================================
// FILE: app/api/appointments/route.js
// ============================================
// This file = a backend API endpoint
// URL: /api/appointments
//
// Two functions exported:
// POST → saves a new appointment
// GET  → returns all appointments
//
// This runs on the SERVER
// Can connect to databases
// User never sees this code
// ============================================

// temporary storage — resets when server restarts
// later we replace this with MongoDB
let appointments = [];

// =============================================
// POST function
// =============================================
// runs when someone sends a POST request
// to /api/appointments
//
// example: BookingForm submits →
// fetch("/api/appointments", { method: "POST", body: {...} })
// → THIS function runs
// =============================================
export async function POST(request) {
  try {
    // request.json() reads the data sent from the form
    // same as req.body in Express
    const body = await request.json();

    // validate — make sure required fields exist
    if (!body.patientName || !body.phone) {
      return Response.json(
        { error: "Name and phone are required" },
        { status: 400 },
      );
    }

    // create appointment object
    const appointment = {
      id: Date.now().toString(), // unique id based on timestamp
      patientName: body.patientName,
      phone: body.phone,
      service: body.service || "",
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    // save to our temporary array
    appointments.push(appointment);

    // log to terminal so you can see it working
    console.log("New appointment:", appointment.patientName);
    console.log("Total appointments:", appointments.length);

    // send success response back
    // status 201 = "Created" (standard for POST success)
    return Response.json({ success: true, appointment }, { status: 201 });
  } catch (error) {
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}

// =============================================
// GET function
// =============================================
// runs when someone sends a GET request
// to /api/appointments
//
// example: Admin dashboard loads →
// fetch("/api/appointments")
// → THIS function runs
// → returns all appointments
// =============================================
export async function GET() {
  // return all appointments as JSON
  return Response.json(appointments);
}
