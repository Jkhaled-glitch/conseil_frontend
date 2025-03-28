import React, { useContext } from "react";

import { AuthContext } from "../../context/AuthContext";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from "@mui/material";



// Composant d'alerte pour la session expirée
const SessionExpiredAlert: React.FC = () => {
  const { showSessionExpiredAlert, dispatch } = useContext(AuthContext);

  // Fonction de logout l'utilisateur (la fermeture sera par defaut avec logout action )
  const handleClose = () => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <Dialog open={showSessionExpiredAlert} onClose={handleClose}>
      <DialogTitle>Session expirée</DialogTitle>
      <DialogContent>Votre session a expiré. Veuillez vous reconnecter.</DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">OK</Button>
      </DialogActions>
    </Dialog>
  );
};

export default SessionExpiredAlert;
