import { CircularProgress } from '@mui/material';
import React from 'react';
import { loaderStyles } from '../../styles/loader';

export const Loader: React.FC = () => (
  <div style={loaderStyles}>
    <CircularProgress />
  </div>
);