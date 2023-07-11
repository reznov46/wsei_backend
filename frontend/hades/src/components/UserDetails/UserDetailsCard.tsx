import React from 'react';
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography
} from '@mui/material';
import { useHistory } from 'react-router';
import { routeBuilder } from '../../routes/routes';
import { userDetailsStyles } from '../../styles/userDetails';
import { UserDetails } from '../../types/user';
import { FONT_FAMILY } from '../../utils/consts';
import { convertDate } from '../../utils/convertDate';
import { useGetCurrentUserDetails } from '../../hooks/useGetCurrentUserDetails';
import { getCreatedByParam, getPageNumParam, getPageSizeParam } from '../../utils/defaultParams';

interface UserDetailsCardProps {
  user: UserDetails;
  redirectBack?: boolean;
}

export const UserDetailsCard: React.FC<UserDetailsCardProps> = ({
  user,
  redirectBack
}) => {
  const history = useHistory();
  const {
    username,
    id,
    level,
    createdAt
  } = user;
  const { data } = useGetCurrentUserDetails();

  const userProductsRoute =
    `${routeBuilder.products}?${getCreatedByParam(id)}&${getPageNumParam(0)}&${getPageSizeParam()}`

  const handleOnClickBack = (): void => {
    redirectBack
      ? history.goBack()
      : history.push(routeBuilder.home)
  };

  const handleOnClickProduct = (): void => {
    history.push(userProductsRoute)
  }

  return (
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
          <b>Level:{' '}{level}</b>
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
        <Button onClick={handleOnClickProduct}>
          {data.id === id ? 'Your products' : 'See user products'}
        </Button>
        <Button
          onClick={handleOnClickBack}
          style={userDetailsStyles.button}
        >
          {redirectBack ? 'Back' : 'Home'}
        </Button>
      </CardActions>
    </Card>
  );
};