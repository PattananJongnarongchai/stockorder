import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import DrawerWithSidebar from '../sidebar/drawer';

// Props include the onToggleSidebar function passed from the parent component
export default function Header({ onToggleSidebar }) {
  return (
    <AppBar position="static">
      <Toolbar>
        <DrawerWithSidebar/>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Stock Order System
        </Typography>
        <Button color='inherit'>Sign In</Button>
      </Toolbar>
    </AppBar>
  );
}
