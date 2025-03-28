import { createContext, useEffect, useReducer, ReactNode, Dispatch } from "react";
import AuthReducer, { AuthState, AuthAction } from "./AuthReducer";

// Initial state for the Auth context
const INITIAL_STATE: AuthState = {
  currentUser: JSON.parse(localStorage.getItem("gc_access_token") || "null"),
};

// Define the context type
type AuthContextType = {
  currentUser: string | null;
  dispatch: Dispatch<AuthAction>;
};

// Create the Auth context with the defined type
export const AuthContext = createContext<AuthContextType>({
  currentUser: INITIAL_STATE.currentUser,
  dispatch: () => null,
});

// Define the props type for the AuthContextProvider component
type AuthContextProviderProps = {
  children: ReactNode;
};

// AuthContextProvider component
export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  // Update localStorage when currentUser state changes
  useEffect(() => {
    localStorage.setItem("gc_access_token", JSON.stringify(state.currentUser));
  }, [state.currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser: state.currentUser, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
