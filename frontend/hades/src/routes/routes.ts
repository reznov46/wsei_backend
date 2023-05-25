import { Route } from "../types/route";

const DEFAULT_BACKEND_HOST =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : '';

const DEFAULT_ROUTE =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3003'
    : '';

export const endpoints = {
  login: `${DEFAULT_BACKEND_HOST}/login`,
  register: `${DEFAULT_BACKEND_HOST}/register`,
  users: `${DEFAULT_BACKEND_HOST}/users`,
} as Route

export const routeBuilder = {
  login: `${DEFAULT_ROUTE}/login`,
  register: `${DEFAULT_ROUTE}/register`,
  users: `${DEFAULT_ROUTE}/users`,
} as Route