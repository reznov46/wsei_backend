import { Grid } from '@mui/material';
import React from 'react';
import { useGetCurrentUserProducts } from '../../hooks/useGetCurrentUserProducts';
import { productCardStyles } from '../../styles/productCard';
import { ErrorComponent } from '../Common/ErrorComponent';
import { Loader } from '../Common/Loader';
import { ProductCard } from './ProductCard';

export const UserProducts: React.FC = () => {
  const { data, loading, error } = useGetCurrentUserProducts();

  if (loading) {
    return <Loader />
  };

  if (error) {
    return (
      <ErrorComponent text={error} />
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