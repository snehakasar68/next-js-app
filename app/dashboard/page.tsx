"use client";

import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CustomToolbar from "../sidebar/customToolbar";
import MenuIcon from "@mui/icons-material/Menu";
import navigation from "../sidebar/navigation"; 
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { useRouter, usePathname } from "next/navigation";



export default function DashboardPage() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const router = useRouter();
  const pathname = usePathname();


  return (
   <p>Dashboard page!</p>
  );
}
