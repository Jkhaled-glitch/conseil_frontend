import React, { useState } from 'react';
import { PDFViewer, Document, Page, Text, View, StyleSheet, Font, Image } from '@react-pdf/renderer';
import AmiriRegular from '../assets/fonts/amiri/Amiri-Regular.ttf';
import AmiriBold from '../assets/fonts/amiri/Amiri-Bold.ttf';
import Logo from '../assets/logo.png';
import LogoMinistere from '../assets/logo_ministere.png';
import { Typography, Select, MenuItem } from '@mui/material';
import { PDG_NAME } from '../config/config';

// Enregistrez les polices pour les utiliser dans le PDF
Font.register({
  family: 'Amiri',
  fonts: [
    { src: AmiriRegular, fontWeight: 'normal' },
    { src: AmiriBold, fontWeight: 'bold' },
  ],
});

// Définir les styles
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Amiri',
    direction: 'rtl', // Appliquer RTL pour l'arabe
  },
  pageContainer:{
    margin:2,
    border : '1px solid dark',
    padding:2,
    borderRadius:5,
    height:'99%'

  },
  header: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 20,
    color: 'blue',
    textAlign: 'center',
    margin: '20px 0',
  },
  logoContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
   
  },
  logo: {
    width: 100,
    height: 100,
  },
  logo2: {
    width: '200px',
    height: '70px',
    marginTop:15
  },
  title: {
    fontSize: 28,
    textAlign: 'center',
    marginBottom: 20,
   
  },
  section: {
    marginBottom: 10,
    padding: 10,
    fontSize: 14,
    textAlign: 'right',
  },
  section_bold: {
    marginBottom: 10,
    padding: 10,
    fontSize: 16,
    textAlign: 'right',
    
  },
  section_title: {
    marginBottom: 10,
    padding: 10,
    fontSize: 18,
    textAlign: 'right',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 30,
    color: 'blue',
  },
});

// Composant principal
const App = () => {

  
 

  const data = {
    logement: {
      num: '6.A.5.1',
      batiment: 'A',
      residence: 'نيابوليس',
      ville: 'المرازقة',
      governorat: 'نابل',
      lotissement: 'HC31',
    },
    client: {
      nomAr: 'النفطي',
      sex:'FEMME',
      prenomAr: 'سعاد',
      nomArParent: 'محمد بن يونس',
      nationalité: 'TUN',
      cin: '03771008',
      adresse: 'نهج لحصايرية نابل',
    }
  };

  const gender = data.client.sex;
  const adjustedText = {
    subject: gender === 'FEMME' ? 'السيدة' : 'السيد',
    nameAffix: gender === 'FEMME' ? 'بنت' : 'بن',
    received: gender === 'FEMME' ? 'تسلمت' : 'تسلم',
    signed: gender === 'FEMME' ? 'إمضاءها' : 'إمضاءه',
    chosenAddress: gender === 'FEMME' ? 'اختارت   محلا لمخابرتها' : 'اختار   محلا لمخابرته',
    tunisian: gender === 'FEMME' ? 'تونسية' : 'تونسي',
    idOwner: gender === 'FEMME' ? 'صاحبة' : 'صاحب',
    witness: gender === 'FEMME' ? 'تشهد' : 'يشهد',
    who: gender === 'FEMME' ? 'والتي' : 'والذي',
    accepted: gender === 'FEMME' ? 'وقبولها' : 'وقبوله',
    locataire:gender === 'FEMME' ? 'المتسوغة' : 'المتسوغ',
    adresse:gender === 'FEMME' ? 'بعنوانها' : 'بعنوانه',
  };



  return (
    <div style={{ padding: '20px' }}>
      <h1>Document de l'enregistrement</h1>

      {/* Affichage du PDF */}
      <PDFViewer style={{ width: '100%', height: '800px' }}>
        <Document>
          <Page size="A4" style={styles.page}>
            <View style={styles.pageContainer}>
            {/* Logo */}
            <View style={styles.logoContainer}>
            <Image style={styles.logo} src={Logo} />
              <Image style={styles.logo2} src={LogoMinistere} />
              
            </View>

            {/* Titre */}
            <View style={styles.header}>
            <Text style={styles.title}>
                {data.logement.batiment} بالعمارة {data.logement.num} محضر تحويز و تسليم مفاتيح الشقة عدد
                {'\n'}
                {data.logement.lotissement}بإقامة '{data.logement.residence}'  بمنطقة {data.logement.ville}  ب{data.logement.governorat} مقسم

              </Text>
            </View>

            {/* Sections de texte */}
            <View style={styles.section_title}>
              <Text>المرجع: عقد كراء مملك بين الشركة الوطنية العقارية للبلاد التونسية و{adjustedText.subject} {data.client.prenomAr} {adjustedText.nameAffix} {data.client.nomArParent} {data.client.nomAr}</Text>
            </View>

            <View style={styles.section}>
            <Text>
                {adjustedText.witness} {adjustedText.subject} {data.client.prenomAr} {adjustedText.nameAffix} {data.client.nomArParent} {data.client.nomAr}، {adjustedText.tunisian} الجنسية، {adjustedText.idOwner} بطاقة التعريف الوطنية عدد {data.client.cin}، {adjustedText.who} {adjustedText.chosenAddress} {adjustedText.adresse} {data.client.adresse} بأنها {adjustedText.received} من الشركة الوطنية العقارية للبلاد التونسية التي يمثلها في هذا العقد رئيسها مديرها العام {PDG_NAME}
                  {'\n'}
                  <Text style={styles.section_bold}>
                
                {' '+data.logement.lotissement}بإقامة '{data.logement.residence}'  بمنطقة {data.logement.ville}  ب{data.logement.governorat} مقسم
                {' '+data.logement.batiment} بالعمارة {data.logement.num} {adjustedText.received} جميع مفاتيح الشقة 
                </Text>
               

              </Text>
            </View>
            <View style={styles.section}>
              <Text>
                 ويعتبر {adjustedText.signed} أسفل هذا إقرارا بما يفيد تسلم المسكن بجميع مفاتيحه كما تعرف بالرؤية والتقليب المكرى {adjustedText.accepted}على الحالة التي هو عليها حدا و موقعا ومساحة بالثمن المذكور بعقد الكراء المملك دون احتراز أو تحفظ .ا 
              </Text>
            </View>

            {/* Signature */}
            <View style={styles.footer}>
              <Text>{adjustedText.locataire}</Text>
              <Text>الشركة الوطنية العقارية للبلاد التونسية</Text>
            </View>
            </View>
          </Page>
        </Document>
      </PDFViewer>
    </div>
  );
};

export default App;

