import { TOKEN_KEY } from '../consts';

export const removeToken = () => window.localStorage.removeItem(TOKEN_KEY);
