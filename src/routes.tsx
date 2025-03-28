import {  Route, Routes } from "react-router-dom";
import { Box, CircularProgress, Typography } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { usePermissions } from "./context/PermissionsContext";

import {
  ChangePassword,Conseil,CreateConseil,DetailsConseil,DocumentViewer,Historique,Membre

} from './components'
import NoAccess from "./config/noAccessPermission";
import NotFound from "./config/NotFound";
import {default as Role} from './components/roles'
import {default as User} from './components/user'


interface RouteProps {
  path: string;
  element: JSX.Element;
}





const routes: RouteProps[] = [

 
  { path: "/", element: <>Home Page</> },
  { path: "/conseil/add", element: <CreateConseil /> },
  { path: "/conseil", element: <Conseil /> },
  { path: "/conseil/:id", element: <DetailsConseil /> },
  { path: "/document/:documentId", element: <DocumentViewer /> },

  { path: "/membres", element: <Membre /> },
  { path: "/administration/gestion-historique", element: <Historique /> },

  { path: "/administration/gestion-accees", element: <Role /> },

  { path: "/administration/gestion-utilisateur", element: <User /> },
  

  { path: "/account/changer-mot-passe", element: <ChangePassword /> },


];




const MainComponent: React.FC = () => {

  const { permissions, loading, error } = usePermissions()



  // Fonction pour vérifier si un chemin est accessible pour un rôle donné
  const canAccessPath = (path: string): boolean => {
    return true;
   // return permissions.some(permission => permission.path === path);
  };

  const RequirePermission: React.FC<{ children: React.ReactNode; path: string }> = ({ children, path }) => {
    return canAccessPath(path) ? <>{children}</> : <NoAccess />;
  };

  if (error) {
    return (
   
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        height="100vh"
        textAlign="center"
        gap={2}
      >
        <ErrorOutlineIcon color="error" sx={{ fontSize: 60 }} />
        <Typography variant="h6" color="error">
          Une erreur est survenue
        </Typography>
        <Typography variant="body1">{error}</Typography>

      </Box>
    
    )
  }

  if (loading) {
    return (
      
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
     
    )
  }

  





  return (
  
      <Routes>
        {routes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            element={
              <RequirePermission path={route.path}>
                {route.element}
              </RequirePermission>
            }
          />
        ))}
        {/* Route par défaut */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    
  );
}

export default MainComponent;
