import { FC, useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { menuItems, Item, SubItem } from "./MenuItems";
import Logo from './assets/logo.png';
import { AuthContext } from "./context/AuthContext";



const Icon = ({ icon }: { icon: string }) => (
  <span className="material-symbols-outlined">{icon}</span>
);

export const NavHeader: FC<{ toggleSidebar: () => void; isOpen: boolean, username: string | null }> = ({ toggleSidebar, isOpen, username }) => {
  const { currentRole, dispatch } = useContext(AuthContext);
  const [dropdownVisible, setDropdownVisible] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setDropdownVisible((prev) => !prev);
  };
  const handleLogOut = () => {
    toggleDropdown()
    dispatch({ type: "LOGOUT" });
  };


  const navigate = useNavigate()


  const handleChangMDP = () => {
    toggleDropdown()
    navigate("/account/changer-mot-passe")
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


  return (
    <header className="sidebar-header">
      <button type="button" onClick={toggleSidebar}>
        <Icon icon={isOpen ? "close" : "menu"} />
      </button>

      <div className={`user_link ${isOpen ? "" : "invisible"} `} onClick={() => toggleDropdown()}>
        <p className={`admin-title`} onClick={() => { }}>{currentRole}</p>
        <img src={Logo} alt="Logo" className={`sidebar-logo `} />

      </div>

      {dropdownVisible && (

        <div className="dropdown-menu" ref={dropdownRef} >

          <span className="username">{username}</span>
          <span onClick={() => handleLogOut()}   >
            <Icon icon={"logout"} />
            <span>Deconnexion</span>
          </span>
          <span onClick={() => handleChangMDP()} >
            <Icon icon={"lock_open"} />
            <span>ChangerMDP</span>

          </span>
        </div>
      )}




    </header>
  );
};

type ButtonProps = {
  onClick: (item: string, path?: string, isLogOut?: boolean) => void;
  name: string;
  icon?: string;
  isActive: boolean;
  hasSubNav?: boolean;
  isOpen: boolean;
  path?: string;
  isLogOut?: boolean;
};

export const NavButton: FC<ButtonProps> = ({
  onClick,
  name,
  icon,
  isActive,
  hasSubNav,
  isOpen,
  path,
}) => (
  <button
    type="button"
    onClick={() => onClick(name, path)}
    className={isActive ? "active" : ""}
    title={name}
  >
    {icon && <Icon icon={icon} />}
    {isOpen && <span>{name}</span>}
    {hasSubNav && isOpen && <Icon icon="expand_more" />}
  </button>
);

type SubMenuProps = {
  item: Item;
  activeItem: string;
  handleClick: (item: string, path?: string, isLogOut?: boolean) => void;
  isOpen: boolean;
};

export const SubMenu: FC<SubMenuProps> = ({ item, activeItem, handleClick, isOpen }) => {
  const navRef = useRef<HTMLDivElement>(null);

  const isSubNavOpen = (item: string, items?: SubItem[]) =>
    items?.some((i) => i.name === activeItem) || item === activeItem;

  return (
    <div
      className={`sub-nav ${isSubNavOpen(item.name, item.items) ? "open" : ""}`}
      style={{
        height: !isSubNavOpen(item.name, item.items)
          ? 0
          : navRef.current?.clientHeight,
      }}
    >
      <div ref={navRef} className="sub-nav-inner">
        {item?.items?.map((subItem) => (
          <NavButton
            key={subItem.name}
            onClick={handleClick}
            name={subItem.name}
            path={subItem.path}
            isActive={activeItem === subItem.name}
            isOpen={isOpen}
            isLogOut={subItem.isLogOut}
            icon={subItem.icon}
          />
        ))}
      </div>
    </div>
  );
};
