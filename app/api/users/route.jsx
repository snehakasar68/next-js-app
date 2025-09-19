// app/api/users/route.js
import { NextResponse } from "next/server";
import { connectDB } from "../../../lib/mongoose.js";
import User from "../../../models/User.js";
import bcrypt from "bcryptjs";


export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    const { email, password, firstName,lastName } = body;

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password required" }, { status: 400 });
    }

    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return NextResponse.json({ error: "User already exists" }, { status: 409 });
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ email: email.toLowerCase(), password: hashed, firstName,lastName });
    return NextResponse.json({ id: user._id, email: user.email,firstName:user.firstName,lastName:user.lastName }, { status: 201 });
  } catch (err) {
    console.error(err);
   const message = err instanceof Error ? err.message : "Server error";
    return NextResponse.json({ error: message }, { status: 500 });  }
}

export async function GET() {
  try {
    await connectDB();
    const users = await User.find({}, { password: 0 });
    return NextResponse.json(users);
  } catch (err) {
 const message = err instanceof Error ? err.message : "Server error";
    return NextResponse.json({ error: message }, { status: 500 });  }
}
