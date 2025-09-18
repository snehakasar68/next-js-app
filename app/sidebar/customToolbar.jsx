"use client";

import React, { useState } from "react";
import { Avatar, Box, IconButton, Menu, MenuItem, Toolbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import { styled } from "@mui/material/styles";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "@/slices/themeSlice";
// import { toggleTheme } from "../Theme/themeSlice"; 

// Drawer width should match your Sidebar
const drawerWidth = 240;



const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));



const CustomToolbar= ({ handleDrawerOpen, open,className }) => {
  const { data: session } = useSession();
  const router = useRouter();
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.theme.mode);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const menuOpen = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLogout = async () => {
    setAnchorEl(null);
    await signOut({ callbackUrl: "/login" });
  };

  const handleProfile = () => {
    setAnchorEl(null);
    router.push("/profile");
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="fixed" open={open} >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{ mr: 2, ...(open && { display: "none" }) }}
        >
          <MenuIcon />
        </IconButton>

        <div className="flex justify-between w-full items-center">
          <p  className={className}>
            Hi {session?.user?.name ?? ""}
          </p>

          <div className="flex items-center">
            <Typography
              onClick={() => {
                dispatch(toggleTheme());
              }}
              className="cursor-pointer"
            >
               {mode === "light" ? "Dark" : "Light"}
            </Typography>

            <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
              <IconButton
                onClick={handleClick}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={menuOpen ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={menuOpen ? "true" : undefined}
              >
                <Avatar sx={{ width: 32, height: 32 }} className="uppercase">
                  {session?.user?.email?.[0] ?? "U"}
                </Avatar>
              </IconButton>
            </Box>

            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={menuOpen}
              onClose={handleClose}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <MenuItem onClick={handleProfile}>My Profile</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </div>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default CustomToolbar;
