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
import { FONT_FAMILY } from '../../utils/consts';

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
      <Card style={userDetailsStyles.card}>
        <CardContent sx={userDetailsStyles.cardContent}>
          <Avatar
            alt={username.toUpperCase()}
            src="/"
            style={userDetailsStyles.avatar}
          />
          <Typography
            variant="h4"
            fontFamily={FONT_FAMILY}
          >
            {username}
          </Typography>
          <Typography
            color="text.secondary"
            variant="h6"
            fontFamily={FONT_FAMILY}
            style={userDetailsStyles.level}
          >
            <b>Level:{' '}</b>{level}
          </Typography>
          <div style={userDetailsStyles.detailsDiv}>
            <Typography
              variant="body2"
              fontFamily={FONT_FAMILY}
            >
              <b>ID:{' '}</b>{id}
            </Typography>
            <Typography
              variant="body2"
              fontFamily={FONT_FAMILY}
            >
              <b>Created at:{' '}</b>{convertDate(createdAt)}
            </Typography>
          </div>
        </CardContent>
        <CardActions>
          <Button
            onClick={() => history.push(routeBuilder.home)}
            style={userDetailsStyles.button}
          >
            Home
          </Button>
        </CardActions>
      </Card>
    </Box >
  );
};