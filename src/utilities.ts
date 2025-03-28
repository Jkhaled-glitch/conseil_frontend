export const  formatDateToStr=(date: Date): string =>{
    // Obtenir le jour, le mois et l'année
    const day: string = date.getDate().toString().padStart(2, '0');
    const month: string = (date.getMonth() + 1).toString().padStart(2, '0'); 
    const year: string = date.getFullYear().toString();
  
    // Construire la chaîne de date au format "jj-mm-yyyy"
    return `${day}-${month}-${year}`;
  }



  export function extractDate(dateTimeStr: string): string {
    // Diviser la chaîne sur un espace et prendre la première partie
    const dateStr = dateTimeStr.split(' ')[0];
    return dateStr;
  }



  
  