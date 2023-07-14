
import React, { PropsWithChildren } from 'react';
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
import { useGetCurrentUserDetails } from '../../hooks/useGetCurrentUserDetails';
import { isAdmin } from '../../utils/isAdmin';
import { UserLevel } from '../../types/user';
import { EditModal } from '../EditModal/EditModal';

interface ManipulateIconsProps {
  id?: string;
  removeItem: () => Promise<void>;
  openModal: boolean;
  handleOpenModal: () => void;
  handleCloseModal: () => void;
  onSubmit: React.FormEventHandler<HTMLFormElement>
  createdBy?: string
}

export const ManipulateIcons: React.FC<ManipulateIconsProps & PropsWithChildren> = ({
  id,
  removeItem,
  openModal,
  handleOpenModal,
  handleCloseModal,
  onSubmit,
  createdBy,
  children
}) => {
  const history = useHistory();
  const { data: { level, id: userId } } = useGetCurrentUserDetails();

  const getLinkFilteredByCategory = (
    categoryId: string
  ): string =>
    `${routeBuilder.products}?${getCategoryIdParam(categoryId)}&${getPageNumParam()}&${getPageSizeParam()}`;

  const isIconsVisible = isAdmin(level as UserLevel) || createdBy === userId;

  console.log(isAdmin(level as UserLevel))

  return (
    <>
      <EditModal
        openModal={openModal}
        handleCloseModal={handleCloseModal}
        onSubmit={onSubmit}
      >
        {children}
      </EditModal>
      {id && (
        <Tooltip title="Filter products by this category">
          <IconButton
            onClick={() => history.push(getLinkFilteredByCategory(id))}
          >
            <FilterAltIcon />
          </IconButton>
        </Tooltip>
      )}
      {isIconsVisible && (
        <>
          <Tooltip title="Edit" onClick={handleOpenModal}>
            <IconButton >
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Remove" onClick={removeItem}>
            <IconButton edge="end">
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </>
      )}
    </>
  );
};