import { Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import React from 'react';
import { Product } from '../../types/product';
import { FONT_FAMILY } from '../../utils/consts';

export const ProductCard: React.FC<{ product: Product }> = ({ product }) => {

  return (
    <Card>
      <CardContent>
        <Typography
          variant="h4"
          fontFamily={FONT_FAMILY}
        >
          {product.name}
        </Typography>
      </CardContent>
      <CardActions>
        <Button onClick={() => console.log('abc')}>
          Back
        </Button>
      </CardActions>
    </Card>
  )
}