import axios from 'axios';
import { useEffect, useState } from 'react';
import { endpoints } from '../routes/routes';
import { FetchedData } from '../types/fetchedData';
import { ErrorResponse, UsersResponse } from '../types/responses';
import { UserDetails } from '../types/user';

export const useGetUsers = (): FetchedData<UserDetails[]> => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [users, setUsers] = useState<UserDetails[]>([]);

  useEffect(() => {
    axios
      .get(endpoints.users, {
        withCredentials: true,
      })
      .then((response: UsersResponse) => {
        const { users } = response.data;
        setUsers(users);
        setIsLoading(false);
      })
      .catch((error: ErrorResponse) => {
        setError(error.response.data);
        setIsLoading(false);
      });
  }, []);

  return {
    data: users,
    loading: isLoading,
    error,
  };
};
