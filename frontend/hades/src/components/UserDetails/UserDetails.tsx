import React from 'react';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography
} from '@mui/material';
import { useGetCurrentUserDetails } from '../../hooks/useGetCurrentUserDetails';
import { convertDate } from '../../utils/convertDate';
import { ErrorComponent } from '../Common/ErrorComponent';
import { Loader } from '../Common/Loader';
import { userDetailsStyles } from '../../styles/userDetails';
import { useHistory } from 'react-router';
import { routeBuilder } from '../../routes/routes';

export const UserDetails: React.FC = () => {
  const history = useHistory();
  const { data, loading, error } = useGetCurrentUserDetails();
  const {
    id,
    username,
    level,
    createdAt
  } = data;

  if (loading) {
    return <Loader />
  }

  if (error) {
    return <ErrorComponent text={error} />
  }

  return (
    <Box component='div' style={userDetailsStyles.div}>
      <Card style={userDetailsStyles.card}>
        <CardContent sx={userDetailsStyles.cardContent}>
          <Avatar
            alt={username.toUpperCase()}
            src="/"
            style={userDetailsStyles.avatar}
          />
          <Typography variant="h5">
            {username}
          </Typography>
          <Typography color="text.secondary">
            Level: {level}
          </Typography>
          <Typography variant="body2">
            ID: {id}
          </Typography>
          <Typography variant="body2">
            Created at: {convertDate(createdAt)}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            onClick={() => history.push(routeBuilder.home)}
          >
            Learn More
          </Button>
        </CardActions>
      </Card>
    </Box >
  );
};