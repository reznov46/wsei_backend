import React, { useState } from 'react';
import axios from 'axios';
import { endpoints, routeBuilder } from '../../routes/routes';
import { IdentityFormCard } from './IdentityFormCard';
import { User } from '../../types/user';
import { useHistory } from 'react-router';
import { emptyUser } from '../../utils/emptyUser';
import { ErrorResponse } from '../../types/responses';

export const RegisterForm: React.FC = () => {
  const [user, setUser] = useState<User>(emptyUser);
  const [error, setError] = useState<string>('');
  const history = useHistory();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();

    await axios.post(endpoints.register, user)
      .then(() => history.push(routeBuilder.login))
      .catch((error: ErrorResponse) => setError(error.response.data));
  }

  return (
    <IdentityFormCard
      handleSubmit={handleSubmit}
      user={user}
      error={error}
      setUser={setUser}
      header='Register'
    />
  )
}