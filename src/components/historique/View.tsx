import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';
import { Historique } from '../../config/types';
import { format } from 'date-fns'; // Correction de l'import de format

interface ViewProps {
  open: boolean;
  onClose: () => void;
  historique: Historique | null;
}

const View: React.FC<ViewProps> = ({ open, onClose, historique }) => {
  if (!historique) return null;

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Voir Historique</DialogTitle>
      <DialogContent>
        <div>
          <p><strong>Action:</strong> {historique.action}</p>
          <p><strong>Entité:</strong> {historique.entity}</p>
          <p><strong>Reference:</strong> {historique.reference}</p>
          <p><strong>Utilisateur:</strong></p>
          <ul>
            <li>Username: {historique.createdBy.username}</li>
            <li>nom: {historique.createdBy.firstname}</li>
            <li>prenom: {historique.createdBy.lastname}</li>
            <li>Role: {historique.createdBy.role.name}</li>
          </ul>
          <p><strong>Date:</strong> {format(new Date(historique.createdAt), 'yyyy-MM-dd HH:mm')}</p>
        
     
        
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">Fermer</Button>
      </DialogActions>
    </Dialog>
  );
};

export default View;
