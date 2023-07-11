import React, { ReactNode } from 'react';

export interface LoginSectionProps {
  isUserLogged: boolean;
  open: boolean;
}

export interface DefaultNavbarSection {
  open: boolean;
  panel: Array<NavbarElement>;
}

export interface ProductSectionProps {
  open: boolean;
}

export interface NavbarItemProps {
  open: boolean;
  item: NavbarElement;
  handleOnClick?: () => void;
}

export interface NavbarElement {
  text: string;
  link: string;
  icon: ReactNode;
}
