import React from 'react';
import { useGetCurrentUserDetails } from '../../hooks/useGetCurrentUserDetails';
import { ErrorComponent } from '../Common/ErrorComponent';
import { Loader } from '../Common/Loader';

export const UserDetails: React.FC = () => {
  const { data, loading, error } = useGetCurrentUserDetails();
  const {
    id,
    username,
    level,
    createdAt
  } = data;

  if (loading) {
    return <Loader />
  }

  if (error) {
    return <ErrorComponent text={error} />
  }

  return (
    <div>
      <div>{id}</div>
      <div>{username}</div>
      <div>{level}</div>
      <div>{createdAt}</div>
    </div>
  )
}