import {   useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Item, menuItems } from "./MenuItems";

import { NavButton, NavHeader, SubMenu } from "./SideBarElements";
import { useSidebar } from "./context/SideBarContext";
import { AuthContext } from "./context/AuthContext";
import { usePermissions } from "./context/PermissionsContext";

interface Props {
  open:boolean;
  setOpen:(state:boolean)=>void
}


export const Sidebar:React.FC = () => {
  const [activeItem, setActiveItem] = useState<string>("");
 
  const navigate = useNavigate();
  const {open,setOpen} = useSidebar();

  const {username} = useContext(AuthContext)
  

  const handleClick = (item: string, path?: string) => {
    setActiveItem(item !== activeItem ? item : "");
    if (path) {
      navigate(path);
    }
  };

  const toggleSidebar = () => {
    setOpen(!open);
  };


  const {permissions} = usePermissions();

const hasPermission = (path?: string) => {
  return true;
  //return path ? permissions.some(permission => permission.path === path) : false;
};

// Fonction pour filtrer le menu en fonction des permissions
const filterMenuItems = (items: Item[]): Item[] => {
  return items
    .map(item => {
      if (item.items) {
        const filteredSubItems = item.items.filter(subItem => hasPermission(subItem.path));
        return filteredSubItems.length > 0 ? { ...item, items: filteredSubItems } : null;
      }
      return hasPermission(item.path) ? item : null;
    })
    .filter(Boolean) as Item[];
};




const permissionItems = filterMenuItems(menuItems);

/*

useEffect(() => {
  if (permissionItems.length > 0) {
    const firstValidPath = permissionItems
      .flatMap((item: Item) => {
        // Si l'item a des sous-éléments, on retourne leurs paths
        if (item.items) {
          return item.items.map((subItem: SubItem) => subItem.path).filter(Boolean); // Récupère les paths des sous-éléments
        } else {
          return item.path ? [item.path] : []; // Retourne le path de l'item, s'il existe
        }
      })
      .find((path: string | undefined) => path); // Cherche le premier path valide

    if (firstValidPath) {
   
      navigate(firstValidPath)
    }
  }
}, [permissions]);
*/









 



  return (

      <aside className={`sidebar ${open ? "open" : "closed"}`}>
        <NavHeader toggleSidebar={toggleSidebar} isOpen={open} username={username}/>

        {permissionItems.map((item) => (
          <div key={item.name} title={item.name}>
            <NavButton
              onClick={handleClick}
              name={item.name}
              icon={item.icon}
              isActive={activeItem === item.name}
              hasSubNav={!!item.items}
              isOpen={open}
              path={item.path}
              isLogOut={item.name === "Déconnexion"}
            />
            {item.items && (
              <SubMenu
                activeItem={activeItem}
                handleClick={handleClick}
                item={item}
                isOpen={open}
              />
            )}
          </div>
        ))}
   

      </aside>
     
   
      
    
  
  );
};
