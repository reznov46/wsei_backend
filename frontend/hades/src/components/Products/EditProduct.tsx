import { CardContent, TextField } from '@mui/material';
import React from 'react';
import { formStyles } from '../../styles/formCard';
import { EditModalFooter } from '../EditModal/EditModalFooter';

interface EditProductProps {
  handleCloseModal: () => void;
  newDescription: string;
  setNewDescription: React.Dispatch<React.SetStateAction<string>>;
  newFullDescription: string;
  setNewFullDescription: React.Dispatch<React.SetStateAction<string>>;
}

export const EditProduct: React.FC<EditProductProps> = ({
  handleCloseModal,
  newDescription,
  setNewDescription,
  newFullDescription,
  setNewFullDescription
}) => (
  <>
    <CardContent>
      <div>
        <TextField
          label="Description"
          variant="standard"
          autoComplete="description"
          autoFocus
          value={newDescription}
          style={formStyles.input}
          onChange={(evt) => setNewDescription(evt.target.value)}
        />
      </div>
      <div>
        <TextField
          label="Full description"
          variant="standard"
          autoComplete="Full description"
          value={newFullDescription}
          style={formStyles.input}
          onChange={(evt) => setNewFullDescription(evt.target.value)}
        />
      </div>
    </CardContent>
    <EditModalFooter handleCloseModal={handleCloseModal} />
  </>
);
