import { ReactNode } from "react";
import HomeIcon from '@mui/icons-material/Home';
import LoginIcon from '@mui/icons-material/Login';
import PeopleIcon from '@mui/icons-material/People';
import LogoutIcon from '@mui/icons-material/Logout';
import DetailsIcon from '@mui/icons-material/Details';
import { routeBuilder } from "../../routes/routes";

interface NavbarList {
  text: string;
  link: string;
  icon: ReactNode
}

export const navbarList = [
  { text: 'Home', link: routeBuilder.home, icon: <HomeIcon /> },
  { text: 'Login', link: routeBuilder.login, icon: <LoginIcon /> },
  { text: 'Register', link: routeBuilder.register, icon: <LoginIcon /> },
  { text: 'Details', link: 'details', icon: <DetailsIcon /> },
  { text: 'Users', link: routeBuilder.users, icon: <PeopleIcon /> },
  { text: 'Logout', link: '/logout', icon: <LogoutIcon /> }
] as Array<NavbarList>