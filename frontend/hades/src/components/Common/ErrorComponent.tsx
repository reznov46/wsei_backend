import React from 'react';
import { useHistory } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography
} from '@mui/material';
import { routeBuilder } from '../../routes/routes';
import { errorStyles } from '../../styles/error';

interface ErrorProps {
  text: string
  link?: string
  customButtonText?: string
}

export const ErrorComponent: React.FC<ErrorProps> = ({
  text,
  link,
  customButtonText
}) => {
  const history = useHistory();
  const redirectedPage = Object.entries(routeBuilder)
    .find(a => a[1] === link)?.[0];

  const buttonText = redirectedPage
    ? `Redirect to ${redirectedPage} page`
    : 'Redirect';

  return (
    <Box style={errorStyles.div}>
      <Card style={errorStyles.card}>
        <CardContent>
          <Typography
            variant="h5"
            style={errorStyles.header}
          >
            <b>{text}</b>
          </Typography>
        </CardContent>
        {link && (
          <CardActions>
            <Button
              onClick={() => history.push(link)}
              style={errorStyles.button}
            >
              {customButtonText ? customButtonText : buttonText}
            </Button>
          </CardActions>
        )}
      </Card>
    </Box>
  );
};