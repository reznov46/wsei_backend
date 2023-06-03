import React from 'react';
import { Grid } from '@mui/material';
import { useGetUsers } from '../../hooks/useGetUsers';
import { routeBuilder } from '../../routes/routes';
import { usersStyles } from '../../styles/users';
import { UserLevel } from '../../types/user';
import { ErrorComponent } from '../ErrorComponent/ErrorComponent';
import { Loader } from '../Loader/Loader';
import { UserColumn } from './UserColumn';

export const Users: React.FC = () => {
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
      <Grid item xs={12} style={usersStyles.header}>
        <h1>Users</h1>
      </Grid>
      <Grid item xs={6} style={usersStyles.subHeader}>
        <h2>Simply Users</h2>
      </Grid>
      <Grid item xs={6} style={usersStyles.subHeader}>
        <h2>Admins</h2>
      </Grid>
      <UserColumn users={users} />
      <UserColumn users={admins} />
    </Grid>
  );
};
