import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, FormControl, InputLabel, Select, MenuItem, FormHelperText } from '@mui/material';
import {  Role, UserRequest } from '../../config/types';

import { SelectChangeEvent } from '@mui/material/Select';

interface EditProps {
  open: boolean;
  onClose: () => void;
  roles:Role[];
  data: UserRequest | null;
  onSave: (data: UserRequest) => void;
  changePasswordRequest : ()=>void;
}

const Edit: React.FC<EditProps> = ({ open, onClose, data,roles, onSave,changePasswordRequest }) => {
  const [edited, setEdited] = useState<Partial<UserRequest>>({ ...data });
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

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    setEdited({
      ...edited,
      [name]: value,
    });
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!edited.firstname) newErrors.firstname = 'Firstname is required';
    if (!edited.lastname) newErrors.lastname = 'Lastname is required';
    if (!edited.username) newErrors.username = 'Username is required';
    if (!edited.role) newErrors.role = 'Role is required';
    if (!edited.password) newErrors.password = 'Password is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm() && data) {
      onSave({ ...data, ...edited } as UserRequest);
      onClose();
    }
  };

  if (!data) return null;

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Modifier données Utilisateur</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label="Firstname"
          name="firstname"
          value={edited.firstname || ''}
          onChange={handleTextFieldChange}
          fullWidth
          required
          error={!!errors.firstname}
          helperText={errors.firstname}
        />
        <TextField
          margin="dense"
          label="Lastname"
          name="lastname"
          value={edited.lastname || ''}
          onChange={handleTextFieldChange}
          fullWidth
          required
          error={!!errors.lastname}
          helperText={errors.lastname}
        />
        <TextField
          margin="dense"
          label="Username"
          name="username"
          value={edited.username || ''}
          onChange={handleTextFieldChange}
          fullWidth
          required
          error={!!errors.username}
          helperText={errors.username}
        />
        <FormControl fullWidth margin="dense" error={!!errors.role}>
          <InputLabel>Role</InputLabel>
          <Select
            label="Role"
            name="role"
            value={edited.role || ''}
            onChange={handleSelectChange}
            required
          >
            {roles.map((role, index) => (
              <MenuItem key={index} value={role.name}>
                {role.name}
              </MenuItem>
            ))}
          </Select>
          {errors.role && <FormHelperText>{errors.role}</FormHelperText>}
        </FormControl>

        <button
          type="button"
          onClick={changePasswordRequest}
          style={{
            marginTop: '10px',
            padding: '8px 16px',
            
            color: 'blue',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            textAlign: 'center',
            display: 'block',
            textDecoration: 'underline',
          }}
        >
          Changer le mot de passe
        </button>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">Annuler</Button>
        <Button onClick={handleSave} color="primary">Sauvegarder</Button>
      </DialogActions>
    </Dialog>
  );
};

export default Edit;
