export const excelSerialToDate=(serial)=> {
    // Date de référence Excel 0 (30 décembre 1899)
    const referenceDate = new Date(1899, 11, 30);
    // Ajouter le nombre de jours au numéro de série
    const date = new Date(referenceDate.getTime() + serial * 24 * 60 * 60 * 1000);
    
    // Extraire le jour, le mois et l'année
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    
    // Retourner la date au format "dd/mm/yyyy"
    return `${day}/${month}/${year}`;
}




  



