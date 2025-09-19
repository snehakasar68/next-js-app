// components/SidebarWrapper.tsx
"use client";
import { useSession } from "next-auth/react";
import SideBar from "./sidebar";

export default function SidebarWrapper({ children }) {
  const { data: session } = useSession();
  return session ? <SideBar>{children}</SideBar> : children;
}
