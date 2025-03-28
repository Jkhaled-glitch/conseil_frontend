



export interface User {
  username: string;
  firstname: string;
  lastname: string;
  password: string;
  role: Role
  isActif: boolean;
}



export interface UserRequest {
  username: string;
  firstname: string;
  lastname: string;
  password: string;
  role: string
}



export interface Role {
  name: string;
  permissions: Permission[]

}

export interface Permission {
  id: number;
  name: string;
  path: string;
}





export interface Historique {
  id: number;
  action: string;
  entity: string;
  reference: string;
  createdAt: Date;
  createdBy: User;
}



export interface PasswordInfo {
  password: string;
  confirmPassword: string;
}






export interface Membre {
  id: number;
  nom: string;
  prenom: string;
  role: string;
  isActif:boolean ;
}

export interface DocumentRequest {

  name: string;
  file: File;
}


export interface Document {
  id: number;
  name: string;
  url: string;
  file?:File ;

}

export interface PointRequest {

  nom: string;
  documents: DocumentRequest[];
  numero:number;
  selectedFile: DocumentRequest | null;
}


export interface Point {
  id: number;
  numero: number;
  nom: string;
  documents: Document[];
  selectedFile?:File
}


export interface Presence {
  id: number;
  membre: Membre;
  statut: "P" | "A" | "D";
  document?: Document;
  delegueA?: Membre;
}







export interface PresenceRequest {

  membre: number;
  statut: "P" | "A" | "D";
  delegueA?: number;
  document?: File;
}



export interface Conseil {
  id: number;
  nom: string;
  dreunion: string;
  daccord: string;
  points: Point[]
  pv: Document;
  presences: Presence[];

}

/********************************************* */


type PresenceStatut = "P" | "A" | "D";


export type DocumentEdit = {
  id?: number; // Optionnel car nouveau document n'a pas encore d'ID
  name: string;
  file: File | null; // Fichier peut être null si déjà en base
};



export type PresenceEdit= {
  id?: number; // Optionnel pour les nouvelles présences
  membre: number; // ID du membre
  statut: PresenceStatut;
  delegueA?: number; // ID du membre délégué
  document?: {
    id?: number;
    name: string;
    file: File;
  };
};



// Requête pour un point
export type PointEdit = {
  id?: number; // Optionnel pour les nouveaux points
  numero: number;
  nom: string;
  documents: Array<{
    id?: number;
    name: string;
    file: File | null;
  }>;
  selectedFile: {
    name: string;
    file: File;
  } | null;
};

// Requête pour un document
export type DocumentEdit2 = {
  name: string;
  file: File;
};



export  type DocumentResponse = {
  id: number;
  nom: string;
  url: string;
  createdAt: string;
};

// Réponse après mise à jour d'une présence
type PresenceResponse = {
  id: number;
  statut: PresenceStatut;
  membreId: number;
  delegueAId: number | null;
  documentId: number | null;
};

// Réponse après mise à jour d'un point
type PointResponse = {
  id: number;
  numero: number;
  nom: string;
  conseilId: number;
};























