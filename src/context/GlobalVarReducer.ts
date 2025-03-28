export type AuthState = {
    currentUser: string | null;
  };
  
  export type AuthAction = 
    | { type: "LOGIN"; payload: string }
    | { type: "LOGOUT" };
  
  const AuthReducer = (state: AuthState, action: AuthAction): AuthState => {
    switch (action.type) {
      case "LOGIN": {
        return {
          currentUser: action.payload,
        };
      }
      case "LOGOUT": {
        return {
          currentUser: null,
        };
      }
      default:
        return state;
    }
  };
  
  export default AuthReducer;
  