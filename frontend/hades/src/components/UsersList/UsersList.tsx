import React from 'react';
import { Grid, Typography } from '@mui/material';
import { useGetUsers } from '../../hooks/useGetUsers';
import { routeBuilder } from '../../routes/routes';
import { usersListStyles } from '../../styles/usersList';
import { UserLevel } from '../../types/user';
import { ErrorComponent } from '../Common/ErrorComponent';
import { Loader } from '../Common/Loader';
import { UserColumn } from './UserColumn';
import { FONT_FAMILY } from '../../utils/consts';

export const UsersList: React.FC = () => {
  const { data, loading, error } = useGetUsers();

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <ErrorComponent
        text={error}
        link={routeBuilder.home} />
    );
  }

  const getFilteredUsers = (level: UserLevel) =>
    data.filter((u) => u.level === level)

  return (
    <Grid container>
      <Grid item xs={12} style={usersListStyles.header}>
        <Typography
          variant="h3"
          fontFamily={FONT_FAMILY}
        >
          Users
        </Typography>
      </Grid>
      <Grid item xs={6} style={usersListStyles.subHeader}>
        <Typography
          variant="h4"
          fontFamily={FONT_FAMILY}
        >
          Simply Users
        </Typography>
      </Grid>
      <Grid item xs={6} style={usersListStyles.subHeader}>
        <Typography
          variant="h4"
          fontFamily={FONT_FAMILY}
        >
          Admins
        </Typography>
      </Grid>
      <UserColumn users={getFilteredUsers(UserLevel.user)} />
      <UserColumn users={getFilteredUsers(UserLevel.admin)} />
    </Grid>
  );
};
