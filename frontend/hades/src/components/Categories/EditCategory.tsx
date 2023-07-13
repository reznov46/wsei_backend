import { CardContent, TextField } from '@mui/material';
import React from 'react';
import { formStyles } from '../../styles/formCard';
import { EditModalFooter } from '../EditModal/EditModalFooter';

interface EditCategoryProps {
  handleCloseModal: () => void;
  newName: string;
  setNewName: React.Dispatch<React.SetStateAction<string>>;
  newDescription: string;
  setNewDescription: React.Dispatch<React.SetStateAction<string>>;
}

export const EditCategory: React.FC<EditCategoryProps> = ({
  handleCloseModal,
  newName,
  setNewName,
  newDescription,
  setNewDescription
}) => (
  <>
    <CardContent>
      <div>
        <TextField
          label="Name"
          variant="standard"
          autoComplete="name"
          autoFocus
          value={newName}
          style={formStyles.input}
          onChange={(evt) => setNewName(evt.target.value)}
        />
      </div>
      <div>
        <TextField
          label="Description"
          variant="standard"
          autoComplete="description"
          value={newDescription}
          style={formStyles.input}
          onChange={(evt) => setNewDescription(evt.target.value)}
        />
      </div>
    </CardContent>
    <EditModalFooter handleCloseModal={handleCloseModal} />
  </>
);
