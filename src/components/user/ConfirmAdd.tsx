import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';
import {  UserRequest } from '../../config/types';

interface ConfirmAdddataProps {
  open: boolean;
  onClose: () => void;
  data: UserRequest | null;
  onConfirm: () => void;
}

const ConfirmAdddata: React.FC<ConfirmAdddataProps> = ({ open, onClose, data, onConfirm }) => {
  if (!data) return null;

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirm l'ajout d'Utilisateur</DialogTitle>
      <DialogContent>
        <div>
          <p>Vous etes sur d'ajouter cette Utilisateur?</p>
          <p><strong>Firstname:</strong> {data.firstname}</p>
          <p><strong>Lastname:</strong> {data.lastname}</p>
          <p><strong>Username:</strong> {data.username}</p>
          <p><strong>Role:</strong> {data.role}</p>
          <p><strong>Password:</strong> {data.password}</p>
          
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">Annuler</Button>
        <Button onClick={onConfirm} color="primary">Ajouter</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmAdddata;
