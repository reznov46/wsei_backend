import { User, UserDetails } from '../types/user';

export const emptyUser = {
  username: '',
  password: '',
  id: '',
  jwt: '',
} as User;

export const emptyCurrentUser = {
  id: '',
  username: '',
  level: '',
  createdAt: '',
} as UserDetails;
