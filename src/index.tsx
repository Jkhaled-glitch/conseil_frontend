import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { DarkModeContextProvider } from "./context/darkModeContext";
import { AuthContextProvider } from "./context/AuthContext";
import { PermissionsProvider } from "./context/PermissionsContext";
import { SidebarProvider } from "./context/SideBarContext";


import {  ThemeProvider, createTheme } from "@mui/material";


const theme = createTheme({
  direction: "rtl", // Active l'écriture de droite à gauche
  typography: {
    fontFamily: "'Tajawal', sans-serif", // Police arabe
  },
});


const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);




root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <DarkModeContextProvider>
        <AuthContextProvider>
          <PermissionsProvider>
            <SidebarProvider>
              <App />
            </SidebarProvider>
          </PermissionsProvider>
        </AuthContextProvider>
      </DarkModeContextProvider>
    </ThemeProvider>

  </React.StrictMode>

);
