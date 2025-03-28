import { PDFViewer, Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';
import AmiriRegular from '../assets/fonts/amiri/Amiri-Regular.ttf';
import AmiriBold from '../assets/fonts/amiri/Amiri-Bold.ttf';


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
        fontSize: 14,
        fontFamily: 'Amiri',
        
        textAlign: 'right',
    },
    section: {
        marginBottom: 10,
    },
    title: {
        fontSize: 18,
        marginBottom: 20,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        marginBottom: 10,
    },
    text: {
        marginBottom: 5,
    },
});

const MyDocument = () => {

    const contratData= {
        "id": 1102,
        "ilotLog": "\r\n HC6 المقسم\r\nILOT HC6",
        "blocLog": "Bloc 6.A",
        "niveauLog": "الطابق الأرضي \r\nR-D-C\r\n",
        "numeroLog": "6.A.0.1",
        "typeLog": "S+1",
        "superficieLog": 62.642999999999994,
        "numClient": 442,
        "nomPrenomArClient": "فائزة بنت محمد المالكي الكرتلي ",
        "cinClient": "02735960",
        "revenuFamilialClient": 150,
        "categorieClient": "1",
        "dateNClient": "10/01/1968",
        "nomPrenonConjoint": "",
        "cinConjoint": "",
        "delegation": "الكبارية",
        "ta": {
          "id": 4,
          "clients": [],
          "simulTableauAmortissements": [
            {
              "id": 151,
              "numero": 1,
              "dateDebut": "2024-09-01",
              "dateFin": "2024-12-31",
              "crd": 30000,
              "interet": 0,
              "amortissement": 400,
              "annuite": 400,
              "mensualite": 100,
              "isDeleted": null
            },
            {
              "id": 152,
              "numero": 2,
              "dateDebut": "2025-01-01",
              "dateFin": "2025-12-31",
              "crd": 29600,
              "interet": 0,
              "amortissement": 1200,
              "annuite": 1200,
              "mensualite": 100,
              "isDeleted": null
            },
            {
              "id": 153,
              "numero": 3,
              "dateDebut": "2026-01-01",
              "dateFin": "2026-12-31",
              "crd": 28400,
              "interet": 0,
              "amortissement": 1200,
              "annuite": 1200,
              "mensualite": 100,
              "isDeleted": null
            },
            {
              "id": 154,
              "numero": 4,
              "dateDebut": "2027-01-01",
              "dateFin": "2027-12-31",
              "crd": 27200,
              "interet": 0,
              "amortissement": 1200,
              "annuite": 1200,
              "mensualite": 100,
              "isDeleted": null
            },
            {
              "id": 155,
              "numero": 5,
              "dateDebut": "2028-01-01",
              "dateFin": "2028-12-31",
              "crd": 26000,
              "interet": 0,
              "amortissement": 1200,
              "annuite": 1200,
              "mensualite": 100,
              "isDeleted": null
            },
            {
              "id": 156,
              "numero": 6,
              "dateDebut": "2029-01-01",
              "dateFin": "2029-08-31",
              "crd": 24800,
              "interet": 0,
              "amortissement": 800,
              "annuite": 800,
              "mensualite": 100,
              "isDeleted": null
            },
            {
              "id": 157,
              "numero": 7,
              "dateDebut": "2029-09-01",
              "dateFin": "2029-12-31",
              "crd": 24000,
              "interet": 40,
              "amortissement": 400,
              "annuite": 440,
              "mensualite": 110,
              "isDeleted": null
            },
            {
              "id": 158,
              "numero": 8,
              "dateDebut": "2030-01-01",
              "dateFin": "2030-12-31",
              "crd": 23600,
              "interet": 120,
              "amortissement": 1200,
              "annuite": 1320,
              "mensualite": 110,
              "isDeleted": null
            },
            {
              "id": 159,
              "numero": 9,
              "dateDebut": "2031-01-01",
              "dateFin": "2031-12-31",
              "crd": 22400,
              "interet": 120,
              "amortissement": 1200,
              "annuite": 1320,
              "mensualite": 110,
              "isDeleted": null
            },
            {
              "id": 160,
              "numero": 10,
              "dateDebut": "2032-01-01",
              "dateFin": "2032-12-31",
              "crd": 21200,
              "interet": 120,
              "amortissement": 1200,
              "annuite": 1320,
              "mensualite": 110,
              "isDeleted": null
            },
            {
              "id": 161,
              "numero": 11,
              "dateDebut": "2033-01-01",
              "dateFin": "2033-12-31",
              "crd": 20000,
              "interet": 120,
              "amortissement": 1200,
              "annuite": 1320,
              "mensualite": 110,
              "isDeleted": null
            },
            {
              "id": 162,
              "numero": 12,
              "dateDebut": "2034-01-01",
              "dateFin": "2034-08-31",
              "crd": 18800,
              "interet": 80,
              "amortissement": 800,
              "annuite": 880,
              "mensualite": 110,
              "isDeleted": null
            },
            {
              "id": 163,
              "numero": 13,
              "dateDebut": "2034-09-01",
              "dateFin": "2034-12-31",
              "crd": 18000,
              "interet": 84,
              "amortissement": 400,
              "annuite": 484,
              "mensualite": 121,
              "isDeleted": null
            },
            {
              "id": 164,
              "numero": 14,
              "dateDebut": "2035-01-01",
              "dateFin": "2035-12-31",
              "crd": 17600,
              "interet": 252,
              "amortissement": 1200,
              "annuite": 1452,
              "mensualite": 121,
              "isDeleted": null
            },
            {
              "id": 165,
              "numero": 15,
              "dateDebut": "2036-01-01",
              "dateFin": "2036-12-31",
              "crd": 16400,
              "interet": 252,
              "amortissement": 1200,
              "annuite": 1452,
              "mensualite": 121,
              "isDeleted": null
            },
            {
              "id": 166,
              "numero": 16,
              "dateDebut": "2037-01-01",
              "dateFin": "2037-12-31",
              "crd": 15200,
              "interet": 252,
              "amortissement": 1200,
              "annuite": 1452,
              "mensualite": 121,
              "isDeleted": null
            },
            {
              "id": 167,
              "numero": 17,
              "dateDebut": "2038-01-01",
              "dateFin": "2038-12-31",
              "crd": 14000,
              "interet": 252,
              "amortissement": 1200,
              "annuite": 1452,
              "mensualite": 121,
              "isDeleted": null
            },
            {
              "id": 168,
              "numero": 18,
              "dateDebut": "2039-01-01",
              "dateFin": "2039-08-31",
              "crd": 12800,
              "interet": 168,
              "amortissement": 800,
              "annuite": 968,
              "mensualite": 121,
              "isDeleted": null
            },
            {
              "id": 169,
              "numero": 19,
              "dateDebut": "2039-09-01",
              "dateFin": "2039-12-31",
              "crd": 12000,
              "interet": 132.4,
              "amortissement": 400,
              "annuite": 532.4,
              "mensualite": 133.1,
              "isDeleted": null
            },
            {
              "id": 170,
              "numero": 20,
              "dateDebut": "2040-01-01",
              "dateFin": "2040-12-31",
              "crd": 11600,
              "interet": 397.2,
              "amortissement": 1200,
              "annuite": 1597.2,
              "mensualite": 133.1,
              "isDeleted": null
            },
            {
              "id": 171,
              "numero": 21,
              "dateDebut": "2041-01-01",
              "dateFin": "2041-12-31",
              "crd": 10400,
              "interet": 397.2,
              "amortissement": 1200,
              "annuite": 1597.2,
              "mensualite": 133.1,
              "isDeleted": null
            },
            {
              "id": 172,
              "numero": 22,
              "dateDebut": "2042-01-01",
              "dateFin": "2042-12-31",
              "crd": 9200,
              "interet": 397.2,
              "amortissement": 1200,
              "annuite": 1597.2,
              "mensualite": 133.1,
              "isDeleted": null
            },
            {
              "id": 173,
              "numero": 23,
              "dateDebut": "2043-01-01",
              "dateFin": "2043-12-31",
              "crd": 8000,
              "interet": 397.2,
              "amortissement": 1200,
              "annuite": 1597.2,
              "mensualite": 133.1,
              "isDeleted": null
            },
            {
              "id": 174,
              "numero": 24,
              "dateDebut": "2044-01-01",
              "dateFin": "2044-08-31",
              "crd": 6800,
              "interet": 264.8,
              "amortissement": 800,
              "annuite": 1064.8,
              "mensualite": 133.1,
              "isDeleted": null
            },
            {
              "id": 175,
              "numero": 25,
              "dateDebut": "2044-09-01",
              "dateFin": "2044-12-31",
              "crd": 6000,
              "interet": 185.64,
              "amortissement": 400,
              "annuite": 585.64,
              "mensualite": 146.41,
              "isDeleted": null
            },
            {
              "id": 176,
              "numero": 26,
              "dateDebut": "2045-01-01",
              "dateFin": "2045-12-31",
              "crd": 5600,
              "interet": 556.92,
              "amortissement": 1200,
              "annuite": 1756.92,
              "mensualite": 146.41,
              "isDeleted": null
            },
            {
              "id": 177,
              "numero": 27,
              "dateDebut": "2046-01-01",
              "dateFin": "2046-12-31",
              "crd": 4400,
              "interet": 556.92,
              "amortissement": 1200,
              "annuite": 1756.92,
              "mensualite": 146.41,
              "isDeleted": null
            },
            {
              "id": 178,
              "numero": 28,
              "dateDebut": "2047-01-01",
              "dateFin": "2047-12-31",
              "crd": 3200,
              "interet": 556.92,
              "amortissement": 1200,
              "annuite": 1756.92,
              "mensualite": 146.41,
              "isDeleted": null
            },
            {
              "id": 179,
              "numero": 29,
              "dateDebut": "2048-01-01",
              "dateFin": "2048-12-31",
              "crd": 2000,
              "interet": 556.92,
              "amortissement": 1200,
              "annuite": 1756.92,
              "mensualite": 146.41,
              "isDeleted": null
            },
            {
              "id": 180,
              "numero": 30,
              "dateDebut": "2049-01-01",
              "dateFin": "2049-08-31",
              "crd": 800,
              "interet": 371.28,
              "amortissement": 800,
              "annuite": 1171.28,
              "mensualite": 146.41,
              "isDeleted": null
            }
          ],
          "versements": [],
          "periodes": [],
          "resume": {
            "id": 6,
            "sommeAmortissements": 30000,
            "sommeInterets": 52559.286,
            "sommeAnnuite": 82559.282,
            "isDeleted": null
          },
          "logement": null,
          "durreeTotale": 300,
          "montantAvance": 0,
          "montantTotal": 30000,
          "montantRestant": null,
          "tauxInteret": 10,
          "status": "ENCOURS",
          "type": "PERIODE_FIX_5ANS",
          "dateDebut": "2024-09-01T00:00:00.000+00:00",
          "dateFin": null,
          "isDeleted": null
        }
      }

    const data = {
        "companyName": "الشركة الوطنية العقارية للبلاد التونسية",
        "lawNumber": "19",
        "lawYear": "1957",
        "lawDate": "10 سبتمبر 1957",
        "amendmentNumber": "9",
        "amendmentYear": "1989",
        "amendmentDate": "01 فيفري 1989",
        "registrationNumber": "C19851997",
        "taxNumber": "RBM000/2806",
        "ministerDecisionDate": "19 مارس 2014",
        "companyAddress": "حي المنار الثاني بتونس 2092",
        "directorName": "فهمي كمون",
        "boardDecisionDate": "24 ديسمبر 2021",
        "sessionNumber": "04/2021",
        "financialOffice": "المنزه التاسع تونس",
        "registrationDate": "30 ديسمبر 2021",
        "receiptNumber": "M086441",
        "recordNumber": "21804563",
        "tenantName": ".....................",
        "tenantID": "07987664",
        "tenantIDIssueDate": "..../.../.....",
        "tenantBirthPlace": "............",
        "tenantBirthDate": "..../..../....",
        "tenantAddress": ".....................",
        "spouseName": "...............................",
        "spouseID": "...............",
        "spouseIDIssueDate": ".../.../.......",
        "lawNumber2": "1",
        "lawYear2": "2012",
        "lawDate2": "16/5/2012",
        "lawYear3": "2012",
        "decreeNumber": "21",
        "decreeYear": "2021",
        "decreeDate": "28 ديسمبر 2021",
        "lawYear4": "2022",
        "articleStart": "27",
        "articleEnd": "31"
    }

    const gender = 'FEMME';
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

  const hommeHusband = !contratData.cinConjoint ? 
  ` والمتزوج ب السيدة ${data.spouseName} حسب نظام الاشتراك في الأملاك، صاحبة بطاقة التعريف الوطنية عدد ${data.spouseID} الصادرة بتونس في ${data.spouseIDIssueDate}،` : ' ';

const femmeHusband = contratData.cinConjoint ? 
  ` والمتزوجة ب السيد ${data.spouseName} حسب نظام الاشتراك في الأملاك، صاحب بطاقة التعريف الوطنية عدد ${data.spouseID} الصادرة بتونس في ${data.spouseIDIssueDate}،` : ' ';

const hommeText = ` والسيد ${contratData.nomPrenomArClient }، تونسي الجنسية و صاحب بطاقة التعريف الوطنية عدد ${contratData.cinClient } الصادرة بتونس في ${data.tenantIDIssueDate } والمولود في ${data.tenantBirthPlace } بتاريخ ${contratData.dateNClient }، والقاطن بنهج ${data.tenantAddress }،${hommeHusband} والذي اختار  محل  مخابرته بالمسكن موضوع هذا العقد والمشار إليه فيما يلي بعبارة "المتسوغ".`;

const femmeText = ` والسيدة ${contratData.nomPrenomArClient }، تونسية الجنسية و صاحبة بطاقة التعريف الوطنية عدد ${contratData.cinClient } الصادرة بتونس في ${data.tenantIDIssueDate } والمولودة في ${data.tenantBirthPlace } بتاريخ ${contratData.dateNClient }، والقاطنة بنهج ${data.tenantAddress }،${femmeHusband} والتي اختارت   محل  مخابرتها بالمسكن موضوع هذا العقد والمشار إليه فيما يلي بعبارة "المتسوغة".`;





    return (
        <PDFViewer style={{ width: '100%', height: '800px' }}>
            <Document>
                <Page style={styles.page}>
                    <View style={styles.section}>
                        <Text style={styles.title}>عقد كراء مملك</Text>
                        <Text style={styles.subtitle}>:بيــن الممضيين أسفــــــــله</Text>
                        <Text style={styles.text}>
                        الشركة الوطنية العقارية للبلاد التونسية ، منشأة عمومية محدثة بمقتضى القانون عدد 19 لسنة 1957 المؤرخ في 10 سبتمبر 1957 و المنقح بالقانون عدد 9 لسنة 1989 و المؤرخ في 01 فيفري 1989 ومسجلة بالسجل الوطني للمؤسسات C19851997 الترقيم الجبائي RBM000/2806 ومرخص لها في مباشرة نشاط البعث العقاري بموجب القرار الصادر عن السيد وزير التجهيز والإسكان بتاريخ 19 مارس 2014 والكائن مقرها الاجتماعي بحي المنار الثاني بتونس 2092 ويمثلها في هذا العقد رئيسها مديرها العام السيد فهمي كمون بمقتضى التفويض الصادر له عن مجلس إدارة الشركة بتاريخ 24 ديسمبر 2021 ، طبقا لمحضر الجلسة عدد 04/2021 والمسجل بالقباضة المالية بالمنزه التاسع تونس بتاريخ 30 ديسمبر 2021 تحت وصل عدد M086441 تسجيل عدد 21804563 .                         </Text>
                        <Text style={styles.text}>من جـــهة (بصفتها المسوغة)،</Text>
                        <Text style={styles.text}>
                          {hommeText}
                        </Text>
                        <Text style={styles.text}>من جـــهة أخرى(بصفته المتسوغ)،</Text>
                        <Text style={styles.title}>توطئـــــة</Text>
                        <Text style={styles.text}>
                            بعـــد الاطلاع على القانون عدد {data.lawNumber2} لسنة {data.lawYear2} المؤرخ في {data.lawDate2} المتعلق بقانون المالية التكميلي لسنة {data.lawYear3} كما تم تنقيحه بالمرسوم عدد {data.decreeNumber} لسنة {data.decreeYear} المؤرخ في {data.decreeDate} المتعلق بقانون المالية لسنة {data.lawYear4} والمتضمن في فصوله من {data.articleStart} إلى {data.articleEnd} إحداث برنامج خصوصي للسكن الاجتماعي لفائدة الفئات الاجتماعية محدودة الدخل.
                        </Text>
                        <Text style={styles.subtitle}>الفصل الأول: موضوع العقد.</Text>
                        <Text style={styles.text}>
                            سوّغت على وجه الكراء المملك الشركة الوطنية العقارية للبلاد التونسية ، بصفتها المسوغة، تحت جميع الضمانات القانونية والفعلية السيد {contratData.nomPrenomArClient} بصفته المتسوغ، الشقة عدد ...... من العمارة ...... بالطابق ..... بإقامة " .............." بمنطقة المرازقة بنابل مقسم HC31 " صنف اجتماعي " تتكون من عدد 02 غرف وقاعة استقبال ومطبخ وبيت استحمام تبلغ مساحتها الجملية 75م2 تقريبا باعتبار الأجزاء المشتركة التي ستستخرج تبعا لمثال التقسيم النهائي من الرسم العقاري عدد 38013/110265 تونس.
                        </Text>
                        <Text style={styles.subtitle}>الفصل الثاني: انجرار الملكية.</Text>
                        <Text style={styles.text}>
                            انجرت ملكية العقار موضوع الرسم العقاري عدد 38013/110265 تونس لفائدة الشركة الوطنية العقارية للبلاد التونسية بموجب عقد البيع المبرم بينها وبين السيد وزير أملاك الدولة والشؤون العقارية القائم في حق ملك الدولة الخاص والمسجل بالقباضة المالية بسيدي حسين السيجومي تونس بتاريخ 06 ماي 2013 تحت وصل عدد M020272، تسجيل عدد 13101355.
                        </Text>
                        <Text style={styles.subtitle}>الفصل الثالث: ثمن التفويت.</Text>
                        <Text style={styles.text}>
                            تم تحديد ثمن التفويت بمبلغ جملي ونهائي قدره : ثمانية وعشرون ألفا وسبعة وأربعون دينارا و828 مليما (28.047,828 د) يضاف إليه نسبة %10 كل خمس سنوات تطبيقا للفصل 2 من قرار وزير التجهيز والإسكان والتهيئة الترابية ووزير المالية المؤرخ في 31 مارس 2016 وذلك طبقا لجدول احتساب الأقساط المصاحب لهذا العقد الذي قبله المتسوغ والذي يعتبر جزءا لا يتجزأ من هذا العقد.
                        </Text>
                        <Text style={styles.subtitle}>الفصل الرابع: طريقة خلاص ثمن التفويت.</Text>
                        <Text style={styles.text}>
                            يتم خلاص الثمن الجملي للشقة موضوع هذا العقد عن طريق الكراء المملك وذلك على أساس معينات كراء تدفع من قبل المتسوغ بالحساب البريدي الجاري للشركة الوطنية العقارية للبلاد التونسية عدد 17000000000001398003 وذلك بداية كل شهر وطيلة مدة خمسة وعشرون سنة (25 سنة) طبقا للفصل 2 من قرار وزير التجهيز والإسكان والتهيئة الترابية ووزير المالية مؤرخ في 31 مارس 2016 بداية من تاريخ التسليم وذلك طبقا لجدول احتساب الخلاص المقابل لهذا العقد ومقابل وصولات خلاص تسلم شهريا في الغرض من قبل الشركة الوطنية العقارية للبلاد التونسية.
                        </Text>
                        <Text style={styles.text}>
                            حرصا على ضمان استرجاع الدين المتخلّد بذمته لفائدة الدولة، يمضي المتسوغ كمبيالة في مبلغ الثمن الجملي للشقة موضوع هذا العقد.
                        </Text>
                        <Text style={styles.text}>
                            وفي حالة وفاة المتسوغ، ينتقل حق الانتفاع بهذا العقد وكل الالتزامات المضمّنة به لقرينه ما لم يتزوج من جديد، ولأبنائه بموجب عقد جديد.
                        </Text>
                        <Text style={styles.text}>
                            وينتقل حق الانتفاع بهذا العقد إلى أبناء المتسوغ، في صورة وفاة القرين أو حرمانه من هذا الحق، بموجب عقد جديد.
                        </Text>
                        <Text style={styles.text}>
                            وفي حالة وفاة المتسوغ ووجود أبناء قصّر، يتم البتّ في الوضعية وفقا للإجراءات القانونية المعمول بها من قبل اللجنة الجهوية لمتابعة برنامج السكن الاجتماعي بولاية تونس وبعد البت فيها يتم إبرام عقد جديد طبقا للقرار المتخذ في شأنها.
                        </Text>
                        <Text style={styles.subtitle}>الفصل الخامس: تحويز المكرى.</Text>
                        <Text style={styles.text}>
                            لا يحوّز المتسوغ بالمكرى إلا بعد إرجاع النظائر الأصلية الأربع من عقد الكراء المملك إلى المسوغ ممضاة مع التعريف بالإمضاء عليها ومسجلة بالقباضة المالية، ويتم تسليم مفاتيح الشقة وجوبا على عين المكان وبعد تحرير محضر تحويز يقع إمضاؤه من الطرفين.
                        </Text>
                        <Text style={styles.text}>
                            يعترف المتسوغ بالرؤية والتقليب للمكرى وقبوله على الحالة التي هو عليها حدّا وموقعا ومساحة بالثمن المذكور دون احتراز أو تحفظ.
                        </Text>
                        <Text style={styles.text}>
                            يجب على المتسوغ أن يعلم المسوغ بالعيوب الظاهرة للبناء وذلك في أجل ثلاثة أشهر بداية من تاريخ التحويز.
                        </Text>
                        <Text style={styles.subtitle}>الفصل السادس: نقل الملكية.</Text>
                        <Text style={styles.text}>
                            يصبح المتسوغ مالكا للشقة بعد خلاص جميع معينات الكراء الشهرية طيلة خمسة وعشرون سنة (25 سنة) طبقا للفصل 2 من قرار وزير التجهيز والإسكان والتهيئة الترابية ووزير المالية مؤرخ في 31 مارس 2016. كما يمكن له أن يصبح مالكا للشقة المذكورة بعد خلاص جميع معينات الكراء الشهرية قبل انتهاء مدّة التقسيط المذكورة أعلاه أو بمجرد خلاص كامل الأقساط المتخلدة بذمته لفائدة الدولة.
                        </Text>
                        <Text style={styles.subtitle}>الفصل السابع: الالتزامات المحمولة على المتسوغ.</Text>
                        <Text style={styles.text}>
                            يلتزم المتسوغ باستعمال المكرى للسكنى فقط ولا يمكن له تغييره إلى أي وجهة أخرى إلا بعد الحصول على إذن كتابي من المسوغ.
                        </Text>
                        <Text style={styles.text}>
                            يلتزم المتسوغ بالمحافظة على المكرى وصيانته وإصلاح ما قد يلحقه من أضرار ناتجة عن سوء الاستعمال.
                        </Text>
                        <Text style={styles.text}>
                            يلتزم المتسوغ بعدم إدخال أي تغييرات أو إضافات على المكرى إلا بعد الحصول على إذن كتابي من المسوغ.
                        </Text>
                        <Text style={styles.text}>
                            يلتزم المتسوغ بدفع جميع المعاليم والضرائب والأداءات المتعلقة بالمكرى.
                        </Text>
                        <Text style={styles.text}>
                            يلتزم المتسوغ بإرجاع المكرى إلى المسوغ عند انتهاء مدة العقد أو عند فسخه لأي سبب كان.
                        </Text>
                        <Text style={styles.subtitle}>الفصل الثامن: فسخ العقد.</Text>
                        <Text style={styles.text}>
                            يمكن للمسوغ فسخ هذا العقد في حالة عدم التزام المتسوغ بأحد الشروط المضمنة به، وذلك بعد توجيه تنبيه كتابي له وإعطائه مهلة شهر لتسوية وضعيته.
                        </Text>
                        <Text style={styles.text}>
                            في حالة فسخ العقد، يلتزم المتسوغ بإرجاع المكرى إلى المسوغ في الحالة التي كان عليها عند التحويز، مع دفع جميع المبالغ المتخلدة بذمته لفائدة المسوغ.
                        </Text>
                        <Text style={styles.subtitle}>الفصل التاسع: أحكام عامة.</Text>
                        <Text style={styles.text}>
                            يعتبر هذا العقد لاغيا في حالة عدم تسجيله بالقباضة المالية المختصة في أجل شهر من تاريخ إمضائه.
                        </Text>
                        <Text style={styles.text}>
                            كل تعديل أو تنقيح لهذا العقد يجب أن يكون كتابيا وممضى من الطرفين.
                        </Text>
                        <Text style={styles.text}>
                            في حالة نشوب أي نزاع بين الطرفين حول تنفيذ أو تفسير هذا العقد، يتم اللجوء إلى التحكيم وفقا للقوانين المعمول بها في الجمهورية التونسية.
                        </Text>
                        <Text style={styles.text}>
                            حرر هذا العقد في أربعة نظائر أصلية، تسلم كل طرف نظيرا منها، وتم تسجيله بالقباضة المالية المختصة.
                        </Text>
                    </View>
                </Page>
            </Document>
        </PDFViewer>
    )
};

export default MyDocument;

