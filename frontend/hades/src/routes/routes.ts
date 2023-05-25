import { Route } from "../types/route";

const DEFAULT_BACKEND_HOST =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : '';

export const endpoints = {
  login: `${DEFAULT_BACKEND_HOST}/login`,
  register: `${DEFAULT_BACKEND_HOST}/register`,
} as Route

export const routeBuilder = {
  home: '/',
  login: '/login',
  noPage: '*',
  register: '/register',
  users: '/users'
} as Route