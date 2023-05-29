import { UserDetails } from './user';

export type ErrorResponse = {
  response: {
    data: string;
  };
};

export type LoginResponse = {
  data: {
    token: string;
  };
};

export interface UserDetailsResponse {
  data: {
    user: UserDetails;
  };
}
export interface UsersResponse {
  data: {
    users: UserDetails[];
  };
}
