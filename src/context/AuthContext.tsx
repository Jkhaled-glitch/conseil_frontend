import { createContext, useEffect, useReducer, ReactNode, Dispatch } from "react";
import AuthReducer, { AuthState, AuthAction } from "./AuthReducer";

// Initial state for the Auth context
const INITIAL_STATE: AuthState = {
  currentUser: JSON.parse(localStorage.getItem("gc_access_token") || "null"),
  currentRole: JSON.parse(localStorage.getItem("gc_user_role") || "null"),
  username: JSON.parse(localStorage.getItem("gc_username") || "null"),
  showSessionExpiredAlert: false,
};

// Define the context type
export type AuthContextType = {
  currentUser: string | null;
  currentRole: string | null;
  username: string | null;
  showSessionExpiredAlert: boolean;
  dispatch: Dispatch<AuthAction>;
};

// Create the Auth context with the defined type
export const AuthContext = createContext<AuthContextType>({
  currentUser: INITIAL_STATE.currentUser,
  currentRole: INITIAL_STATE.currentRole,
  showSessionExpiredAlert: INITIAL_STATE.showSessionExpiredAlert,
  username:INITIAL_STATE.username,
  dispatch: () => null,
});

// Define the props type for the AuthContextProvider component
type AuthContextProviderProps = {
  children: ReactNode;
};

// AuthContextProvider component
export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  // Update localStorage when currentUser or currentRole state changes
  useEffect(() => {
    localStorage.setItem("gc_access_token", JSON.stringify(state.currentUser));
    localStorage.setItem("gc_user_role", JSON.stringify(state.currentRole));
    localStorage.setItem("gc_username", JSON.stringify(state.username));
  }, [state.currentUser, state.currentRole, state.username]);

  return (
    <AuthContext.Provider value={{
      currentUser: state.currentUser,
      currentRole: state.currentRole,
      showSessionExpiredAlert: state.showSessionExpiredAlert,
      username: state.username,
      dispatch
    }}
    >
      {children}
    </AuthContext.Provider>
  );
};
