import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';

interface ConfirmDeleteProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  data:number;
}

const ConfirmDelete: React.FC<ConfirmDeleteProps> = ({ open, onClose, onConfirm,data }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirmer Suppression</DialogTitle>
      <DialogContent>
        Vous etes sur de supprimer cette Personnel avec Matricule: {data} ?
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">Annuler</Button>
        <Button onClick={onConfirm} color="secondary">Supprimer</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDelete;
