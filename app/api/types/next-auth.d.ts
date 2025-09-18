import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string; // now TypeScript knows session.user has id
    } & DefaultSession["user"];
  }
}
