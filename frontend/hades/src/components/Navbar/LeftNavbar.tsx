import React, { useState } from 'react';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { navbarList } from './utils';
import { NavbarItem } from './NavbarItem';
import {
  Drawer,
  DrawerHeader,
  NavToolBar,
} from './materialUIhelpers';

export const LeftNavbar: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const logoutElement = navbarList[navbarList.length - 1];

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
          {navbarList.slice(0, navbarList.indexOf(logoutElement))
            .map((item, index) => (
              <div key={index}>
                <NavbarItem
                  open={open}
                  {...item}
                />
              </div>
            ))
          }
        </List>
        <Divider />
        <div style={{ marginTop: 'auto' }}>
          <NavbarItem
            open={open}
            {...logoutElement}
          />
        </div>
      </Drawer>
    </>
  );
}