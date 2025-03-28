import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, FormControl, InputLabel, Select, MenuItem, FormHelperText, SelectChangeEvent } from '@mui/material';
import {  Membre } from '../../config/types';


interface AddProps {
  open: boolean;

  onClose: () => void;
  onAdd: (user: Membre) => void;
 
}

const Add: React.FC<AddProps> = ({ open, onClose, onAdd }) => {
  const [data, setData] = useState<Membre>({
   id:-1 ,
    nom: '',
    prenom: '',
    role: '',
    isActif:true

  })

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleTextFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };


  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!data.nom) newErrors.nom = 'nom is required';
    if (!data.prenom) newErrors.prenom = 'prenom is required';
    if (!data.role) newErrors.role = 'Role is required';
   

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAdd = () => {
    if (validateForm()) {
      onAdd(data as Membre);
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Ajouter Nouveau Utilisateur</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label="Nom"
          name="nom"
          value={data.nom}
          onChange={handleTextFieldChange}
          fullWidth
          required
          error={!!errors.nom}
          helperText={errors.nom}
        />
        <TextField
          margin="dense"
          label="Prénom"
          name="prenom"
          value={data.prenom}
          onChange={handleTextFieldChange}
          fullWidth
          required
          error={!!errors.prenom}
          helperText={errors.prenom}
        />
        <TextField
          margin="dense"
          label="Role"
          name="role"
          value={data.role}
          onChange={handleTextFieldChange}
          fullWidth
          required
          error={!!errors.role}
          helperText={errors.role}
        />


    
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">Annuler</Button>
        <Button onClick={handleAdd} color="primary">Ajouter</Button>
      </DialogActions>
    </Dialog>
  );
};

export default Add;
