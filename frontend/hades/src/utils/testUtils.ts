type Client = 'user' | 'admin';

export const getTestClient = (type: Client) => ({
  username: type,
  password: type
});