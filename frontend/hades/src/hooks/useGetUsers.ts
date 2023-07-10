import axios from 'axios';
import { useEffect, useState } from 'react';
import { endpoints } from '../routes/routes';
import { FetchedData } from '../types/fetchedData';
import { ErrorResponse, UsersResponse } from '../types/responses';
import { UserDetails } from '../types/user';
import { useGetToken } from './useGetToken';

export const useGetUsers = (): FetchedData<UserDetails[]> => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [users, setUsers] = useState<UserDetails[]>([]);
  const { token } = useGetToken();

  useEffect(() => {
    axios
      .get(endpoints.users, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response: UsersResponse) => {
        setUsers(response.data);
        setIsLoading(false);
      })
      .catch((error: ErrorResponse) => {
        setError(error.response.data.error);
        console.log(error);
        setIsLoading(false);
      });
  }, []);

  return {
    data: users,
    loading: isLoading,
    error,
  };
};
