import { TOKEN_KEY } from '../consts';

export const getToken = (): string =>
  window.localStorage.getItem(TOKEN_KEY) ?? ''