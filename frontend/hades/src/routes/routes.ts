import { useGetToken } from '../hooks/useGetToken';
import { Route } from '../types/route';

const DEFAULT_BACKEND_HOST =
  process.env.NODE_ENV === 'development' ? 'http://localhost:3001' : '';

export const endpoints = {
  login: `${DEFAULT_BACKEND_HOST}/login`,
  register: `${DEFAULT_BACKEND_HOST}/register`,
  currentUser: `${DEFAULT_BACKEND_HOST}/user-by-token`,
  users: `${DEFAULT_BACKEND_HOST}/users`,
  user: (id: string) => `${DEFAULT_BACKEND_HOST}/users/${id}`,
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
