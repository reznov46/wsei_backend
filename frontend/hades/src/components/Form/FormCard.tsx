import React from 'react';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  TextField,
  Typography,
} from '@mui/material';
import { User } from '../../types/user';
import { formStyles } from '../../styles/formCard';
import { useHistory, useLocation } from 'react-router';
import { routeBuilder } from '../../routes/routes';

interface FormCardProps {
  user: User;
  error: string;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
  setUser: (user: User) => void;
  header: string;
}

export const FormCard: React.FC<FormCardProps> = ({
  user,
  error,
  handleSubmit,
  setUser,
  header,
}) => {
  const history = useHistory();
  const location = useLocation();

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      style={formStyles.div}
    >
      <Card
        style={formStyles.card}
      >
        <CardContent>
          <h2 style={formStyles.header}>{header}</h2>
          <div>
            <TextField
              label="Username"
              variant="standard"
              autoComplete="username"
              value={user.username}
              style={formStyles.input}
              onChange={(evt) => setUser({
                username: evt.target.value,
                password: user.password,
              })} />
          </div>
          <div>
            <TextField
              label="Password"
              variant="standard"
              type="password"
              autoComplete="password"
              value={user.password}
              style={formStyles.input}
              onChange={(evt) => setUser({
                username: user.username,
                password: evt.target.value,
              })} />
          </div>
          {Boolean(error) && (
            <Typography
              {...formStyles.error}
            >
              {error}
            </Typography>
          )}
        </CardContent>
        <CardActions>
          {location.pathname === routeBuilder.login && (
            <Button
              size="medium"
              onClick={() => history.push(routeBuilder.register)}
            >
              Register
            </Button>
          )}
          <Button
            size="medium"
            type="submit"
            style={formStyles.button}
          >
            {header}
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};
