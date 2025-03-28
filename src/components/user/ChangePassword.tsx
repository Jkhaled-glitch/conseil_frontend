import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material';
import { User,PasswordInfo } from '../../config/types';



interface EditProps {
  open: boolean;
  onClose: () => void;
  data: User | null;
  onSave: (data: PasswordInfo) => void;
 
}

const Edit: React.FC<EditProps> = ({ open, onClose, data, onSave }) => {
  const [passwordInfo, setPasswordInfo] = useState<Partial<PasswordInfo>>({ password:'',confirmPassword:''});
  
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleTextFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordInfo({
      ...passwordInfo,
      [name]: value,
    });
  };


  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!passwordInfo.password) newErrors.password = 'Password is required';
    if (!passwordInfo.confirmPassword) newErrors.confirmaPassword = 'Confirm Password is required';
    if(passwordInfo.password != passwordInfo.confirmPassword)  newErrors.confirmaPassword = 'Passwords not matched';
    

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm() && data) {
      onSave(passwordInfo as PasswordInfo);
    }
  };

  if (!data) return null;

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Modifier Le Mot de Passe Utilisateur</DialogTitle>
      <DialogContent>

      <p><strong>Firstname:</strong> {data.firstname}</p>
          <p><strong>Lastname:</strong> {data.lastname}</p>
          <p><strong>Username:</strong> {data.username}</p>
          <p><strong>Role:</strong> {data.role.name}</p>
    <TextField
          margin="dense"
          label="New Password"
          name="password"
          value={passwordInfo.password}
          onChange={handleTextFieldChange}
          fullWidth
          required
          error={!!errors.password}
          helperText={errors.password}
        />
        <TextField
          margin="dense"
          label="Confirm Password"
          name="confirmPassword"
          value={passwordInfo.confirmPassword || ''}
          onChange={handleTextFieldChange}
          fullWidth
          required
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword}
        />
       
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">Annuler</Button>
        <Button onClick={handleSave} color="primary">Changer</Button>
      </DialogActions>
    </Dialog>
  );
};

export default Edit;
