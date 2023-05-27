import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useGetJwt } from '../../hooks/useGetJwt';
import { endpoints } from '../../routes/routes';

interface UserDetails {
  id: string;
  username: string;
  level: string;
  createdAt: string;
}

export const UserDetails: React.FC = () => {
  const [user, setUser] = useState<UserDetails>({
    id: '',
    username: '',
    level: '',
    createdAt: '',
  })
  const { jwt } = useGetJwt();

  useEffect(() => {
    if (jwt.length) {
      axios.post(endpoints.verify, {
        token: jwt
      })
        .then((response) => setUser(response.data.user))
        .catch(err => console.log(err))
    }
  }, [jwt])

  return (
    <div>
      <div>{user.id}</div>
      <div>{user.username}</div>
      <div>{user.level}</div>
      <div>{user.createdAt}</div>
    </div>
  )
}