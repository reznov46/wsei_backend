import React from 'react';
import { DefaultNavbarSection } from '../../types/navbar';
import { NavbarItem } from './NavbarItem';
import { adminPanel, defaultPanel, userPanel } from './utils';

export const NavbarList: React.FC<DefaultNavbarSection> = ({
  open,
  isAdmin,
  isUserLogged
}) => {
  const panel = isUserLogged ?
    defaultPanel.concat(isAdmin ? adminPanel : userPanel) : defaultPanel;

  return (
    <>
      {panel.map((item, index) => (
        <div key={item.text + index}>
          <NavbarItem
            open={open}
            item={item}
          />
        </div>
      ))}
    </>
  )
}