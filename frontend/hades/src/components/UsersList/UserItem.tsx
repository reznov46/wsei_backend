import React from 'react';
import { useHistory } from 'react-router';
import {
  Avatar,
  Card,
  CardContent,
  ListItemAvatar,
  useTheme,
} from '@mui/material';
import { UserDetails } from '../../types/user';
import { convertDate } from '../../utils/convertDate';
import { usersListStyles } from '../../styles/usersList';
import { routeBuilder } from '../../routes/routes';

export const UserItem: React.FC<{ user: UserDetails }> = ({ user }) => {
  const history = useHistory();
  const userRoute = `${routeBuilder.users}/${user.id}`;

  return (
    <Card
      elevation={6}
      style={usersListStyles.card}
      onClick={() => history.push(userRoute)}
    >
      <CardContent>
        <ListItemAvatar style={usersListStyles.avatar}>
          <Avatar alt={user.username.toUpperCase()} src=" " />
        </ListItemAvatar>
        <Description user={user} />
      </CardContent>
    </Card>
  )
};


const Description: React.FC<{ user: UserDetails }> = ({
  user
}) => {
  const theme = useTheme();

  return (
    <>
      <span style={usersListStyles.name}>{user.username}</span>
      <div style={{
        ...usersListStyles.description,
        color: theme.palette.grey[500]
      }}
      >
        <span>{`Created at: ${convertDate(user.createdAt)}`}</span>
        <span style={usersListStyles.id}>{`ID: ${user.id}`}</span>
      </div></>
  )
}