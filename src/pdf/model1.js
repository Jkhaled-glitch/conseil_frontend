import React, { useState } from 'react';
import { PDFViewer, Document, Page, Text, View, StyleSheet, Font, Image } from '@react-pdf/renderer';
import Logo from '../assets/logo.png';
import AmiriRegular from '../assets/fonts/amiri/Amiri-Regular.ttf';
import AmiriBold from '../assets/fonts/amiri/Amiri-Bold.ttf';
import { model1ContartLanguage } from '../config/config';

// Enregistrez les polices pour les utiliser dans le PDF
Font.register({
  family: 'Amiri',
  fonts: [
    { src: AmiriRegular, fontWeight: 'normal' },
    { src: AmiriBold, fontWeight: 'bold' },
  ],
});

// Définir les styles
const getStyles = (language) => StyleSheet.create({
  page: {
    padding: 10,
    fontFamily: 'Amiri',
    direction: language === 'ar' ? 'rtl' : 'ltr', // Appliquer RTL pour l'arabe
  },
  header: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 20,
  },
  logoContainer: {
    flexDirection: 'row',
    justifyContent: language === 'ar' ? 'flex-end' : 'flex-start',
    width: '100%',
  },
  logo: {
    width: 100,
    height: 100,
  },
  title: {
    fontSize: 24,
    textAlign: language === 'ar' ? 'right' : 'center',
    marginBottom: 20,
  },
  section: {
    marginBottom: 10,
    padding: 10,
    fontSize: 12,
    textAlign: language === 'ar' ? 'right' : 'left',
  },
  table: {
    display: 'table',
    width: 'auto',
    marginTop: 20,
    borderStyle: 'solid',
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableHeader: {
    backgroundColor: '#f0f0f0', // Couleur de fond pour l'en-tête
    borderStyle: 'solid',
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableHeaderCell: {
    margin: 'auto',
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'left',
    padding: 5,
  },
  tableCol: {
    width: '33.33%', // Ajuster la largeur pour 3 colonnes
    borderStyle: 'solid',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCell: {
    margin: 'auto',
    fontSize: 10,
    textAlign: 'left',
    padding: 5,
    backgroundColor: '#fff', // Couleur de fond par défaut des cellules
  },
  tableCellEven: {
    backgroundColor: '#f9f9f9', // Couleur de fond pour les cellules paires
  },
});

// Composant principal
const App = () => {
  const [language, setLanguage] = useState('ar'); // Langue par défaut

  const textsForLanguage = model1ContartLanguage[language] || model1ContartLanguage['fr'];

  // Obtenir les styles pour la langue sélectionnée
  const styles = getStyles(language);

  const tableRows = [
    ["1", "06-06-2024", "31-12-2024", "100000", "2%", "3000", "509"],
    ["2", "01-01-2025", "31-12-2025", "97000", "2%", "6000", "509"],
  ];

  const tableSumil = ["100000","22250","122250"];

  // Inverser les colonnes pour la langue arabe
  const reversedTableRows = language === 'ar'
    ? tableRows.map(row => row.slice().reverse())
    : tableRows;

  const reversedTableSimul = language === 'ar'
    ? tableSumil.slice().reverse() // Inverser les valeurs de simulation
    : tableSumil;

  const reversedTableHeadersSimul = language === 'ar'
    ? textsForLanguage.simulHeaders.slice().reverse()
    : textsForLanguage.simulHeaders;

  const reversedTableHeaders = language === 'ar'
    ? textsForLanguage.tableHeaders.slice().reverse()
    : textsForLanguage.tableHeaders;

  return (
    <div style={{ padding: '20px' }}>
      <h1>Document du Contrat</h1>
      
      {/* Sélecteur de langue */}
      <div style={{ marginBottom: '20px' }}>
        <select
          id="language-select"
          onChange={(e) => setLanguage(e.target.value)}
          value={language}
          style={{ padding: '5px', fontSize: '16px' }}
        >
          <option value="fr">Français</option>
          <option value="ar">العربية</option>
        </select>
      </div>

      {/* Affichage du PDF */}
      <PDFViewer style={{ width: '100%', height: '800px' }}>
        <Document>
          <Page size="A4" style={styles.page}>
            {/* Logo */}
            <View style={styles.logoContainer}>
              <Image style={styles.logo} src={Logo} />
            </View>

            {/* Titre */}
            <View style={styles.header}>
              <Text style={styles.title}>{textsForLanguage.title}</Text>
            </View>

            {/* Sections */}
            <View style={styles.section}>
              <Text>{textsForLanguage.contractCode}</Text>
            </View>
            <View style={styles.section}>
              <Text>{textsForLanguage.housingSection}</Text>
              <Text>{textsForLanguage.contentSection1}</Text>
            </View>
            <View style={styles.section}>
              <Text>{textsForLanguage.clientsSection}</Text>
              <Text>{textsForLanguage.contentSection2}</Text>
            </View>
            <View style={styles.section}>
              <Text>{textsForLanguage.otherInfoSection}</Text>
              <Text>{textsForLanguage.contentSection3}</Text>
            </View>

            {/* Tableau principal */}
            <View style={styles.table}>
              <View style={[styles.tableRow, styles.tableHeader]}>
                {reversedTableHeaders.map((header, index) => (
                  <View key={index} style={styles.tableCol}>
                    <Text style={styles.tableHeaderCell}>{header}</Text>
                  </View>
                ))}
              </View>
              {reversedTableRows.map((row, rowIndex) => (
                <View key={rowIndex} style={styles.tableRow}>
                  {row.map((cell, cellIndex) => (
                    <View
                      key={cellIndex}
                      style={[styles.tableCol, (rowIndex % 2 === 1) && styles.tableCellEven]}
                    >
                      <Text style={styles.tableCell}>{cell}</Text>
                    </View>
                  ))}
                </View>
              ))}
            </View>

            {/* Tableau de simulation */}
            <View style={styles.table}>
              <View style={[styles.tableRow, styles.tableHeader]}>
                {reversedTableHeadersSimul.map((header, index) => (
                  <View key={index} style={styles.tableCol}>
                    <Text style={styles.tableHeaderCell}>{header}</Text>
                  </View>
                ))}
              </View>
              <View style={styles.tableRow}>
                {reversedTableSimul.map((cell, cellIndex) => (
                  <View
                    key={cellIndex}
                    style={[styles.tableCol, (cellIndex % 2 === 1) && styles.tableCellEven]}
                  >
                    <Text style={styles.tableCell}>{cell}</Text>
                  </View>
                ))}
              </View>
            </View>
          </Page>
        </Document>
      </PDFViewer>
    </div>
  );
};

export default App;
