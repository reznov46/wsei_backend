import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Typography
} from '@mui/material';
import React from 'react';
import { productCardStyles } from '../../styles/productCard';
import { Product } from '../../types/product';
import { FONT_FAMILY } from '../../utils/consts';
import { getRandomImg } from './utils';

export const ProductCard: React.FC<{
  product: Product
}> = ({ product }) => {
  const { name, price, description, fullDescription } = product;

  return (
    <Card sx={productCardStyles.card}>
      <CardHeader
        title={name}
        subheader={price + '$'}
      />
      <CardMedia
        component="img"
        image={getRandomImg()}
      />
      <CardContent>
        <Typography
          variant="body2"
          color="text.secondary"
          fontFamily={FONT_FAMILY}
        >
          {description}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          fontFamily={FONT_FAMILY}
        >
          {fullDescription}
        </Typography>
      </CardContent>
    </Card>
  )
}