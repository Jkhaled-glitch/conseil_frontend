
import { toast } from "react-toastify";
import { api } from "../../config/config";
import { Conseil, Point, PresenceRequest, PointRequest } from "../../config/types";

// Fonction pour ajouter un conseil
export const addConseil = async (conseil: Partial<Conseil>) => {
  try {
    const response = await api.post("/conseils/add", conseil); 
    toast.success("Conseil ajouté avec succès !");
    return response.data as Conseil;
  } catch (error) {
    console.error("Erreur lors de l'ajout du conseil :", error);
    toast.error("Erreur lors de l'ajout du conseil");
    throw new Error("Erreur lors de l'ajout du conseil");
  }
};


// Fonction pour ajouter une présence
export const addPresence = async (conseilId: number, presence: PresenceRequest) => {


    const { document, ...presenceData } = presence;
    try {
      // Envoi des présences en JSON (pas besoin de FormData ici)
      const response = await api.post(`/conseils/${conseilId}/presences/add`, presenceData);
        const presenceId = response.data.id  as number ;

        toast.success("Présence ajoutée avec succès !");
      if( presenceData.statut == "D" ){
        if(document){
            await addDocumentPresence(conseilId,presenceId , document) ;
        }else{
            toast.error("error innatendue")
        }
        
      }

      return response.data;
    } catch (error) {
      console.error("Erreur lors de l'ajout des présences :", error);
      toast.error("Erreur lors de l'ajout des présences");
      throw new Error("Erreur lors de l'ajout des présences");
    }
  };


  export const addPv = async (conseilId : number ,file: File) => {
    try {
  
     
     
        const formData = new FormData();
        formData.append("file", file);

       
        await api.post(`conseils/${conseilId}/add-pv`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
  
        console.log("PV ajouté avec succès !");
      
  
      toast.success("PV ajoutés avec succès !");
    } catch (error) {
      console.error("Erreur lors de l'ajout des documents de présence :", error);
      toast.error("Erreur lors de l'ajout des documents de présence");
      throw new Error("Erreur lors de l'ajout des documents de présence");
    }
  };

  

  // Fonction pour ajouter des documents pour des présences spécifiques
 const addDocumentPresence = async (conseilId : number, presenceId: number ,file: File) => {
    try {
  
      // Envoi des documents pour chaque présence
     
        const formData = new FormData();
        formData.append("file", file);

        
  
        await api.post(`conseils/${conseilId}/presences/${presenceId}/document`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
  
        console.log("Document ajouté avec succès !");
      
  
      toast.success("Document de présence "+presenceId + " ajoutés avec succès !");
    } catch (error) {
      console.error("Erreur lors de l'ajout des documents de présence :", error);
      toast.error("Erreur lors de l'ajout des documents de présence");
      throw new Error("Erreur lors de l'ajout des documents de présence");
    }
  };

  
  // Fonction pour ajouter un point à un conseil
export const addPoint = async (conseilId: number, point: PointRequest) => {

    const { 
        nom,
        documents,
    } = point
    try {
      const response = await api.post(`/conseils/${conseilId}/points/add`, {nom});
      
      toast.success("Point ajouté avec succès !");
      const result = response.data as Point ;
      for (const doc of documents) {
        await addDocumentPoint(conseilId , result.id , doc.file , doc.name) ;
      }

      return result;
    } catch (error) {
      console.error("Erreur lors de l'ajout des points :", error);
      toast.error("Erreur lors de l'ajout des points");
      throw new Error("Erreur lors de l'ajout des points");
    }
  };

  

  // Fonction pour ajouter des documents aux points
  const addDocumentPoint = async (conseilId : number, pointId: number ,file: File , nom:string) => {
    try {
  
      // Envoi des documents pour chaque présence
     
        const formData = new FormData();
        formData.append("file", file);
        formData.append("nom", nom);

        
  
        await api.post(`conseils/${conseilId}/points/${pointId}/document`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
  
        console.log("Document Point ajouté avec succès !");
      
  
      toast.success("Document de présence "+pointId + " ajoutés avec succès !");
    } catch (error) {
      console.error("Erreur lors de l'ajout des documents de présence :", error);
      toast.error("Erreur lors de l'ajout des documents de présence");
      throw new Error("Erreur lors de l'ajout des documents de présence");
    }

};


    /************************************************************************* */

   // Edit methods

    
 // Récupérer les détails complets d'un conseil
export const getConseilDetails = async (id: number): Promise<Conseil> => {
    const response = await api.get(`/conseils/${id}/details`);
    return response.data;
  };
  
  // Mettre à jour les informations de base du conseil
  export const updateConseil = async (id: number, data: { nom: string; dreunion: string }) => {
    await api.put(`/conseils/${id}`, data);
  };
  
  // Mettre à jour une présence
  export const updatePresence = async (id: number, data: {
    statut: "P" | "A" | "D";
    delegueA?: number;
    document?: File;
  }) => {
    const formData = new FormData();
    formData.append('statut', data.statut);
    if (data.delegueA) formData.append('delegueA', data.delegueA.toString());
    if (data.document) formData.append('document', data.document);
    
    await api.put(`/presences/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  };
  
  // Mettre à jour un point
  export const updatePoint = async (id: number, data: { nom: string; numero: number }) => {
    await api.put(`/points/${id}`, data);
  };
  
  // Mettre à jour le PV
  export const updatePv = async (conseilId: number, pv: FormData) => {
    await api.post(`/conseils/${conseilId}/pv`, pv, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  };
  
  // Supprimer un document
  export const deleteDocument = async (pointId: number, docId: number) => {
    await api.delete(`/points/${pointId}/documents/${docId}`);
  };
  
  // Ajouter un document à un point
  export const addDocumentToPoint = async (pointId: number, doc: FormData) => {
    const response = await api.post(`/points/${pointId}/documents`, doc, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  };


  export const deletePresence = async(presenceId:number)=>{

  }


  export const deletePoint = async(presenceId:number)=>{
    
  }
  