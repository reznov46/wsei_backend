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