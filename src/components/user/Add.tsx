import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, FormControl, InputLabel, Select, MenuItem, FormHelperText, SelectChangeEvent } from '@mui/material';
import {  Role, UserRequest } from '../../config/types';


interface AddProps {
  open: boolean;
  roles:Role[];
  onClose: () => void;
  onAdd: (user: UserRequest) => void;
 
}

const Add: React.FC<AddProps> = ({ open,roles, onClose, onAdd }) => {
  const [data, setData] = useState<UserRequest>({
    firstname: '',
    lastname: '',
    username: '',
    role: '',
    password: '',
  })

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleTextFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name as string]: value,
    });
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!data.firstname) newErrors.firstname = 'Firstname is required';
    if (!data.lastname) newErrors.lastname = 'Lastname is required';
    if (!data.username) newErrors.username = 'Username is required';
    if (!data.role) newErrors.role = 'Role is required';
    if (!data.password) newErrors.password = 'Type is required';



    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAdd = () => {
    if (validateForm()) {
      onAdd(data as UserRequest);
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Ajouter Nouveau Utilisateur</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label="Firstname"
          name="firstname"
          value={data.firstname}
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
          value={data.lastname}
          onChange={handleTextFieldChange}
          fullWidth
          required
          error={!!errors.lastname}
          helperText={errors.lastname}
        />
        <TextField
          margin="dense"
          label="UserName"
          name="username"
          value={data.username}
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
            value={data.role}
            onChange={handleSelectChange}
            required
          >
            {roles.map((role, index) => (
              <MenuItem key={index} value={role.name}>
                {role.name}
              </MenuItem>
            ))}
          </Select>
          {errors.type && <FormHelperText>{errors.type}</FormHelperText>}
        </FormControl>
        <TextField
          margin="dense"
          label="Password"
          name="password"
          type='password'
          value={data.password}
          onChange={handleTextFieldChange}
          fullWidth
          required
          error={!!errors.password}
          helperText={errors.password}
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
