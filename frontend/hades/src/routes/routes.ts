import { Route } from '../types/route';

const CERBER_HOST =
  process.env.NODE_ENV === 'development' ? 'http://localhost:3001' : '';

const ATHENA_HOST =
  process.env.NODE_ENV === 'development' ? 'http://localhost:3002' : '';

export const endpoints = {
  currentUser: `${CERBER_HOST}/user-by-token`,
  login: `${CERBER_HOST}/login`,
  userProducts: `${ATHENA_HOST}/products`,
  register: `${CERBER_HOST}/register`,
  users: `${CERBER_HOST}/users`,
  user: (id: string): string => `${CERBER_HOST}/users/${id}`,
};

export const routeBuilder = {
  details: '/details',
  home: '/',
  login: '/login',
  noPage: '*',
  register: '/register',
  users: '/users',
  userId: '/users' + '/:id',
  userProducts: '/users' + '/:id' + '/products',
} as Route;
