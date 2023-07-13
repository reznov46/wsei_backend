import { Button, CardActions } from '@mui/material';
import React from 'react';
import { formStyles } from '../../styles/formCard';

interface EditModalFooterProps {
  handleCloseModal: () => void
}

export const EditModalFooter: React.FC<EditModalFooterProps> = ({
  handleCloseModal
}) => {

  return (
    <CardActions>
      <Button
        size="medium"
        onClick={handleCloseModal}
      >
        Close
      </Button>
      <Button
        size="medium"
        type="submit"
        style={formStyles.button}
      >
        Update
      </Button>
    </CardActions>
  );
};