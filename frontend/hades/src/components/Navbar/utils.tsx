import HomeIcon from '@mui/icons-material/Home';
import LoginIcon from '@mui/icons-material/Login';
import PeopleIcon from '@mui/icons-material/People';
import LogoutIcon from '@mui/icons-material/Logout';
import DetailsIcon from '@mui/icons-material/Details';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import CategoryIcon from '@mui/icons-material/Category';
import { routeBuilder } from "../../routes/routes";
import { NavbarElement } from "../../types/navbar";
import { getPageNumParam, getPageSizeParam } from '../../utils/defaultParams';

const productsRoute = `${routeBuilder.products}?${getPageNumParam(0)}&${getPageSizeParam(8)}`;

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

export const productPanel = [
  { text: 'Products', link: productsRoute, icon: <FormatListBulletedIcon /> },
  { text: 'Add Product', link: routeBuilder.addProduct, icon: <AddCircleIcon /> },
] as Array<NavbarElement>

export const categoryPanel = [
  { text: 'Categories', link: routeBuilder.categories, icon: <CategoryIcon /> },
  { text: 'Add Category', link: routeBuilder.addCategory, icon: <AddToPhotosIcon /> },
] as Array<NavbarElement>