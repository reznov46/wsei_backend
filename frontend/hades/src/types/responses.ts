import { Product } from './product';
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
  data: UserDetails;
}
export interface UsersResponse {
  data: UserDetails[];
}

export interface UserByIdResponse {
  data: UserDetails;
}

export interface ProductResponse {
  data: Product[];
}
