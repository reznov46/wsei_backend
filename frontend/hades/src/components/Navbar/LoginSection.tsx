import React from 'react';
import { LoginSectionProps } from '../../types/navbar';
import { removeToken } from '../../utils/token/removeToken';
import { NavbarItem } from './NavbarItem';
import { loginPanel } from './utils';

export const LoginSection: React.FC<LoginSectionProps> = ({
  isUserLogged,
  open
}) => (
  <div style={{ marginTop: 'auto' }}>
    {!isUserLogged ?
      loginPanel.slice(0, 2).map((item, index) => (
        <div key={item.text + index}>
          <NavbarItem
            open={open}
            item={item}
          />
        </div>
      ))
      : (
        <NavbarItem
          open={open}
          handleOnClick={removeToken}
          item={loginPanel[loginPanel.length - 1]}
        />
      )}
  </div>
);