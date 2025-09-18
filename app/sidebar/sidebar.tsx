"use client";

import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CustomToolbar from "./customToolbar";
import MenuIcon from "@mui/icons-material/Menu";
import navigation from "./navigation"; 
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { useRouter, usePathname } from "next/navigation";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function DashboardPage({ children,className }: { children: React.ReactNode,className?:string}) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const router = useRouter();
  const pathname = usePathname();

  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);

  return (
    <Box sx={{ display: "flex" }} >
      <CustomToolbar handleDrawerOpen={handleDrawerOpen} open={open} className={className}/>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? <MenuIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <List>
          {navigation.map((nav, index) => {
            const isActive = pathname.includes(nav.url);
            return (
              <ListItem key={index}>
                <ListItemButton
                  onClick={() => router.push(nav.url)}
                  selected={isActive}
                >
                  <ListItemIcon>{nav?.icon}</ListItemIcon>
                  <ListItemText primary={nav?.title} />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Drawer>
      <Main open={open} className="mt-[64px]">
       {children}
      </Main>
    </Box>
  );
}
