import { NextResponse } from "next/server";
import Booking, { BookingStatus } from "@/models/Booking";
import connectDB from "@/database/mongodb";

// ✅ POST — Create a new booking
export async function POST(req) {
  try {
    await connectDB();

    const data = await req.json();
    const bookingId = `BK-${Date.now()}`;

    const newBooking = await Booking.create({
      bookingId,
      ...data,
      status: BookingStatus.PENDING,
    });

    return NextResponse.json({ success: true, data: newBooking }, { status: 201 });
  } catch (err) {
    console.error("POST /booking error:", err);
    return NextResponse.json(
      { success: false, error: "Booking creation failed" },
      { status: 500 }
    );
  }
}

// ✅ GET — Fetch all bookings
export async function GET() {
  try {
    await connectDB();

    const bookings = await Booking.find().sort({ createdAt: -1 });

    return NextResponse.json({ success: true, data: bookings }, { status: 200 });
  } catch (err) {
    console.error("GET /booking error:", err);
    return NextResponse.json(
      { success: false, error: "Failed to fetch bookings" },
      { status: 500 }
    );
  }
}
