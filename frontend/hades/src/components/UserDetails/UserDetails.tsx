import React from 'react';
import { useGetCurrentUserDetails } from '../../hooks/useGetCurrentUserDetails';

export const UserDetails: React.FC = () => {
  const { data, loading, error } = useGetCurrentUserDetails();
  const {
    id,
    username,
    level,
    createdAt
  } = data;

  if (loading) {
    return <>loading</>
  }

  if (error) {
    return <>{error}</>
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