import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Typography
} from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { useEditItem } from '../../hooks/useEditItem';
import { useRemoveItem } from '../../hooks/useRemoveItem';
import { endpoints } from '../../routes/routes';
import { productCardStyles } from '../../styles/productCard';
import { Product } from '../../types/product';
import { FONT_FAMILY } from '../../utils/consts';
import { ManipulateIcons } from '../Common/ManipulateIcons';
import { EditProduct } from './EditProduct';
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
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [newDescription, setNewDescription] = useState<string>(description);
  const [newFullDescription, setNewFullDescription] = useState<string>(fullDescription);

  const body = {
    id,
    description: newDescription,
    fullDescription: newFullDescription
  };

  const { editItem, isError: isEditError } = useEditItem({
    endpoint: endpoints.products,
    body
  });

  const { removeItem, isError } = useRemoveItem(endpoints.removeProduct(id));

  const handleOpenModal = useCallback(() =>
    setOpenModal(true),
    [openModal]
  );
  const handleCloseModal = useCallback(() =>
    setOpenModal(false),
    [openModal]
  );

  useEffect(() => {
    isError || isEditError && (setIsRemoveError(isError || isEditError))
  }, [isError, isEditError])

  const Icons: JSX.Element = (
    <ManipulateIcons
      removeItem={removeItem}
      openModal={openModal}
      handleOpenModal={handleOpenModal}
      handleCloseModal={handleCloseModal}
      onSubmit={editItem}
      createdBy={createdBy}
    >
      <EditProduct
        handleCloseModal={handleCloseModal}
        newDescription={newDescription}
        setNewDescription={setNewDescription}
        newFullDescription={newFullDescription}
        setNewFullDescription={setNewFullDescription}
      />
    </ManipulateIcons>
  )

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
        action={Icons}
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