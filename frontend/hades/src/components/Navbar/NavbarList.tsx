import { Divider } from '@mui/material';
import React from 'react';
import { DefaultNavbarSection } from '../../types/navbar';
import { NavbarItem } from './NavbarItem';

export const NavbarList: React.FC<DefaultNavbarSection> = ({
  open,
  panel
}) => (
  <>
    {panel.map((item, index) => (
      <div key={item.text + index}>
        <NavbarItem
          open={open}
          item={item}
        />
      </div>
    ))}
    {panel.length > 0 && (
      <Divider />
    )}
  </>
);