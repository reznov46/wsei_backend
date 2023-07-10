import axios from 'axios';
import { useEffect, useState } from 'react';
import { endpoints } from '../routes/routes';
import { FetchedData } from '../types/fetchedData';
import { ErrorResponse, UserByIdResponse } from '../types/responses';
import { UserDetails } from '../types/user';
import { emptyCurrentUser } from '../utils/emptyUser';
import { useGetToken } from './useGetToken';

interface UseGetUserByIdProps {
  id: string;
}

export const useGetUserById = ({
  id,
}: UseGetUserByIdProps): FetchedData<UserDetails> => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [user, setUser] = useState<UserDetails>(emptyCurrentUser);
  const { token } = useGetToken();

  useEffect(() => {
    if (token?.length) {
      axios
        .get(endpoints.user(id), {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response: UserByIdResponse) => {
          setUser(response.data);
          setIsLoading(false);
        })
        .catch((error: ErrorResponse) => {
          setError(error.response.data.error);
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
      setError('Please log in');
    }
  }, [token]);

  return {
    data: user,
    loading: isLoading,
    error,
  };
};
