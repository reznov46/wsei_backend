import { useEffect, useState } from 'react';
import { JWT_KEY } from '../utils/consts';

interface Jwt {
  jwt: string
}

export const useGetJwt = (): Jwt => {
  const [jwt, setJwt] = useState<string>('');

  useEffect(() => {
    setJwt(window.localStorage.getItem(JWT_KEY) ?? '')
  });

  return { jwt }
}