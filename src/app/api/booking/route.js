// import { NextResponse } from "next/server";
// import Booking, { BookingStatus } from "@/models/Booking";
// import connectDB from "@/database/mongodb";

// /**
//  * ✅ CORS Headers
//  */
// const corsHeaders = {
//   "Access-Control-Allow-Origin": "*", // Allow all origins
//   "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
//   "Access-Control-Allow-Headers": "Content-Type, Authorization",
// };

// /**
//  * ✅ OPTIONS — Handle Preflight Request
//  */
// export async function OPTIONS() {
//   return new NextResponse(null, { status: 204, headers: corsHeaders });
// }

// /**
//  * ✅ POST — Create a new booking
//  */
// export async function POST(req) {
//   try {
//     await connectDB();
//     const data = await req.json();

//     // Basic validation
//     if (!data.name || !data.email || !data.service || !data.date) {
//       return NextResponse.json(
//         { success: false, error: "Missing required fields" },
//         { status: 400, headers: corsHeaders }
//       );
//     }

//     const bookingId = `BK-${Date.now()}`;

//     const newBooking = await Booking.create({
//       bookingId,
//       ...data,
//       status: BookingStatus.PENDING,
//     });

//     return NextResponse.json(
//       { success: true, data: newBooking },
//       { status: 201, headers: corsHeaders }
//     );
//   } catch (err) {
//     console.error("POST /api/booking error:", err);
//     return NextResponse.json(
//       { success: false, error: "Internal Server Error" },
//       { status: 500, headers: corsHeaders }
//     );
//   }
// }

// /**
//  * ✅ GET — Fetch all bookings (sorted latest first)
//  */
// export async function GET() {
//   try {
//     await connectDB();

//     const bookings = await Booking.find().sort({ createdAt: -1 });

//     return NextResponse.json(
//       { success: true, count: bookings.length, data: bookings },
//       { status: 200, headers: corsHeaders }
//     );
//   } catch (err) {
//     console.error("GET /api/booking error:", err);
//     return NextResponse.json(
//       { success: false, error: "Failed to fetch bookings" },
//       { status: 500, headers: corsHeaders }
//     );
//   }
// }

import { NextResponse } from "next/server";
import Booking, { BookingStatus } from "@/models/Booking";
import connectDB from "@/database/mongodb";

/**
 * ✅ CORS Headers
 */
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
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

    console.log("Received booking data:", data);

    // ✅ Updated validation according to your schema
    if (
      !data.bookingId ||
      !data.webName ||
      !data.formData ||
      !data.formData.firstName ||
      !data.formData.lastName ||
      !data.formData.email ||
      !data.formData.phone ||
      !data.formData.date ||
      !data.totalPrice === undefined ||
      !data.discountedPrice === undefined ||
      !data.submittedAt ||
      !data.vehicleCount === undefined
    ) {
      console.log("Missing fields:", {
        bookingId: !data.bookingId,
        webName: !data.webName,
        formData: !data.formData,
        firstName: !data.formData?.firstName,
        lastName: !data.formData?.lastName,
        email: !data.formData?.email,
        phone: !data.formData?.phone,
        date: !data.formData?.date,
        totalPrice: !data.totalPrice,
        discountedPrice: !data.discountedPrice,
        submittedAt: !data.submittedAt,
        vehicleCount: !data.vehicleCount,
      });

      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400, headers: corsHeaders }
      );
    }

    // ✅ Check if bookingId already exists
    const existingBooking = await Booking.findOne({
      bookingId: data.bookingId,
    });
    if (existingBooking) {
      return NextResponse.json(
        { success: false, error: "Booking ID already exists" },
        { status: 409, headers: corsHeaders }
      );
    }

    // ✅ Create new booking with proper structure
    const newBooking = await Booking.create({
      bookingId: data.bookingId,
      webName: data.webName,
      formData: {
        vehicleBookings: data.formData.vehicleBookings || [],
        firstName: data.formData.firstName,
        lastName: data.formData.lastName,
        email: data.formData.email,
        phone: data.formData.phone,
        address: data.formData.address || "",
        city: data.formData.city || "",
        state: data.formData.state || "",
        zip: data.formData.zip || "",
        date: data.formData.date,
        timeSlot: data.formData.timeSlot || "",
        notes: data.formData.notes || "",
      },
      totalPrice: data.totalPrice,
      discountedPrice: data.discountedPrice,
      discountApplied: data.discountApplied || false,
      discountPercent: data.discountPercent || 0,
      promoCode: data.promoCode || null,
      submittedAt: data.submittedAt,
      vehicleCount: data.vehicleCount,
      status: BookingStatus.PENDING,
    });

    console.log("Booking created successfully:", newBooking.bookingId);

    return NextResponse.json(
      {
        success: true,
        data: newBooking,
        message: "Booking created successfully",
      },
      { status: 201, headers: corsHeaders }
    );
  } catch (err) {
    console.error("POST /api/booking error:", err);

    // ✅ Handle duplicate key error
    if (err.code === 11000) {
      return NextResponse.json(
        { success: false, error: "Booking ID already exists" },
        { status: 409, headers: corsHeaders }
      );
    }

    // ✅ Handle validation errors
    if (err.name === "ValidationError") {
      const errors = Object.values(err.errors).map((error) => error.message);
      return NextResponse.json(
        { success: false, error: `Validation failed: ${errors.join(", ")}` },
        { status: 400, headers: corsHeaders }
      );
    }

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
      {
        success: true,
        count: bookings.length,
        data: bookings,
      },
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
