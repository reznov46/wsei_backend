import React from 'react';
import {
  Avatar,
  Button,
  ListItem,
  ListItemAvatar,
  ListItemText
} from '@mui/material';
import { UserDetails, UserLevel } from '../../types/user';
import { convertDate } from '../../utils/convertDate';
import { usersStyles } from '../../styles/users';

export const UserItem: React.FC<{ user: UserDetails }> = ({
  user
}) => (
  <ListItem>
    <ListItemAvatar>
      <Avatar
        alt={user.username.toUpperCase()}
        src="/static/images/avatar/1.jpg"
      />
    </ListItemAvatar>
    <ListItemText
      primary={`${user.username}`}
      secondary={
        <>
          <span>
            {`Created at: ${convertDate(user.createdAt)}`}
          </span>
          <span style={usersStyles.id}>
            {`ID: ${user.id}`}
          </span>
        </>
      }
    />
    <Button
      size='small'
      style={usersStyles.button}>
      Details
    </Button>
    {user.level === UserLevel.user && (
      <Button
        size='small'
        color="error"
      >
        Remove
      </Button>
    )}
  </ListItem>
);