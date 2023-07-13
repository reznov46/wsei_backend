import { Alert, Grid } from '@mui/material';
import React, { useState } from 'react';
import { useGetProducts } from '../../hooks/useGetProducts';
import { useGetQueryParams } from '../../hooks/useGetQueryParams';
import { routeBuilder } from '../../routes/routes';
import { productCardStyles } from '../../styles/productCard';
import { ErrorComponent } from '../Common/ErrorComponent';
import { Loader } from '../Common/Loader';
import { Paginator } from '../Paginator/Paginator';
import { ProductCard } from './ProductCard';

export const ProductsList: React.FC = () => {
  const [isRemoveError, setIsRemoveError] = useState<boolean>(false);
  const { data, loading, error } = useGetProducts();
  const { pageSize } = useGetQueryParams();

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
      text='The inventory is empty'
    />
  }

  if (isRemoveError) {
    return (
      <Alert severity="error">Something went wrong, try again!</Alert>
    )
  }

  return (
    <>
      <Paginator
        disableNextButton={data.length < Number(pageSize)}
      />
      <Grid container>
        {data.map((product) => (
          <Grid item xs={3} style={productCardStyles.grid} key={product.id}>
            <ProductCard product={product} setIsRemoveError={setIsRemoveError} />
          </Grid>
        ))}
      </Grid>
    </>
  )
}