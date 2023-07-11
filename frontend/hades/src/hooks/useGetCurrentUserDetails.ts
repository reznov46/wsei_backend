import axios from 'axios';
import { useEffect, useState } from 'react';
import { endpoints } from '../routes/routes';
import { FetchedData } from '../types/fetchedData';
import { ErrorResponse, UserDetailsResponse } from '../types/responses';
import { UserDetails } from '../types/user';
import { emptyCurrentUser } from '../utils/emptyUser';
import { useGetToken } from './useGetToken';

export const useGetCurrentUserDetails = (): FetchedData<UserDetails> => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [currentUser, setCurrentUser] = useState<UserDetails>(emptyCurrentUser);
  const { token } = useGetToken();

  useEffect(() => {
    if (token?.length) {
      axios
        .get(endpoints.currentUser, {
          params: { token },
        })
        .then((response: UserDetailsResponse) => {
          setCurrentUser(response.data);
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
    data: currentUser,
    loading: isLoading,
    error,
  };
};
