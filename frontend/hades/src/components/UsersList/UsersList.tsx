import React from 'react';
import { Grid } from '@mui/material';
import { useGetUsers } from '../../hooks/useGetUsers';
import { routeBuilder } from '../../routes/routes';
import { usersListStyles } from '../../styles/usersList';
import { UserLevel } from '../../types/user';
import { ErrorComponent } from '../Common/ErrorComponent';
import { Loader } from '../Common/Loader';
import { UserColumn } from './UserColumn';

export const UsersList: React.FC = () => {
  const { data, loading, error } = useGetUsers();

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorComponent text={error} link={routeBuilder.home} />;
  }

  const users = data.filter((u) => u.level === UserLevel.user);
  const admins = data.filter((u) => u.level === UserLevel.admin);

  return (
    <Grid container>
      <Grid item xs={12} style={usersListStyles.header}>
        <h1>Users</h1>
      </Grid>
      <Grid item xs={6} style={usersListStyles.subHeader}>
        <h2>Simply Users</h2>
      </Grid>
      <Grid item xs={6} style={usersListStyles.subHeader}>
        <h2>Admins</h2>
      </Grid>
      <UserColumn users={users} />
      <UserColumn users={admins} />
    </Grid>
  );
};
