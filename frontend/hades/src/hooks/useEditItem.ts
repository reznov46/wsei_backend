import axios from 'axios';
import { useState } from 'react';
import { ErrorResponse } from '../types/responses';
import { refresh } from '../utils/refresh';
import { useGetToken } from './useGetToken';

interface UseEditItemArgs {
  endpoint: string;
  body: Body;
}

type Body = {
  [x: string]: string;
};

interface UseEditItemResult {
  editItem: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
  isError: boolean;
}

export const useEditItem = ({
  endpoint,
  body,
}: UseEditItemArgs): UseEditItemResult => {
  const [isError, setIsError] = useState<boolean>(false);
  const { token } = useGetToken();

  const editItem = async (
    event: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    event.preventDefault();
    event.stopPropagation();

    await axios
      .patch(endpoint, body, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => refresh())
      .catch((error: ErrorResponse) => console.log(error));
  };

  return { editItem, isError };
};
