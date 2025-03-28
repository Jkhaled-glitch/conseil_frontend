
import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { toast } from 'react-toastify';

export const base_url = 'http://192.1.1.44:8081/api/v1';


// Instance Axios
export const api = axios.create({
  baseURL: base_url,
});


let requestInterceptorId: number | null = null;
let responseInterceptorId: number | null = null;



// config.ts
export const setupAxiosInterceptors = (handleSessionExpired: () => void, token: string ) => {
  //removing the saved configuration 
  resetInterceptors();
  return new Promise<void>((resolve, reject) => {
    if (token) {
      // Intercepteur de requêtes pour ajouter le token
      requestInterceptorId = api.interceptors.request.use(

        (config: InternalAxiosRequestConfig) => {

          if (token) {
            // Ajouter le token Bearer dans les en-têtes si disponible
            config.headers = config.headers || {}; // Assurez-vous que headers existe
            config.headers['Authorization'] = `Bearer ${token}`;
          }
          return config;
        },
        (error: AxiosError) => {
          // Gestion des erreurs de requête
          console.log(error);
          return Promise.reject(error);
        }
      );

      // Intercepteur de réponse pour gérer les erreurs 401 (session expirée)
      responseInterceptorId = api.interceptors.response.use(
        (response: AxiosResponse) => response,
        (error: AxiosError) => {
          console.log(error)

          if (error.code === "ERR_NETWORK") {
            // Gérer les erreurs réseau
            toast.error(error.message);
            return Promise.reject(error); // Arrêter l'exécution pour les erreurs réseau
          }

          const errorData = error.response?.data as {
            message?: string;
          }

          const errorMessage = errorData.message || "Une erreur inattendue est survenue. Veuillez contacter votre administrateur.";
          toast.error(error.response?.status + ' | ' + errorMessage)
        
          if (error.response?.status === 401) {
            handleSessionExpired();
          }
          return Promise.reject(error);
        }
      );

      resolve();
    } else {
      reject("Token is missing");
    }
  });
};




const resetInterceptors = () => {
  if (requestInterceptorId !== null) {
    api.interceptors.request.eject(requestInterceptorId);
    requestInterceptorId = null;
  }
  if (responseInterceptorId !== null) {
    api.interceptors.response.eject(responseInterceptorId);
    responseInterceptorId = null;
  }
};







