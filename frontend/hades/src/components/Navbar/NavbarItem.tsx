import React, { ReactNode } from 'react';
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { Link } from 'react-router-dom';

interface NavbarItemProps {
  open: boolean;
  icon: ReactNode,
  text: string;
  link: string;
}

export const NavbarItem: React.FC<NavbarItemProps> = ({
  open,
  icon,
  text,
  link
}) => (
  <ListItem disablePadding sx={{ display: 'block' }}>
    <ListItemButton>
      <ListItemIcon
        sx={{
          minWidth: 0,
          mr: open ? 3 : 'auto',
          justifyContent: 'center',
        }}
      >
        {icon}
      </ListItemIcon>
      <ListItemText
        primary={
          <Link to={link}>{text}</Link>
        }
        sx={
          { opacity: open ? 1 : 0 }
        }
      />
    </ListItemButton>
  </ListItem>
)
