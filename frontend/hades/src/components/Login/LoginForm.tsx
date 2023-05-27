import React, { useState } from 'react';
import axios from 'axios';
import { endpoints, routeBuilder } from '../../routes/routes';
import { FormCard } from '../Form/FormCard';
import { User } from '../../types/user';
import { useHistory } from 'react-router';
import { emptyUser } from '../../utils/emptyUser';
import { ErrorResponse } from '../../types/errorResponse';
import { LoginResponse } from '../../types/loginResponse';
import { JWT_KEY } from '../../utils/consts';

export const LoginForm: React.FC = () => {
  const [user, setUser] = useState<User>(emptyUser);
  const [error, setError] = useState<string>('');
  const history = useHistory();

  const handleSubmit = async () => {
    await axios.post(endpoints.login, user)
      .then((response: LoginResponse) => {
        history.push(routeBuilder.details)
        window.localStorage.setItem(JWT_KEY, response.data.token)
      })
      .catch((error: ErrorResponse) => setError(error.response.data));
  }

  return (
    <FormCard
      handleSubmit={handleSubmit}
      user={user}
      setUser={setUser}
      error={error}
    />
  )
}
