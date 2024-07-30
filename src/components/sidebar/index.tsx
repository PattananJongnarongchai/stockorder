// src/components/Sidebar.tsx

import React, { useContext } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import BadgeIcon from "@mui/icons-material/Badge";
import HistoryIcon from "@mui/icons-material/History";
import { useRouter } from "next/router";
import AuthContext from "../../contexts/AuthContext";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const authContext = useContext(AuthContext);
  const router = useRouter();

  if (!authContext) {
    return null;
  }

  const { user } = authContext;

  const handleNavigation = (path: string) => {
    router.push(path);
    onClose();
  };

  return (
    <Drawer open={isOpen} onClose={onClose}>
      <List
        sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            Stock Order System
          </ListSubheader>
        }
      >
        <ListItem button onClick={() => handleNavigation("/dashboard")}>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="แดชน์บอร์ด" />
        </ListItem>
        {user?.role === "admin" && (
          <ListItem button onClick={() => handleNavigation("/stock")}>
            <ListItemIcon>
              <Inventory2Icon />
            </ListItemIcon>
            <ListItemText primary="รายการสินค้า" />
          </ListItem>
        )}
        <ListItem button onClick={() => handleNavigation("/history")}>
          <ListItemIcon>
            <HistoryIcon />
          </ListItemIcon>
          <ListItemText primary="ประวัติสินค้า" />
        </ListItem>
        <ListSubheader component="div" id="nested-list-subheader">
          User Management
        </ListSubheader>
        <ListItem button onClick={() => handleNavigation("/employees")}>
          <ListItemIcon>
            <BadgeIcon />
          </ListItemIcon>
          <ListItemText primary="ข้อมูลพนักงาน" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
