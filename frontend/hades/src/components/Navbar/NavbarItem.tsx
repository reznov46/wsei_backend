import React from 'react';
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  Typography,
  Tooltip
} from '@mui/material';
import { Link } from 'react-router-dom';
import { NavbarItemProps } from '../../types/navbar';
import { navbarStyles } from '../../styles/navbar';

export const NavbarItem: React.FC<NavbarItemProps> = ({
  open,
  item,
  handleOnClick
}) => {
  const { text, link, icon } = item;

  return (
    <Tooltip
      title={text}
      disableHoverListener={open}
      disableInteractive
    >
      <Link to={link}>
        <ListItem disablePadding onClick={handleOnClick}>
          <ListItemButton>
            <ListItemIcon
              sx={{
                mr: open ? 3 : 'auto',
                ...navbarStyles.listItemIcon
              }}
            >
              {icon}
            </ListItemIcon>
            <Typography
              sx={{ opacity: open ? 1 : 0 }}
            >
              {text}
            </Typography>
          </ListItemButton>
        </ListItem>
      </Link>
    </Tooltip>
  )
}

