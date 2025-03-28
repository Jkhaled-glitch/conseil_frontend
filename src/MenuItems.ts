export type SubItem = {
  name: string;
  path?: string;
  isLogOut?: boolean;
  icon?: string;
};

export type Item = {
  name: string;
  icon: string;
  items?: SubItem[];
  path?: string;
};

export const menuItems: Item[] = [  
  {
    name: "Home",
    icon: "home",
    path: "/",
  },

  {
    name: "Conseils",
    icon: "home",
    path: "conseil",
  },
  {
    name: "Créer Conseils",
    icon: "home",
    path: "conseil/add",
  },
  {
    name: "Membres",
    icon: "home",
    path: "membres",
  }
  
];
