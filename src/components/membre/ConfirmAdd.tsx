import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';
import {  Membre } from '../../config/types';

interface ConfirmAdddataProps {
  open: boolean;
  onClose: () => void;
  data: Membre | null;
  onConfirm: () => void;
}

const ConfirmAdddata: React.FC<ConfirmAdddataProps> = ({ open, onClose, data, onConfirm }) => {
  if (!data) return null;

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirm l'ajout du Membre</DialogTitle>
      <DialogContent>
        <div>
          <p>Vous etes sur d'ajouter cette Membre?</p>
         
          <p><strong>Nom:</strong> {data.nom}</p>
          <p><strong>Prenom:</strong> {data.prenom}</p>
          <p><strong>Role:</strong> {data.role}</p>
      
          
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
