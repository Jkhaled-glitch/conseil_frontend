// PermissionsContext.tsx
import { createContext, useContext, useState, useEffect } from 'react';
import { Permission } from '../config/types';
import { AuthContext } from './AuthContext';
import { api } from '../config/config';


interface PermissionsContextType {
    permissions: Permission[];
    loading: boolean;
    error: string;
}

const PermissionsContext = createContext<PermissionsContextType | undefined>(undefined);

export const PermissionsProvider = ({ children }: { children: React.ReactNode }) => {
    const [permissions, setPermissions] = useState<Permission[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");

    const { currentRole } = useContext(AuthContext);

    useEffect(() => {
        setLoading(true);
        setError("");
        if (currentRole) {
            api.get(`/roles/${currentRole}/permissions`)
                .then(response => {
                    setPermissions(response.data as Permission[]);
                    setLoading(false);
                })
                .catch(error => {
                    let errorMessage = error.code === "ERR_NETWORK" ? error.message : error.response?.data.message || "Unexpected error, please contact your Administrator";
                    setError(errorMessage);
                    setLoading(false);
                });

        }

    }, [currentRole]);

    return (
        <PermissionsContext.Provider value={{ permissions, loading, error }}>
            {children}
        </PermissionsContext.Provider>
    );
};

export const usePermissions = () => {
    const context = useContext(PermissionsContext);
    if (!context) {
        throw new Error('usePermissions must be used within a PermissionsProvider');
    }
    return context;
};
