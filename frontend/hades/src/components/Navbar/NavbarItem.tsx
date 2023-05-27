import React, { ReactNode } from 'react';
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  Typography,
  Tooltip
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
  link,
}) => (
  <Tooltip
    title={text}
    disableHoverListener={open}
    disableInteractive
  >
    <Link to={link}>
      <ListItem disablePadding>
        <ListItemButton>
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: open ? 3 : 'auto',
              justifyContent: 'center',
              marginTop: 1
            }}
          >
            {icon}
          </ListItemIcon>
          <Typography
            sx={{ opacity: open ? 1 : 0 }}
            style={{ width: '100%' }}>
            {text}
          </Typography>
        </ListItemButton>
      </ListItem>
    </Link>
  </Tooltip>
)

