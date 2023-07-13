import { Box, Card, Modal } from '@mui/material';
import React, { PropsWithChildren } from 'react';
import { editModalStyles } from '../../styles/editModal';

interface EditModalProps {
  openModal: boolean;
  handleCloseModal: () => void
  onSubmit: React.FormEventHandler<HTMLFormElement>
}

export const EditModal: React.FC<EditModalProps & PropsWithChildren> = ({
  openModal,
  handleCloseModal,
  onSubmit,
  children
}) => {
  return (
    <>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
      >
        <Card>
          <Box
            sx={editModalStyles.modal}
            component="form"
            onSubmit={onSubmit}
          >
            {children}
          </Box>
        </Card>
      </Modal>
    </>
  );
}