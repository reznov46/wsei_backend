import React from 'react';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  TextField,
} from '@mui/material';
import { User } from '../types/user';

interface FormCardProps {
  handleSubmit: () => Promise<void>
  user: User,
  setUser: (user: User) => void
}

export const FormCard: React.FC<FormCardProps> = ({
  handleSubmit,
  user,
  setUser
}) => {
  const { username, password } = user;

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <div>
          <TextField
            label="Username"
            variant="standard"
            value={username}
            onChange={(evt) => setUser({
              username: evt.target.value,
              password: password
            })}
          />
        </div>
        <div>
          <TextField
            label="Password"
            variant="standard"
            type='password'
            value={password}
            onChange={(evt) => setUser({
              username: username,
              password: evt.target.value
            })}
          />
        </div>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={handleSubmit}>Login</Button>
      </CardActions>
    </Card>
  )
}