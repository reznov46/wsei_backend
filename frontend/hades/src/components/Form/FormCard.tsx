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
import { useLocation } from 'react-router';

interface FormCardProps {
  user: User,
  error: string,
  handleSubmit: () => Promise<void>
  setUser: (user: User) => void
}

export const FormCard: React.FC<FormCardProps> = ({
  user,
  error,
  handleSubmit,
  setUser
}) => {
  const location = useLocation();
  const { username, password } = user;

  const buttonText = location.pathname.slice(1).toUpperCase();

  return (
    <Box component='form'>
      <Card>
        <CardContent>
          <div>
            <TextField
              label="Username"
              variant="standard"
              autoComplete='username'
              value={username}
              onChange={(evt) => setUser({
                username: evt.target.value,
                password
              })}
            />
          </div>
          <div>
            <TextField
              label="Password"
              variant="standard"
              type='password'
              autoComplete='password'
              value={password}
              onChange={(evt) => setUser({
                username,
                password: evt.target.value
              })}
            />
          </div>
          {Boolean(error) && (
            <Typography color='error' mt={1} fontSize={14}>
              {error}
            </Typography>
          )}
        </CardContent>
        <CardActions>
          <Button
            size="small"
            onClick={handleSubmit}>{buttonText}
          </Button>
        </CardActions>
      </Card>
    </Box>
  )
}