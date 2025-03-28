import React, { useState } from "react";
import "./login.css";

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { toast } from 'react-toastify';
import { api } from "../../config/config";

const App: React.FC = () => {
  const reset = () => {
    setCurrentPassword('')
    setNewPassword('')
    setConfirmationPassword('')
  }

  const [currentPassword, setCurrentPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmationPassword, setConfirmationPassword] = useState<string>('');
  const [errors, setErrors] = useState<{ currentPassword?: string; newPassword?: string; confirmationPassword?: string; }>({});

  const validateForm = () => {
    const newErrors: { currentPassword?: string; newPassword?: string; confirmationPassword?: string } = {};
  
    if (!currentPassword) newErrors.currentPassword = 'Le mot de passe actuel est requis';
    if (!newPassword) newErrors.newPassword = 'Le nouveau mot de passe est requis';
    if (!confirmationPassword) newErrors.confirmationPassword = 'La confirmation du nouveau mot de passe est requise';
  
    if (newPassword !== confirmationPassword) newErrors.confirmationPassword = 'Les mots de passe ne correspondent pas';
  
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validateForm()) return;

    const changePasswordData = { currentPassword, newPassword, confirmationPassword };
    try {
     await api.post(`/users/change-password`,changePasswordData);
      toast.success('Mot de Passe Change avec succées!');
      reset()
    } catch (error) { }
  };

  return (
    <Container component="main" maxWidth="xs">
    <CssBaseline />
    <Box
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }} style={{ background: '#1F5BF3' }}>
        {
          //<LockOutlinedIcon />
        }
      </Avatar>
      <Typography component="h1" variant="h5">
        Changer le Mot de Passe
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          fullWidth
          name="currentPassword"
          label="Mot de Passe Actuel"
          type="password"
          id="currentPassword"
          autoComplete="current-password"
          required
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          error={!!errors.currentPassword}
          helperText={errors.currentPassword}
        />
        <TextField
          margin="normal"
          fullWidth
          name="newPassword"
          label="Nouveau Mot de Passe"
          type="password"
          id="newPassword"
          autoComplete="new-password"
          required
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          error={!!errors.newPassword}
          helperText={errors.newPassword}
        />
        <TextField
          margin="normal"
          fullWidth
          name="confirmationPassword"
          label="Confirmer le Nouveau Mot de Passe"
          type="password"
          id="confirmationPassword"
          autoComplete="confirmation-password"
          required
          value={confirmationPassword}
          onChange={(e) => setConfirmationPassword(e.target.value)}
          error={!!errors.confirmationPassword}
          helperText={errors.confirmationPassword}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          style={{ background: '#1F5BF3' }}
        >
          Confirmer
        </Button>
      </Box>
    </Box>
  </Container>
  
  );
}

export default App;
