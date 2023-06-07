import React from 'react';
import { Box } from '@mui/material';
import { useGetCurrentUserDetails } from '../../hooks/useGetCurrentUserDetails';
import { ErrorComponent } from '../Common/ErrorComponent';
import { Loader } from '../Common/Loader';
import { userDetailsStyles } from '../../styles/userDetails';
import { routeBuilder } from '../../routes/routes';
import { UserDetailsCard } from './UserDetailsCard';

export const CurrentUserDetails: React.FC = () => {
  const {
    data: user,
    loading,
    error
  } = useGetCurrentUserDetails();

  if (loading) {
    return <Loader />
  };

  if (error) {
    return (
      <ErrorComponent
        text={error}
        link={routeBuilder.login}
      />
    )
  };

  return (
    <Box component='div' style={userDetailsStyles.div}>
      <UserDetailsCard user={user} />
    </Box >
  );
};