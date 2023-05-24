import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { routes } from '../../utils/routes';

export const LoginForm: React.FC = () => {
  const [isLogged, setIsLogged] = useState<boolean>(false);

  useEffect(() => {
    axios.post(routes.login, {
      username: 'user',
      password: 'user'
    })
      .then(res => setIsLogged(!!res.data))
      .catch(err => console.log(err))
  }, [isLogged])


  // axios.post(routes.login, {
  //   username: 'user',
  //   password: 'user'
  // })
  //   .then(res => console.log(res.data))
  //   .catch(err => console.log(err))

  return <>{'Login Component'}</>
}