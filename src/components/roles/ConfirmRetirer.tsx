import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';
import { Permission } from '../../config/types';

interface ConfirmDeleteProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  permission:Permission;

  role:string;
}

const ConfirmRetirer: React.FC<ConfirmDeleteProps> = ({ open, onClose, onConfirm,permission, role }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirmer Retiration d'Accées</DialogTitle>
      <DialogContent>
        Vous etes sur de retirer l'accées  {permission.name}  pour le Role {role}?
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">Annuler</Button>
        <Button onClick={onConfirm} color="secondary">Supprimer</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmRetirer;
