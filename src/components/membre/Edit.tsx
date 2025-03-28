import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, FormControl, InputLabel, Select, MenuItem, FormHelperText } from '@mui/material';
import {  Membre } from '../../config/types';

interface EditProps {
  open: boolean;
  onClose: () => void;
  data: Membre | null;
  onSave: (data: Membre) => void;

}

const Edit: React.FC<EditProps> = ({ open, onClose, data, onSave }) => {
  const [edited, setEdited] = useState<Partial<Membre>>({ ...data });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (data) {
      setEdited({ ...data });
    }
  }, [data]);

  const handleTextFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEdited({
      ...edited,
      [name]: value,
    });
  };



  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!edited.nom) newErrors.nom = 'nom is required';
    if (!edited.prenom) newErrors.prenom = 'prenom is required';
    if (!edited.role) newErrors.matricule = 'Role is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm() && data) {
      onSave({ ...data, ...edited } as Membre);
      onClose();
    }
  };

  if (!data) return null;

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Modifier données du Membre</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label="Matricule"
          name="matricule"
          value={edited.role || ''}
          onChange={handleTextFieldChange}
          fullWidth
          required
          error={!!errors.role}
          helperText={errors.role}
        />
        <TextField
          margin="dense"
          label="nom"
          name="nom"
          value={edited.nom || ''}
          onChange={handleTextFieldChange}
          fullWidth
          required
          error={!!errors.nom}
          helperText={errors.nom}
        />
        <TextField
          margin="dense"
          label="prenom"
          name="prenom"
          value={edited.prenom || ''}
          onChange={handleTextFieldChange}
          fullWidth
          required
          error={!!errors.prenom}
          helperText={errors.prenom}
        />
       

      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">Annuler</Button>
        <Button onClick={handleSave} color="primary">Sauvegarder</Button>
      </DialogActions>
    </Dialog>
  );
};

export default Edit;
