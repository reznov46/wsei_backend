import { LoginResponse } from '../../types/responses';
import { TOKEN_KEY } from '../consts';

export const setToken = (data: LoginResponse): void => {
  const { token } = data?.data;

  window.localStorage.setItem(TOKEN_KEY, token);

  //3 days
  const expire = new Date(
    new Date().getTime() + 3600000 * 24 * 3,
  ).toUTCString();

  document.cookie = `jwt=${encodeURI(token)}; expires=${expire};`;
};
