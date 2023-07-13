import { Route } from '../types/route';

const CERBER_HOST =
  process.env.NODE_ENV === 'development' ? 'http://localhost:3001' : '';

const ATHENA_HOST =
  process.env.NODE_ENV === 'development' ? 'http://localhost:3002' : '';

export const endpoints = {
  categories: `${ATHENA_HOST}/productCategories`,
  currentUser: `${CERBER_HOST}/user-by-token`,
  login: `${CERBER_HOST}/login`,
  products: `${ATHENA_HOST}/products`,
  register: `${CERBER_HOST}/register`,
  removeCategory: (id: string) => `${ATHENA_HOST}/productCategories/${id}`,
  users: `${CERBER_HOST}/users`,
  user: (id: string): string => `${CERBER_HOST}/users/${id}`,
};

export const routeBuilder = {
  addProduct: '/addProduct',
  addCategory: '/addCategory',
  categories: '/categories',
  details: '/details',
  home: '/',
  login: '/login',
  noPage: '*',
  register: '/register',
  users: '/users',
  userId: '/users' + '/:id',
  products: '/products',
} as Route;
