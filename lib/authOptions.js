// lib/authOptions.ts
import CredentialsProvider from "next-auth/providers/credentials";
import { connectDB } from "@/lib/mongoose";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
        
      },
      async authorize(credentials) {
        await connectDB();
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing credentials");
        }

        const user = await User.findOne({ email: credentials.email.toLowerCase() });
        if (!user) throw new Error("No user found");

        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) throw new Error("Incorrect password");

        return { id: user._id.toString(), email: user.email,  name: `${user.firstName} ${user.lastName}` ,image:user.profileImage};
      }
    })
  ],

  session: { strategy: "jwt" },

  pages: {
    signIn: "/login"
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = (user).id;
        token.email = (user).email;
        token.name = (user).name;
        token.image = (user).image;
      }
      return token;
    },
   async session({ session, token }) {
  if (token) {
    const user = await User.findById(token.id); // fetch latest user from DB
    if (user) {
      session.user = {
        id: user._id.toString(),
        email: user.email,
        name: `${user.firstName} ${user.lastName}`,
        image: user.profileImage || null,
      };
    }
  }
  return session;
}
  },

  secret: process.env.NEXTAUTH_SECRET
};
