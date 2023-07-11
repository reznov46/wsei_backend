import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { useGetCategories } from '../../hooks/useGetCategories';
import { useGetCurrentUserDetails } from '../../hooks/useGetCurrentUserDetails';
import { useGetToken } from '../../hooks/useGetToken';
import { endpoints, routeBuilder } from '../../routes/routes';
import { formStyles } from '../../styles/formCard';
import { ErrorResponse } from '../../types/responses';
import { getCreatedByParam, getPageNumParam, getPageSizeParam } from '../../utils/defaultParams';
import { ErrorList } from '../Common/ErrorList';

export const AddProductForm: React.FC = () => {
  const [errors, setErrors] = useState<string[]>([]);
  const [productName, setProductName] = useState<string>('');
  const [shortDescription, setShortDescription] = useState<string>('');
  const [fullDescription, setFullDescription] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [categoryId, setCategoryId] = useState<string>('');
  const { token } = useGetToken();
  const { data: categories } = useGetCategories();
  const { data: currUser } = useGetCurrentUserDetails();
  const history = useHistory();

  const redirectLink =
    `${routeBuilder.products}?${getCreatedByParam(currUser.id)}&${getPageNumParam()}&${getPageSizeParam()}`

  const handleOnSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    event.stopPropagation();

    const body = {
      name: productName,
      description: shortDescription,
      productCategoryId: categoryId,
      price,
      fullDescription
    }

    await axios
      .post(endpoints.products, body, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        history.push(redirectLink)
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
          <h2 style={formStyles.header}>Add product</h2>
          <div>
            <TextField
              label="Name"
              variant="standard"
              autoComplete="name"
              autoFocus
              value={productName}
              style={formStyles.input}
              onChange={(evt) => setProductName(evt.target.value)}
            />
          </div>
          <div>
            <TextField
              label="Short description"
              variant="standard"
              autoComplete="description"
              value={shortDescription}
              style={formStyles.input}
              onChange={(evt) => setShortDescription(evt.target.value)}
            />
          </div>
          <div>
            <TextField
              label="Full description"
              variant="standard"
              autoComplete="description"
              value={fullDescription}
              style={formStyles.input}
              onChange={(evt) => setFullDescription(evt.target.value)}
            />
          </div>
          <div>
            <TextField
              label="Price"
              variant="standard"
              type="number"
              autoComplete="price"
              value={price}
              style={formStyles.input}
              onChange={(evt) => setPrice(evt.target.value)}
            />
          </div>
          <div>
            <Select
              value={categoryId}
              required
              style={{ ...formStyles.input, ...formStyles.selector }}
              onChange={(evt) => setCategoryId(evt.target.value)}
            >
              {categories.map((category) => (
                <MenuItem
                  value={category.id}
                  key={category.id}
                >
                  {category.name}
                </MenuItem>
              ))}
            </Select>
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
};