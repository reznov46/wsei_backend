import HomeIcon from '@mui/icons-material/Home';
import LoginIcon from '@mui/icons-material/Login';
import PeopleIcon from '@mui/icons-material/People';
import LogoutIcon from '@mui/icons-material/Logout';
import DetailsIcon from '@mui/icons-material/Details';
import { routeBuilder } from "../../routes/routes";
import { NavbarElement } from "../../types/navbar";

export const loginPanel = [
  { text: 'Login', link: routeBuilder.login, icon: <LoginIcon /> },
  { text: 'Register', link: routeBuilder.register, icon: <LoginIcon /> },
  { text: 'Logout', link: routeBuilder.login, icon: <LogoutIcon /> }
] as Array<NavbarElement>;;

export const defaultPanel = [
  { text: 'Home', link: routeBuilder.home, icon: <HomeIcon /> },
] as Array<NavbarElement>;

export const adminPanel = [
  { text: 'Details', link: routeBuilder.details, icon: <DetailsIcon /> },
  { text: 'Users', link: routeBuilder.users, icon: <PeopleIcon /> },
] as Array<NavbarElement>;

export const userPanel = [
  { text: 'Details', link: routeBuilder.details, icon: <DetailsIcon /> },
] as Array<NavbarElement>;