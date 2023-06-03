import React from 'react';
import {
  Avatar,
  Card,
  ListItemAvatar,
  ListItemText,
} from '@mui/material';
import { UserDetails } from '../../types/user';
import { convertDate } from '../../utils/convertDate';
import { usersStyles } from '../../styles/users';

export const UserItem: React.FC<{ user: UserDetails }> = ({ user }) => (
  <Card elevation={8} style={usersStyles.card}>
    <ListItemAvatar>
      <Avatar alt={user.username.toUpperCase()} src=" " />
    </ListItemAvatar>
    <ListItemText
      primary={`${user.username}`}
      secondary={
        <>
          <span>{`Created at: ${convertDate(user.createdAt)}`}</span>
          <span style={usersStyles.id}>{`ID: ${user.id}`}</span>
        </>
      }
    />
  </Card>
);
