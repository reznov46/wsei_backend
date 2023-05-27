import { LoginResponse } from '../../types/responses';
import { TOKEN_KEY } from '../consts';

export const setToken = (
  data: LoginResponse
): void =>
  window.localStorage.setItem(TOKEN_KEY, data.data.token)