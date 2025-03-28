import React from 'react';
import { Button, Typography, Container } from '@mui/material';

const NoAccess: React.FC = () => {
  return (
    <Container
  
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh', // Pleine hauteur de l'écran
        padding: '20px',
      }}
    >
      <Typography variant="h3" color="error" gutterBottom>
        Accès Non Autorisées
      </Typography>
      <Typography variant="h5" color="textSecondary" paragraph>
        Vous n'avez pas accès à cette interface. Veuillez contacter l'administrateur pour plus d'informations.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => window.history.back()}
        style={{ marginTop: '20px' }}
      >
        Retour 
      </Button>
    </Container>
  );
};

export default NoAccess;
