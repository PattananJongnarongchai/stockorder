// src/components/Header.tsx
"use client";

import React, { useContext, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Menu,
  MenuItem,
  IconButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useRouter } from "next/router";
import AuthContext from "../../contexts/AuthContext";

interface HeaderProps {
  onToggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ onToggleSidebar }) => {
  const authContext = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const router = useRouter();

  if (!authContext) {
    return null;
  }

  const { isAuthenticated, user, logout } = authContext;

  const handleLogout = () => {
    logout();
    setAnchorEl(null);
    router.push("/login");
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" style={{ background: "#616e38 " }}>
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={onToggleSidebar}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Stock Order System
        </Typography>
        {isAuthenticated && user?.username ? (
          <>
            <Button color="inherit" onClick={handleMenuOpen}>
              {user.username}
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={() => router.push(`/UserSetting/${user.id}`)}>
                ตั้งค่าผู้ใช้
              </MenuItem>

              <MenuItem onClick={handleLogout}>ออกจากระบบ</MenuItem>
            </Menu>
          </>
        ) : (
          <Button color="inherit" onClick={() => router.push("/login")}>
            เข้าสู่ระบบ
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
