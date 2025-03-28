

import React from 'react';
import { Button, Typography, Container } from '@mui/material';

const NotFound = () => {
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
      404 | Page Non trouvé
      </Typography>
      <Typography variant="h5" color="textSecondary" paragraph>
      La page que vous recherchez n'existe pas. Veuillez vérifier l'URL manuellement saisie.
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

export default NotFound;

