"use client"
// DrawerWithSidebar.tsx
import React, { useState } from "react";
import { Drawer, IconButton, Box } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Sidebar from "../sidebar/index"; // ตรวจสอบว่า path ถูกต้อง

const DrawerWithSidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      setIsOpen(open);
    };

  return (
    <div>
      <IconButton
        onClick={toggleDrawer(true)}
        edge="start"
        color="inherit"
        aria-label="menu"
      >
        <MenuIcon />
      </IconButton>
      <Drawer
        anchor="left"
        open={isOpen}
        onClose={toggleDrawer(false)}
        sx={{ width: 240, flexShrink: 0 }}
        ModalProps={{ keepMounted: true }} // Better open performance on mobile.
      >
        <Box sx={{ width: 240 }}>
          <Sidebar />
        </Box>
      </Drawer>
    </div>
  );
};

export default DrawerWithSidebar;
