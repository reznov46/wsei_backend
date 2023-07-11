import React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import FolderIcon from '@mui/icons-material/Folder';
import { Category } from '../../types/category';
import { categoryStyles } from '../../styles/categories';
import { CategoryItemIcons } from './Icons';

export const CategoryItem: React.FC<{ category: Category }> = ({
  category
}) => (
  <ListItem
    secondaryAction={<CategoryItemIcons id={category.id} />}
    style={categoryStyles.listItem}
  >
    <ListItemAvatar>
      <Avatar>
        <FolderIcon />
      </Avatar>
    </ListItemAvatar>
    <ListItemText
      primary={category.name}
      secondary={category.description}
    />
  </ListItem>
);