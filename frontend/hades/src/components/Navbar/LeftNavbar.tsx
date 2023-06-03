import React, { useState, } from 'react';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import {
  Drawer,
  DrawerHeader,
  NavToolBar,
} from '../../utils/materialUIhelpers';
import { useGetCurrentUserDetails } from '../../hooks/useGetCurrentUserDetails';
import { UserLevel } from '../../types/user';
import { isAdmin } from '../../utils/functions';
import { useGetToken } from '../../hooks/useGetToken';
import { LoginSection } from './LoginSection';
import { NavbarList } from './NavbarList';

export const LeftNavbar: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const { data: { level } } = useGetCurrentUserDetails();
  const { token } = useGetToken();

  const handleDrawerOpen = () =>
    setOpen(true);

  const handleDrawerClose = () =>
    setOpen(false);

  return (
    <>
      <NavToolBar
        open={open}
        handleDrawerOpen={handleDrawerOpen}
      />
      <Drawer
        open={open}
        variant='permanent'
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </DrawerHeader>
        <List>
          <NavbarList
            open={open}
            isAdmin={isAdmin(level as UserLevel)}
            isUserLogged={Boolean(token?.length)}
          />
        </List>
        <Divider />
        <LoginSection
          open={open}
          isUserLogged={Boolean(token?.length)}
        />
      </Drawer>
    </>
  );
}