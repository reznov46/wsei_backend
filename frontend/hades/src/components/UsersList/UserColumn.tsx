import React from 'react';
import { Grid, List } from '@mui/material';
import { UserDetails } from '../../types/user';
import { UserItem } from './UserItem';

export const UserColumn: React.FC<{
  users: UserDetails[];
}> = ({ users }) => (
  <Grid item xs={6}>
    <Grid item xs={10}>
      <List>
        {users.map((user, i) => (
          <div key={user.id}>
            <UserItem user={user} />
          </div>
        ))}
      </List>
    </Grid>
  </Grid>
);
