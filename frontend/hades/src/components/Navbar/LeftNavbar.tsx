import React, { useState } from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { NAVBAR_WIDTH } from './consts';
import { navbarList } from './utils';
import { NavbarItem } from './NavbarItem';
import { AppBar, closedMixin, Drawer, DrawerHeader, openedMixin } from './materialUIhelpers';

// { text: 'Logout', link: '/logout', icon: <LogoutIcon /> },


export const LeftNavbar: React.FC = () => {
  const theme = useTheme();
  const [open, setOpen] = useState<boolean>(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <>
      <NavToolBar
        open={open}
        handleDrawerOpen={handleDrawerOpen}
      />
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </DrawerHeader>
        <List>
          {navbarList.map(({ text, link, icon }, index) => (
            <div key={index}>
              <NavbarItem
                open={open}
                icon={icon}
                text={text}
                link={link}
              />
            </div>
          ))}
        </List>
        <Divider />
      </Drawer>
    </>
  );
}

const NavToolBar: React.FC<{
  open: boolean,
  handleDrawerOpen: () => void
}> = ({
  open,
  handleDrawerOpen
}) => (
    <AppBar position="fixed" open={open}>
      <Toolbar>
        <IconButton
          color="inherit"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{
            ...(open && { display: 'none' }),
          }}
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );




