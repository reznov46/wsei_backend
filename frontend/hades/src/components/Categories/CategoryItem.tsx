import React from 'react';
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

export const CategoryItem: React.FC<{ category: Category }> = ({
  category
}) => {
  const {
    id,
    name,
    description
  } = category;

  const { removeItem, isError } = useRemoveItem(endpoints.removeCategory(id));

  return (
    <>
      <ListItem
        style={categoryStyles.listItem}
        secondaryAction={
          <ManipulateIcons
            id={id}
            removeItem={removeItem}
          />
        }
      >
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
      {isError && (
        <Alert severity="error">Something went wrong, try again!</Alert>
      )}
    </>
  );
};