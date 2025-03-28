import { createContext, useContext, useState, ReactNode } from "react";

interface SidebarContextType {
  open: boolean;
  setOpen: (open: boolean) => void;
}

// Création du contexte
const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

// Hook personnalisé pour utiliser le contexte
export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) throw new Error("useSidebar must be used within a SidebarProvider");
  return context;
};

// Provider pour envelopper l'application
export const SidebarProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(true);

  return (
    <SidebarContext.Provider value={{ open, setOpen }}>
      {children}
    </SidebarContext.Provider>
  );
};
