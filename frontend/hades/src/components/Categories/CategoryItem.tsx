import React, { useCallback, useState } from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import FolderIcon from '@mui/icons-material/Folder';
import { Category } from '../../types/category';
import { categoryStyles } from '../../styles/categories';
import { useRemoveItem } from '../../hooks/useRemoveItem';
import { endpoints } from '../../routes/routes';
import { Alert } from '@mui/material';
import { ManipulateIcons } from '../Common/ManipulateIcons';
import { EditCategory } from './EditCategory';
import { useEditItem } from '../../hooks/useEditItem';

export const CategoryItem: React.FC<{ category: Category }> = ({
  category
}) => {
  const {
    id,
    name,
    description,
  } = category;
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [newName, setNewName] = useState<string>(name);
  const [newDescription, setNewDescription] = useState<string>(description);

  const body = {
    name: newName,
    description: newDescription
  };

  const { editItem, isError: isEditError } = useEditItem({
    endpoint: endpoints.manipulateCategory(id),
    body
  });

  const { removeItem, isError: isRemoveError } = useRemoveItem(
    endpoints.manipulateCategory(id)
  );

  const handleOpenModal = useCallback(() =>
    setOpenModal(true),
    [openModal]
  );
  const handleCloseModal = useCallback(() =>
    setOpenModal(false),
    [openModal]
  );

  const Icons: JSX.Element = (
    <ManipulateIcons
      id={id}
      removeItem={removeItem}
      openModal={openModal}
      handleOpenModal={handleOpenModal}
      handleCloseModal={handleCloseModal}
      onSubmit={editItem}
    >
      <EditCategory
        handleCloseModal={handleCloseModal}
        newName={newName}
        setNewName={setNewName}
        newDescription={newDescription}
        setNewDescription={setNewDescription}
      />
    </ManipulateIcons>
  );

  return (
    <>
      <ListItem
        style={categoryStyles.listItem}
        secondaryAction={Icons}>
        <ListItemAvatar>
          <Avatar>
            <FolderIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={name}
          secondary={description}
        />
      </ListItem>
      {isRemoveError || isEditError && (
        <Alert severity="error">Something went wrong, try again!</Alert>
      )}
    </>
  );
};