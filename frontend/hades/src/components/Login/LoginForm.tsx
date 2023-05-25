import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { endpoints } from '../../routes/routes';
import { getTestClient } from '../../utils/testUtils';

export const LoginForm: React.FC = () => {
  const [isLogged, setIsLogged] = useState<boolean>(false);

  useEffect(() => {
    axios.post(endpoints.login, getTestClient('user'))
      .then(res => setIsLogged(!!res.data))
      .catch(err => console.log(err))
  }, [isLogged])

  return <>{'Login Component'}</>
}