import { usePermissions } from './PermissionsContext';
export type AuthState = {
  currentUser: string | null;
  currentRole: string | null;
  username:string | null ;
  showSessionExpiredAlert:boolean;
};


export type AuthAction = 
  | { type: "LOGIN"; payload: { user: string, role: string,username:string } }
  | { type: "LOGOUT" }
  | { type: "SHOW_SESSION_EXPIRED_ALERT"; payload: boolean };


const AuthReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "LOGIN": {
      return {
        ...state,
        currentUser: action.payload.user,
        currentRole:action.payload.role,
        username : action.payload.username
       
      };
    }
    case "LOGOUT": {
      return {
        showSessionExpiredAlert:false,
        currentUser: null,
        currentRole: null,
        username:null
       
      };
    }
    case "SHOW_SESSION_EXPIRED_ALERT": {
      return {
        ...state,
        showSessionExpiredAlert:action.payload
       
      };
    }
    default:
      return state;
  }
};

export default AuthReducer;
