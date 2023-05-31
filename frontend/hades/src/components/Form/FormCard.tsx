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
import { appStyles } from '../../styles/app';

interface FormCardProps {
  user: User;
  error: string;
  handleSubmit: () => Promise<void>;
  setUser: (user: User) => void;
  header: string,
}

export const FormCard: React.FC<FormCardProps> = ({
  user,
  error,
  handleSubmit,
  setUser,
  header,
}) => (
  <Box component='form'>
    <Card>
      <CardContent>
        <h2>{header}</h2>
        <div>
          <TextField
            label="Username"
            variant="standard"
            autoComplete='username'
            value={user.username}
            onChange={(evt) => setUser({
              username: evt.target.value,
              password: user.password
            })}
          />
        </div>
        <div>
          <TextField
            label="Password"
            variant="standard"
            type='password'
            autoComplete='password'
            value={user.password}
            onChange={(evt) => setUser({
              username: user.username,
              password: evt.target.value
            })}
          />
        </div>
        {Boolean(error) && (
          <Typography
            {...appStyles.text}
            mt={1}
            color='error'
          >
            {error}
          </Typography>
        )}
      </CardContent>
      <CardActions>
        <Button
          size="small"
          onClick={handleSubmit}
        >
          {header}
        </Button>
      </CardActions>
    </Card>
  </Box >
);