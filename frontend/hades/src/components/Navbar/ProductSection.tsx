import React from 'react';
import { NavbarItem } from './NavbarItem';
import { productPanel } from './utils';
import { DefaultNavbarSection } from '../../types/navbar';

export const ProductSection: React.FC<DefaultNavbarSection> = ({
  open,
  isUserLogged,
  isAdmin
}) => {
  const panel = isUserLogged
    ? !isAdmin ? productPanel.slice(0, 3) : productPanel
    : [];

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