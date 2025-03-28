import React, { useContext, useEffect, useState } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";
import { AuthContext, AuthContextType } from "../../context/AuthContext";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
//import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { toast } from 'react-toastify';

import { base_url } from "../../config/config";
import axios from "axios";

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <span color="inherit" >
        SNIT
      </span>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}





const SignIn: React.FC = () => {
  const navigate = useNavigate();
  const { dispatch, currentUser } = useContext<AuthContextType>(AuthContext);


  useEffect(() => {
    if (currentUser) navigate("/");
  }, [currentUser, navigate]);

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errors, setErrors] = useState<{ username?: string; password?: string }>({});

  const validateForm = () => {
    const newErrors: { username?: string; password?: string } = {};
    if (!username) newErrors.username = "Le nom d'utilisateur est requis";
    if (!password) newErrors.password = "Le mot de passe est requis";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validateForm()) return;

    const loginData = { username, password };


    axios.post(`${base_url}/auth/authenticate`, loginData)
      .then(response => {
        const { access_token, role, username } = response.data;

        // Dispatch the login action with both the token and the role and username
        dispatch({ type: "LOGIN", payload: { user: access_token, role: role, username } });
        toast.success('Connexion réussie !');

        navigate("/");

      }).catch(error => {


        if (error.code === "ERR_NETWORK") {
          // Gérer les erreurs réseau
          toast.error(error.message);

        } else {
          const errorData = error.response?.data as {
            message?: string;
          }

          const errorMessage = errorData.message || "Une erreur inattendue est survenue. Veuillez contacter votre administrateur.";
          toast.error(error.response?.status + ' | ' + errorMessage)

        }


      });





  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography
          component="h1"
          variant="h4"
          sx={{
            color: '#1F5BF3',
            marginBottom: 8,
            textAlign: 'center',  // Centre le texte 
            width: '100%'  // Assure que le conteneur prend toute la largeur
          }}
        >
          <strong>Conseils Administratives</strong>
        </Typography>

        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }} style={{ background: '#1F5BF3' }}>
          {
            //<LockOutlinedIcon />
          }
        </Avatar>
        <Typography component="h1" variant="h5">
          Se Connecter
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            fullWidth
            id="username"
            label="Utilisateur"
            name="username"
            autoComplete="username"
            autoFocus
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            error={!!errors.username}
            helperText={errors.username}
          />
          <TextField
            margin="normal"
            fullWidth
            name="password"
            label="Mot de passe"
            type="password"
            id="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={!!errors.password}
            helperText={errors.password}
          />
          <FormControlLabel
            control={<Checkbox value="remember" />}
            label="Se souvenir de moi"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            style={{ background: '#1F5BF3' }}
          >
            Connecter
          </Button>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
}

export default SignIn;
