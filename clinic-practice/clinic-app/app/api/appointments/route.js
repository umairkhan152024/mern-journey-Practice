// ============================================
// FILE: app/api/appointments/route.js
// ============================================
// NOW CONNECTED TO MONGODB
// appointments are saved permanently
// no longer lost on server restart
// ============================================
import connectDB from "@/lib/mongodb";
import Appointment from "@/models/Appointment";

// =============================================
// POST — save new appointment to MongoDB
// =============================================
export async function POST(request) {
  try {
    // connect to MongoDB first
    await connectDB();

    // read form data from request
    const body = await request.json();

    // validate required fields
    if (!body.patientName || !body.phone) {
      return Response.json(
        { error: "Name and phone are required" },
        { status: 400 },
      );
    }

    // =============================================
    // create and save to MongoDB
    // =============================================
    // Appointment.create() does two things:
    // 1. creates a new appointment object
    // 2. saves it to MongoDB immediately
    // =============================================
    const appointment = await Appointment.create({
      patientName: body.patientName,
      phone: body.phone,
      service: body.service || "",
      status: "pending",
    });

    // log to terminal
    console.log("Saved to MongoDB:", appointment.patientName);

    // send success response
    return Response.json({ success: true, appointment }, { status: 201 });
  } catch (error) {
    console.log("Error:", error);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}

// =============================================
// GET — fetch all appointments from MongoDB
// =============================================
export async function GET() {
  try {
    // connect to MongoDB
    await connectDB();

    // =============================================
    // Appointment.find({})
    // =============================================
    // find() fetches ALL documents from MongoDB
    // {} means no filter — get everything
    // sort({ createdAt: -1 }) = newest first
    // =============================================
    const appointments = await Appointment.find({}).sort({ createdAt: -1 });

    return Response.json(appointments);
  } catch (error) {
    console.log("Error:", error);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
