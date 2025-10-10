import { NextResponse } from "next/server";
import Booking, { BookingStatus } from "@/models/Booking";
import connectDB from "@/database/mongodb";

/**
 * ✅ CORS Headers
 */
const corsHeaders = {
  "Access-Control-Allow-Origin": "*", // Allow all origins
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

/**
 * ✅ OPTIONS — Handle Preflight Request
 */
export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: corsHeaders });
}

/**
 * ✅ POST — Create a new booking
 */
export async function POST(req) {
  try {
    await connectDB();
    const data = await req.json();

    // Basic validation
    if (!data.name || !data.email || !data.service || !data.date) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400, headers: corsHeaders }
      );
    }

    const bookingId = `BK-${Date.now()}`;

    const newBooking = await Booking.create({
      bookingId,
      ...data,
      status: BookingStatus.PENDING,
    });

    return NextResponse.json(
      { success: true, data: newBooking },
      { status: 201, headers: corsHeaders }
    );
  } catch (err) {
    console.error("POST /api/booking error:", err);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500, headers: corsHeaders }
    );
  }
}

/**
 * ✅ GET — Fetch all bookings (sorted latest first)
 */
export async function GET() {
  try {
    await connectDB();

    const bookings = await Booking.find().sort({ createdAt: -1 });

    return NextResponse.json(
      { success: true, count: bookings.length, data: bookings },
      { status: 200, headers: corsHeaders }
    );
  } catch (err) {
    console.error("GET /api/booking error:", err);
    return NextResponse.json(
      { success: false, error: "Failed to fetch bookings" },
      { status: 500, headers: corsHeaders }
    );
  }
}
