import React from 'react';
import { Box } from '@mui/material';
import { useParams } from 'react-router';
import { useGetUserById } from '../../hooks/getUserById';
import { routeBuilder } from '../../routes/routes';
import { userDetailsStyles } from '../../styles/userDetails';
import { ErrorComponent } from '../Common/ErrorComponent';
import { Loader } from '../Common/Loader';
import { UserDetailsCard } from './UserDetailsCard';

export const SelectedUserDetails: React.FC = () => {
  const { id } = useParams() as { id: string };

  const {
    data: user,
    loading,
    error
  } = useGetUserById({ id });

  if (loading) {
    return <Loader />
  };

  if (error) {
    return (
      <ErrorComponent
        text={error}
        link={routeBuilder.home}
      />
    )
  };

  return (
    <Box component='div' style={userDetailsStyles.div}>
      <UserDetailsCard user={user} redirectBack />
    </Box >
  );
};