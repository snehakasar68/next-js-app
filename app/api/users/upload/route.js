import { NextResponse } from "next/server";
import { connectDB } from "../../../../lib/mongoose";
import User from "../../../../models/User";
import fs from "fs";
import path from "path";

export const config = {
  api: { bodyParser: false }, // important
};

export async function PATCH(req) {
  try {
    await connectDB();

    const formData = await req.formData();
    const id = formData.get("id")?.toString();
    const file = formData.get("profileImage") ;

    if (!id) return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    if (!file) return NextResponse.json({ error: "No file uploaded" }, { status: 400 });

    // Ensure upload folder exists
    const uploadDir = path.join(process.cwd(), "public/uploads");
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

    // Convert File to buffer and save
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const filePath = path.join(uploadDir, file.name);
    fs.writeFileSync(filePath, buffer);

    const publicPath = "/uploads/" + file.name;

    // Update user in DB
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { profileImage: publicPath },
      { new: true }
    );

    if (!updatedUser) return NextResponse.json({ error: "User not found" }, { status: 404 });

    return NextResponse.json({ profileImage: publicPath }, { status: 200 });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
