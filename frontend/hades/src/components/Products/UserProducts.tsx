import { Grid } from '@mui/material';
import React from 'react';
import { useGetProducts } from '../../hooks/useGetCurrentUserProducts';
import { routeBuilder } from '../../routes/routes';
import { productCardStyles } from '../../styles/productCard';
import { ErrorComponent } from '../Common/ErrorComponent';
import { Loader } from '../Common/Loader';
import { ProductCard } from './ProductCard';

export const Products: React.FC = () => {
  const { data, loading, error } = useGetProducts();

  if (loading) {
    return <Loader />
  };

  if (error) {
    return (
      <ErrorComponent text={error} link={routeBuilder.details} />
    )
  };

  if (!data.length) {
    return <ErrorComponent
      text='Your inventory is empty'
      link='add'
      customButtonText='Add product'
    />
  }

  return (
    <Grid container>
      {data.map((product) => (
        <Grid item xs={3} style={productCardStyles.grid} key={product.id}>
          <ProductCard product={product} />
        </Grid>
      ))}
    </Grid>
  )
}