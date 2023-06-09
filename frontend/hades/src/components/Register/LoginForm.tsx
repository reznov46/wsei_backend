import React, { useState } from 'react';
import axios from 'axios';
import { endpoints, routeBuilder } from '../../routes/routes';
import { IdentityFormCard } from './IdentityFormCard';
import { User } from '../../types/user';
import { useHistory } from 'react-router';
import { emptyUser } from '../../utils/emptyUser';
import { ErrorResponse, LoginResponse } from '../../types/responses';
import { setToken } from '../../utils/token/setToken';

export const LoginForm: React.FC = () => {
  const [user, setUser] = useState<User>(emptyUser);
  const [error, setError] = useState<string>('');
  const history = useHistory();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    event.stopPropagation();

    await axios
      .post(endpoints.login, user)
      .then((response: LoginResponse) => {
        history.push(routeBuilder.details);
        setToken(response);
      })
      .catch((error: ErrorResponse) => {
        let errorMessage = error.response.data.message;
        if (error.response.data.statusCode === 401) {
          errorMessage = 'Incorrect username or password'
        }
        setError(errorMessage as string)
      });
  };

  return (
    <IdentityFormCard
      handleSubmit={handleSubmit}
      user={user}
      setUser={setUser}
      error={error}
      header="Login"
    />
  );
};