import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import LogoutButton from './LogoutButton';

const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Book Store
        </Typography>
        <LogoutButton />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
