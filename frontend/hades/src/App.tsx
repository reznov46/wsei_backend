import React from 'react';
import { AppNavigator } from './AppNavigator';
import { Box } from '@mui/material';
import { LeftNavbar } from './components/Navbar/LeftNavbar';

export const App: React.FC = () => (
  <Box sx={{ display: 'flex' }} component="main">
    <LeftNavbar />
    <AppNavigator />
  </Box>
);
