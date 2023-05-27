import React, { useState } from 'react';
import axios from 'axios';
import { endpoints, routeBuilder } from '../../routes/routes';
import { FormCard } from '../Form/FormCard';
import { User } from '../../types/user';
import { useHistory } from 'react-router';
import { emptyUser } from '../../utils/emptyUser';
import { ErrorResponse } from '../../types/responses';

export const RegisterForm: React.FC = () => {
  const [user, setUser] = useState<User>(emptyUser);
  const [error, setError] = useState<string>('');
  const history = useHistory();

  const handleSubmit = async () => {
    await axios.post(endpoints.register, user)
      .then(() => history.push(routeBuilder.login))
      .catch((error: ErrorResponse) => setError(error.response.data));
  }

  return (
    <FormCard
      handleSubmit={handleSubmit}
      user={user}
      error={error}
      setUser={setUser}
    />
  )
}