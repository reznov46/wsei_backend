import React from 'react';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { routeBuilder } from '../../routes/routes';
import {
  getCategoryIdParam,
  getPageNumParam,
  getPageSizeParam
} from '../../utils/defaultParams';
import { useHistory } from 'react-router';
import { Tooltip } from '@mui/material';

export const CategoryItemIcons: React.FC<{ id: string }> = ({ id }) => {
  const history = useHistory();

  const getLinkFilteredByCategory = (
    categoryId: string
  ): string =>
    `${routeBuilder.products}?${getCategoryIdParam(categoryId)}&${getPageNumParam()}&${getPageSizeParam()}`;

  return (
    <>
      <Tooltip title="Filter products by this category">
        <IconButton
          onClick={() => history.push(getLinkFilteredByCategory(id))}
        >
          <FilterAltIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Edit">
        <IconButton >
          <EditIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Remove">
        <IconButton edge="end">
          <DeleteIcon />
        </IconButton>
      </Tooltip>
    </>
  );
};