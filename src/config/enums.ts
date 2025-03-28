export enum Gouvernorat {
    Ariana = 'Ariana',
    Beja = 'Beja',
    BenArous = 'BenArous',
    Bizerte = 'Bizerte',
    Gabes = 'Gabes',
    Gafsa = 'Gafsa',
    Jendouba = 'Jendouba',
    Kairouan = 'Kairouan',
    Kasserine = 'Kasserine',
    Kef = 'Kef',
    Mahdia = 'Mahdia',
    Manouba = 'Manouba',
    Medenine = 'Medenine',
    Monastir = 'Monastir',
    Nabeul = 'Nabeul',
    Sfax = 'Sfax',
    SidiBouzid = 'SidiBouzid',
    Siliana = 'Siliana',
    Sousse = 'Sousse',
    Tataouine = 'Tataouine',
    Tozeur = 'Tozeur',
    Tunis = 'Tunis',
    Zaghouan = 'Zaghouan',
  }

  export enum  ClientTypes{
    ACQUEREUR="ACQUEREUR",
    LOCATAIRE="LOCATAIRE"
  }

  export enum  ClientCategories{
    CLASSE1="CLASSE1",
    CLASSE2="CLASSE2",
    CLASSE3="CLASSE3"
  }

  

  export enum  Sexes{
    HOMME="HOMME",
    FEMME="FEMME"
  }
  

  export enum LogementType {
    S1="S1",
    S2="S2"
  }

  export enum LogementContratLvType {
    S0="S+0",
    S1="S+1",
    S2="S+2",
    S3="S+3",
  }


  export enum LogementStatus {
    Libre="Libre",
    OnLocation="OnLocation",
    OnAchat="OnAchat"
  }

  export enum ContratType {
    VENTE,
    LOCATION,
    LOCATION_VENTE
  }


  export enum EcheanceStatus {
    NON_PAYE="NON_PAYE",
    PAYE_PARTIELLEMENT="PAYE_PARTIELLEMENT",
    PAYE="PAYE"
}


export enum ModePaiement {
  ESPECES="ESPECES",
  CARTE_BANCAIRE="CARTE_BANCAIRE",
  VIREMENT_BANCAIRE="VIREMENT_BANCAIRE",
  CHEQUE="CHEQUE",
  PAIEMENT_MOBILE="PAIEMENT_MOBILE",
  PRELEVEMENT_AUTOMATIQUE="PRELEVEMENT_AUTOMATIQUE",
  PAIEMENT_EN_LIGNE="PAIEMENT_EN_LIGNE",
  BON_ACHAT="BON_ACHAT",
  CREDIT="CREDIT",
  AUTRE="AUTRE"
}