import { Box } from '@mui/material';
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

  return (
    <Box component='div' style={productCardStyles.div}>
      {data.map((product) => (
        <div key={product.id}>
          <ProductCard product={product} />
        </div>
      ))}
    </Box>
  )
}