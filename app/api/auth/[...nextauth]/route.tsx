// app/api/auth/[...nextauth]/route.js
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectDB } from "@/lib/mongoose";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { authOptions } from "@/lib/authOptions";


const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
