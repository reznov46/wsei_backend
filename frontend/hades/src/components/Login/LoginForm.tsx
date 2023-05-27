import React, { useState } from 'react';
import axios from 'axios';
import { endpoints, routeBuilder } from '../../routes/routes';
import { FormCard } from '../FormCard';
import { User } from '../../types/user';
import { useHistory } from 'react-router';

export const LoginForm: React.FC = () => {
  const [user, setUser] = useState<User>({
    username: '',
    password: ''
  });

  const history = useHistory();

  // create hook
  const handleSubmit = async () => {
    await axios.post(endpoints.login, {
      username: user.username,
      password: user.password
    })
      .then(res => {
        console.log(res.data)
        history.push(routeBuilder.home);
      })
      .catch(err => console.log(err))

    setUser({
      username: '',
      password: ''
    });

  }

  return (
    <FormCard
      handleSubmit={handleSubmit}
      user={user}
      setUser={setUser}
    />
  )
}
