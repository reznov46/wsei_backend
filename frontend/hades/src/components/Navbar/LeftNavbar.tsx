import React, { useState, } from 'react';
import List from '@mui/material/List';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import {
  Drawer,
  DrawerHeader,
  NavToolBar,
} from '../../utils/helpers/materialUIhelpers';
import { useGetCurrentUserDetails } from '../../hooks/useGetCurrentUserDetails';
import { UserLevel } from '../../types/user';
import { isAdmin } from '../../utils/isAdmin';
import { useGetToken } from '../../hooks/useGetToken';
import { LoginSection } from './LoginSection';
import { NavbarList } from './NavbarList';
import {
  adminPanel,
  categoryPanel,
  defaultPanel,
  productPanel,
  userPanel
} from './utils';

export const LeftNavbar: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const { data: { level } } = useGetCurrentUserDetails();
  const { token } = useGetToken();

  const isUserLogged = token?.length;

  const handleDrawerOpen = () =>
    setOpen(true);

  const handleDrawerClose = () =>
    setOpen(false);

  const standardPanel = isUserLogged
    ? defaultPanel.concat(isAdmin(level as UserLevel) ? adminPanel : userPanel)
    : defaultPanel;

  const categoryNavPanel = isUserLogged
    ? isAdmin(level as UserLevel) ? categoryPanel : [categoryPanel[0]]
    : [];

  const productNavPanel = isUserLogged ? productPanel : [];

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
            panel={standardPanel}
          />
        </List>
        <NavbarList
          open={open}
          panel={productNavPanel}
        />
        <NavbarList
          open={open}
          panel={categoryNavPanel}
        />
        <LoginSection
          open={open}
          isUserLogged={Boolean(token?.length)}
        />
      </Drawer>
    </>
  );
};