import { Category } from './category';
import { Product } from './product';
import { UserDetails } from './user';

export type ErrorResponse = {
  response: {
    data: {
      message: string;
      statusCode: number;
      error: string;
    };
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

export interface CategoryResponse {
  data: Category[];
}
