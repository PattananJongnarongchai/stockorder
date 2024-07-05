
import * as React from "react";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import DashboardIcon from "@mui/icons-material/Dashboard";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import HistoryIcon from "@mui/icons-material/History";

export default function DrawerWithSidebar() {
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <List
      sx={{ width: "100%", maxWidth: 480, bgcolor: "background.paper" }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Stock Order System
        </ListSubheader>
      }
    >
      <ListItemButton href="/dashboard">
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Order Dashboard" />
      </ListItemButton>
      <ListItemButton href="/stock">
        <ListItemIcon>
          <Inventory2Icon />
        </ListItemIcon>
        <ListItemText primary="Order Stock" />
      </ListItemButton>
      <ListItemButton href="/history">
        <ListItemIcon>
          <HistoryIcon />
        </ListItemIcon>
        <ListItemText primary="Order History" />
      </ListItemButton>
    </List>
  );
}
