import { useEffect, useState } from 'react';
import { JWT_KEY } from '../utils/consts';

interface Jwt {
  jwt: string | undefined
}

export const useGetJwt = (): Jwt => {
  const [jwt, setJwt] = useState<string | undefined>('');

  useEffect(() => {
    setJwt(window.localStorage.getItem(JWT_KEY) ?? '')
  });

  return { jwt }
}