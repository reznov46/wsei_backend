import { Box, Button, Card, CardActions, CardContent, TextField } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { useGetToken } from '../../hooks/useGetToken';
import { endpoints, routeBuilder } from '../../routes/routes';
import { formStyles } from '../../styles/formCard';
import { ErrorResponse } from '../../types/responses';
import { ErrorList } from '../Common/ErrorList';

export const AddCategory: React.FC = () => {
  const [errors, setErrors] = useState<string[]>([]);
  const [categoryName, setCategoryName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const { token } = useGetToken();
  const history = useHistory();
  const handleOnSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    event.stopPropagation();

    const body = {
      name: categoryName,
      description,
    }

    await axios
      .post(endpoints.categories, body, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        history.push(routeBuilder.categories)
        console.log(response)
      })
      .catch((error: ErrorResponse) => {
        setErrors(error.response.data.message as string[])
      })
  };

  return (
    <Box
      component="form"
      style={formStyles.div}
      onSubmit={handleOnSubmit}
    >
      <Card style={formStyles.card}>
        <CardContent>
          <h2 style={formStyles.header}>Add category</h2>
          <div>
            <TextField
              label="Name"
              variant="standard"
              autoComplete="name"
              autoFocus
              value={categoryName}
              style={formStyles.input}
              onChange={(evt) => setCategoryName(evt.target.value)}
            />
          </div>
          <div>
            <TextField
              label="Description"
              variant="standard"
              autoComplete="description"
              value={description}
              style={formStyles.input}
              onChange={(evt) => setDescription(evt.target.value)}
            />
          </div>
          {errors && (
            <ErrorList errors={errors} />
          )}
        </CardContent>
        <CardActions>
          <Button
            size="medium"
            type="submit"
            style={formStyles.button}
          >
            ADD
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
}