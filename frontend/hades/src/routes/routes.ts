import { Route } from '../types/route';

const DEFAULT_BACKEND_HOST =
  process.env.NODE_ENV === 'development' ? 'http://localhost:3001' : '';

export const endpoints = {
  login: `${DEFAULT_BACKEND_HOST}/login`,
  register: `${DEFAULT_BACKEND_HOST}/register`,
  verify: `${DEFAULT_BACKEND_HOST}/verify`,
  users: `${DEFAULT_BACKEND_HOST}/users`,
};

export const routeBuilder = {
  details: '/details',
  home: '/',
  login: '/login',
  noPage: '*',
  register: '/register',
  users: '/users',
  userId: '/users' + '/:id',
} as Route;
