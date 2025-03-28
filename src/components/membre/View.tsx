import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';
import { Membre } from '../../config/types';

interface ViewProps {
  open: boolean;
  onClose: () => void;
  data: Membre | null;
}

const ViewLogement: React.FC<ViewProps> = ({ open, onClose, data }) => {
  if (!data) return null;

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm"> {/* Ajout de fullWidth et maxWidth */}
      <DialogTitle>Voir Membre</DialogTitle>
      <DialogContent>
        <div>
          <p><strong>ID:</strong> {data.id}</p>
          <p><strong>Nom:</strong> {data.nom}</p>
          <p><strong>Prénom:</strong> {data.prenom}</p>
          <p><strong>Role:</strong> {data.role}</p>
       
          <p><strong>Membre Actif :</strong> {data.isActif ? "OUI" :"NON"}</p>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">Fermer</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ViewLogement;
