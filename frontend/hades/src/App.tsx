import React from 'react';
import { AppNavigator } from './AppNavigator';
import { Box } from '@mui/material';
import { LeftNavbar } from './components/Navbar/LeftNavbar';
import { appStyles } from './styles/app';

export const App: React.FC = () => (
  <Box sx={{ ...appStyles.box }}>
    <LeftNavbar />
    <AppNavigator />
  </Box>
);
