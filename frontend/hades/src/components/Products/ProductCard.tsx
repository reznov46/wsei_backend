import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Typography
} from '@mui/material';
import React, { useEffect } from 'react';
import { useGetCurrentUserDetails } from '../../hooks/useGetCurrentUserDetails';
import { useRemoveItem } from '../../hooks/useRemoveItem';
import { endpoints } from '../../routes/routes';
import { productCardStyles } from '../../styles/productCard';
import { Product } from '../../types/product';
import { FONT_FAMILY } from '../../utils/consts';
import { ManipulateIcons } from '../Common/ManipulateIcons';
import { getRandomImg } from './utils';

interface ProductCardProps {
  product: Product
  setIsRemoveError: React.Dispatch<React.SetStateAction<boolean>>
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, setIsRemoveError }) => {
  const {
    id,
    name,
    price,
    description,
    fullDescription,
    productCategory,
    createdBy
  } = product;
  const { data: { id: currUserId } } = useGetCurrentUserDetails();
  const { removeItem, isError } = useRemoveItem(endpoints.removeProduct(id));

  const isIconsVisible = createdBy === currUserId;

  useEffect(() => {
    isError && (setIsRemoveError(isError))
  }, [isError])

  return (
    <Card sx={productCardStyles.card}>
      <CardHeader
        title={name}
        subheader={
          <SubHeader
            price={price}
            categoryName={productCategory.name}
          />
        }
        action={
          isIconsVisible && <ManipulateIcons removeItem={removeItem} />
        }
      />
      <CardMedia
        component="img"
        image={getRandomImg()}
      />
      <CardContent>
        <Text text={description} />
        <Text text={fullDescription} />
      </CardContent>
    </Card>
  )
}

const SubHeader: React.FC<{
  price: number,
  categoryName: string
}> = ({ price, categoryName }) => (
  <div style={productCardStyles.subHeader}>
    <Typography>{price + '$'}</Typography>
    <Typography>{categoryName}</Typography>
  </div>
);

const Text: React.FC<{ text: string }> = ({
  text
}) => (
  <Typography
    variant="body2"
    color="text.secondary"
    fontFamily={FONT_FAMILY}
  >
    {text}
  </Typography>
);