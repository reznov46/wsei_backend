import axios from 'axios';
import React, { useState } from 'react';
import { ErrorResponse } from '../types/responses';
import { refresh } from '../utils/refresh';
import { useGetToken } from './useGetToken';

interface UseRemoveItemResult {
  removeItem: () => Promise<void>;
  isError: boolean;
}

export const useRemoveItem = (endpoint: string) => {
  const [isError, setIsError] = useState<boolean>(false);
  const { token } = useGetToken();

  const removeItem = async (): Promise<void> => {
    await axios
      .delete(endpoint, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => refresh())
      .catch((error: ErrorResponse) => setIsError(!!error));
  };

  return { removeItem, isError };
};
