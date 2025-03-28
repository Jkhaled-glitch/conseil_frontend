import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';
import { User } from '../../config/types';

interface ViewProps {
  open: boolean;
  onClose: () => void;
  data: User | null;
}

const ViewLogement: React.FC<ViewProps> = ({ open, onClose, data }) => {
  if (!data) return null;

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm"> {/* Ajout de fullWidth et maxWidth */}
      <DialogTitle>Voir Utilisateur</DialogTitle>
      <DialogContent>
        <div>
          <p><strong>Firstname:</strong> {data.firstname}</p>
          <p><strong>Lastname:</strong> {data.lastname}</p>
          <p><strong>Username:</strong> {data.username}</p>
          <p><strong>Role:</strong> {data.role.name}</p>
       
          
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">Fermer</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ViewLogement;
