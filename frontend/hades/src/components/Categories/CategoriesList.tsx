import React from 'react';
import { useGetCategories } from '../../hooks/useGetCategories';
import { routeBuilder } from '../../routes/routes';
import { ErrorComponent } from '../Common/ErrorComponent';
import { Loader } from '../Common/Loader';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import { CategoryItem } from './CategoryItem';
import { categoryStyles } from '../../styles/categories';

export const CategoriesList: React.FC = () => {
  const { data, loading, error } = useGetCategories();

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
    <Box fontStyle={categoryStyles.div}>
      <List dense style={categoryStyles.list}>
        {data.map((category) => (
          <div key={category.id}>
            <CategoryItem category={category} />
          </div>
        ))}
      </List>
    </Box>
  )
}