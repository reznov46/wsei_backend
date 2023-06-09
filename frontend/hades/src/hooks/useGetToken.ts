import { useEffect } from 'react';
import { useLocation } from 'react-router';
import { TOKEN_KEY } from '../utils/consts';

interface UseGetTokenResult {
  token: string | null;
}

export const useGetToken = (): UseGetTokenResult => {
  const path = useLocation().pathname;
  let token = window.localStorage.getItem(TOKEN_KEY);

  useEffect(() => {
    token = window.localStorage.getItem(TOKEN_KEY) ?? '';
  }, [path]);

  return { token };
};
