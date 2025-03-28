import { BrowserRouter } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import "./styles.css";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Route, Routes, Navigate } from "react-router-dom";
import { useContext, ReactNode, FC, useEffect, useRef, useState, useMemo } from "react";
import { AuthContext } from "./context/AuthContext";
import Login from './components/auth/Login';
import SessionExpieredAlert from './components/auth/session';
import { setupAxiosInterceptors } from "./config/config";
import MainComponent from "./routes";
import { useSidebar } from "./context/SideBarContext";

interface RequireAuthProps {
  children: ReactNode;
}

const RequireAuth: FC<RequireAuthProps> = ({ children }) => {
  const { currentUser } = useContext(AuthContext);
  return currentUser ? <>{children}</> : <Navigate to="/login" />;
};

function App() {
  const { currentUser, dispatch, showSessionExpiredAlert } = useContext(AuthContext);

  // Définir la fonction de gestion de l'expiration de session
  const handleSessionExpired = () => {
    dispatch({ type: "SHOW_SESSION_EXPIRED_ALERT", payload: true });
  };



  const [isInterceptorsReady, setIsInterceptorsReady] = useState(false)

  useEffect(() => {
    if (currentUser) {

      setupAxiosInterceptors(handleSessionExpired, currentUser).then(() => {
        setIsInterceptorsReady(true);
      });
      console.log(currentUser)
    }
    


  }, [currentUser]);


  const { open } = useSidebar()




  const memoizedMainComponent = useMemo(() => <MainComponent />, []);


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={
            <RequireAuth>
              {
                isInterceptorsReady &&
                <div  >
                  <Sidebar />
                  <main className={`main-content ${open ? "" : "sidebar-closed"}`}>
                   {memoizedMainComponent}
                  </main>

                  {showSessionExpiredAlert && <SessionExpieredAlert />}
                </div>

              }

            </RequireAuth>
          } />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
