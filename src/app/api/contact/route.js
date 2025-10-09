import { NextResponse } from "next/server";
import ContactMessage from "@/models/Contact";
import connectDB from "@/database/mongodb";

// ✅ POST — Save new message
export async function POST(req) {
  try {
    await connectDB();

    const data = await req.json();

    const newMessage = await ContactMessage.create({
      ...data,
      status: "new",
    });

    return NextResponse.json({ success: true, data: newMessage }, { status: 201 });
  } catch (err) {
    console.error("POST /contact error:", err);
    return NextResponse.json({ success: false, error: "Failed to save message" }, { status: 500 });
  }
}

// ✅ GET — Fetch all messages
export async function GET() {
  try {
    await connectDB();

    const messages = await ContactMessage.find().sort({ createdAt: -1 });

    return NextResponse.json({ success: true, data: messages }, { status: 200 });
  } catch (err) {
    console.error("GET /contact error:", err);
    return NextResponse.json({ success: false, error: "Failed to fetch messages" }, { status: 500 });
  }
}
