import React from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import './style.css';


import { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Container, CssBaseline, Typography, Button, TableContainer, Table, TableHead, TableRow, td, TableBody, Paper, CircularProgress, Grid, Card, CardContent } from '@mui/material';
import axios from 'axios';
import { toast } from 'react-toastify';
//import { base_url, typeOptions } from '../../config/config';
//import { AuthContext } from '../../context/AuthContext';
import ResumeTable from '../components/amortissement/ResumeTable';
import { TheaterComedyTwoTone } from '@mui/icons-material';
//import { SimulTableauAmortissement, ResumeTableauAmortissement, Periode } from '../../config/types';
//import './style2.css';

const ContractDocument = () => {
    const downloadPdf = async () => {
        const pages = document.querySelectorAll('.contract-page');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();

        for (let i = 0; i < pages.length; i++) {
            const canvas = await html2canvas(pages[i], {
                scale: 2,
                useCORS: true,
            });

            const imgData = canvas.toDataURL('image/png');
            const imgProps = pdf.getImageProperties(imgData);
            const pageHeight = (imgProps.height * pdfWidth) / imgProps.width;

            if (i > 0) {
                pdf.addPage();
            }

            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pageHeight);
        }

        pdf.save('contract.pdf');
    };



    const data2 = {
        "id": 1469,
        "ilotLog": "\r\nالمقسم HC7\r\nILOT HC7",
        "blocLog": "Bloc7.A",
        "niveauLog": "الطابق الأرضي \r\nR-D-C\r\n",
        "numeroLog": "7.A.0.1",
        "typeLog": "S+2",
        "superficieLog": 95.71099999999998,
        "numClient": 77,
        "nomPrenomArClient": "نعمان بن عمار",
        "cinClient": "07779198",
        "revenuFamilialClient": 475,
        "categorieClient": "2",
        "dateNClient": "26195",
        "nomPrenonConjoint": "نعمان بن عمار",
        "cinConjoint": "07999999",
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
        //fixed

        //a faire ou refaire ou ajuster ou fixer
        numCompteSnit: '17000000000001398003',
        residence: 'نيابوليس',
        ville: 'المرازقة',
        governorat: 'نابل',
        dateCin: '25/01/2024',
        dateCinConjoint: '25/02/2024',
        lieuNaissance: 'الكبارية',
        mantant: '30.000.000',
        mantantEnLettre: 'ثلاثون ألف دينارا و صفر مليماً',


        //peut etre dynamique
        num_dessin_immobileir: "548340 ",
        durreeTotaleEnLettre: 'خمسة وعشرون سنة',
        dureePeriode: 'خمس سنوات',


        //a communiquer
        lotissement: 'HC31',





    };

    const isFEMME = data2.nomPrenomArClient.includes(' بنت ');
    const hasConjoint = data2.cinConjoint.length > 0;
    const adjustedText = {
        subject: isFEMME ? 'السيدة' : 'السيد',
        locataire: isFEMME ? 'المتسوغة' : 'المتسوغ',
        adresse: isFEMME ? 'بعنوانها' : 'بعنوانه',
    };

    const TextFemmeConjoint = () => {
        return (
            <>
                ، والمتزوجة بالسيد
                <span className='data'>{' ' + data2.nomPrenonConjoint + ' '}</span>
                حسب نظام
                <span className='colored'> الاشتراك في الأملاك،</span>
                صاحب بطاقة التعريف الوطنية عدد
                <span className='data'>{' ' + data2.cinConjoint + ' '}</span>
                الصادرة بتونس في
                <span className='data'>{' ' + data.dateCinConjoint + ' '}</span>
            </>
        )
    }

    const TextFemme1 = () => {
        return (
            <p>
                والسيدة
                <span className='data'>{' ' + data2.nomPrenomArClient + ' '}</span>
                ، تونسية الجنسية وصاحبة بطاقة التعريف الوطنية عدد
                <span className='data'>{' ' + data2.cinClient + ' '}</span>
                الصادرة بتونس في
                <span className='data'>{' ' + data.dateCin + ' '}</span>
                والمولودة في
                <span className='data'>{' ' + data.lieuNaissance + ' '}</span>
                بتاريخ
                <span className='data'>{' ' + data2.dateNClient + ' '}</span>
                ، والقاطنة بنهج
                <span className='data'>{' ' + data2.delegation + ' '}</span>
                {hasConjoint && <TextFemmeConjoint />}
                ، والتي اختارت محل مخابرتها بالمسكن موضوع هذا العقد والمشار إليه فيما يلي بعبارة "المتسوغة"،

                <span className='data'>
                    من جـــهة أخرى(بصفتها المتسوغة)
                    .
                </span>

            </p>
        )
    }

    const TextHommeConjoint = () => {
        return (
            <>
                ، والمتزوج بالسيدة
                <span className='data'>{' ' + data2.nomPrenonConjoint + ' '}</span>
                حسب نظام
                <span className='colored'> الاشتراك في الأملاك،</span>
                صاحبة بطاقة التعريف الوطنية عدد
                <span className='data'>{' ' + data2.cinConjoint + ' '}</span>
                الصادرة بتونس في
                <span className='data'>{' ' + data.dateCinConjoint + ' '}</span>

            </>
        )
    }

    const TextHomme1 = () => {
        return (
            <p>
                والسيد
                <span className='data'>{' ' + data2.nomPrenomArClient + ' '}</span>
                ، تونسي الجنسية وصاحب بطاقة التعريف الوطنية عدد
                <span className='data'>{' ' + data2.cinClient + ' '}</span>
                الصادرة بتونس في
                <span className='data'>{' ' + data.dateCin + ' '}</span>
                والمولود في
                <span className='data'>{' ' + data.lieuNaissance + ' '}</span>
                بتاريخ
                <span className='data'>{' ' + data2.dateNClient + ' '}</span>
                ، والقاطن بنهج
                <span className='data'>{' ' + data2.delegation + ' '}</span>
                {hasConjoint && <TextHommeConjoint />}
                ، والذي اختار محل مخابرته بالمسكن موضوع هذا العقد والمشار إليه فيما يلي بعبارة "المتسوغ"،

                <span className='data'>
                    من جـــهة أخرى(بصفته المتسوغ)
                    .
                </span>

            </p>
        )

    }

    const FemmeText2 = ()=>{
        return(
            <p>
            سوّغت على وجه الكراء المملك الشركة الوطنية العقارية للبلاد التونسية ، بصفتها المسوغة، تحت جميع الضمانات القانونية والفعلية السيدة
            <span className='data'>{' ' + data2.nomPrenomArClient + ' '}</span>
            بصفتهل المتسوغة، الشقة عدد
            <span className='data' dir='ltr'>{' ' + data2.numeroLog + ' '}</span>
            من العمارة
            <span className='data' dir='ltr'>{' ' + data2.blocLog + ' '}</span>
            بالطابق
            <span className='data' dir='ltr'>{' ' + data2.niveauLog + ' '}</span>
            بإقامة
            "
            <span className='data' dir='ltr'>{' ' + data.residence + ' '}</span>
            "
            بمنطقة المرازقة بنابل مقسم
            <span className='data'>{' ' + data.lotissement + ' '}</span>
            " صنف اجتماعي " تتكون من عدد
            <span className='data'>{' 0' + data2.typeLog.charAt(data2.typeLog.length - 1) + ' '}</span>
            غرف وقاعة استقبال ومطبخ وبيت استحمام تبلغ مساحتها الجملية
            <span className='data'>{' ' + data2.superficieLog.toFixed(2) + ' '}</span>
            م2 تقريبا باعتبار الأجزاء المشتركة التي ستستخرج تبعا لمثال التقسيم النهائي من الرسم العقاري عدد
            38013/110265 تونس.

        </p>
        )
    }

    const HommeText2 = ()=>{
        return(
            <p>
            سوّغت على وجه الكراء المملك الشركة الوطنية العقارية للبلاد التونسية ، بصفتها المسوغة، تحت جميع الضمانات القانونية والفعلية السيد
            <span className='data'>{' ' + data2.nomPrenomArClient + ' '}</span>
            بصفته المتسوغ، الشقة عدد
            <span className='data' dir='ltr'>{' ' + data2.numeroLog + ' '}</span>
            من العمارة
            <span className='data' dir='ltr'>{' ' + data2.blocLog + ' '}</span>
            بالطابق
            <span className='data' dir='ltr'>{' ' + data2.niveauLog + ' '}</span>
            بإقامة
            "
            <span className='data' dir='ltr'>{' ' + data.residence + ' '}</span>
            "
            بمنطقة المرازقة بنابل مقسم
            <span className='data'>{' ' + data.lotissement + ' '}</span>
            " صنف اجتماعي " تتكون من عدد
            <span className='data'>{' 0' + data2.typeLog.charAt(data2.typeLog.length - 1) + ' '}</span>
            غرف وقاعة استقبال ومطبخ وبيت استحمام تبلغ مساحتها الجملية
            <span className='data'>{' ' + data2.superficieLog.toFixed(2) + ' '}</span>
            م2 تقريبا باعتبار الأجزاء المشتركة التي ستستخرج تبعا لمثال التقسيم النهائي من الرسم العقاري عدد
            38013/110265 تونس.

        </p>
        )
    }

    return (
        <div>
             <div style={{display:'flex', justifyContent:'end'}}>
             <button className='btn-action' onClick={downloadPdf}>Download PDF</button>

             </div>
            <div id="contract-content">
                <div className="contract-page">

                    <div className="title">
                        <h1> عقد كراء مملك</h1>
                    </div>
                    <div className="section bold">

                        <p >
                            بيــن الممضيين أسفــــــــله:
                            <br />
                            الشركة الوطنية العقارية للبلاد التونسية ، منشأة عمومية محدثة بمقتضى القانون عدد 19 لسنة 1957 المؤرخ في 10 سبتمبر 1957 و المنقح بالقانون عدد 9 لسنة 1989 و المؤرخ في 01 فيفري 1989 ومسجلة بالسجل الوطني للمؤسسات C19851997 الترقيم الجبائي RBM000/2806 ومرخص لها في مباشرة نشاط البعث العقاري بموجب القرار الصادر عن السيد وزير التجهيز والإسكان بتاريخ 19 مارس 2014 والكائن مقرها الاجتماعي بحي المنار الثاني بتونس 2092 ويمثلها في هذا العقد رئيسها مديرها العام السيد فهمي كمون بمقتضى التفويض الصادر له عن مجلس إدارة الشركة بتاريخ 24 ديسمبر 2021 ، طبقا لمحضر الجلسة عدد 04/2021 والمسجل بالقباضة المالية بالمنزه التاسع تونس بتاريخ 30 ديسمبر 2021 تحت وصل عدد M086441 تسجيل عدد 21804563
                            ، من جـــهة (بصفتها المسوغة).

                        </p>
                    </div>

                    <div className="section">
                        {isFEMME ? <TextFemme1 /> : <TextHomme1 />}

                    </div>

                    <div className="title">
                        <h1> توطئـــــة </h1>
                    </div>

                    <div className="section">
                        <p>
                            بعـــد الاطلاع على القانون عدد 1 لسنة 2012 المؤرخ في 16/5/2012 المتعلق بقانون المالية التكميلي لسنة 2012 كما تم تنقيحه بالمرسوم عدد 21 لسنة 2021 المؤرخ في 28 ديسمبر 2021 المتعلق بقانون المالية لسنة 2022 والمتضمن في فصوله من 27 إلى 31 إحداث برنامج خصوصي للسكن الاجتماعي لفائدة الفئات الاجتماعية محدودة الدخل.
                            وعلى القانون عدد 51 لسنة 2013 المؤرخ في 23 ديسمبر 2013 المتعلق بقانون المالية التكميلي لسنة 2013،
                            وعلى القانون عدد 53 لسنة 2015 المؤرخ في 25 ديسمبر 2015 المتعلق بقانون المالية لسنة 2016 وخاصة الفصلين  11 و12 منه،

                        </p>
                    </div>

                    <div className="section">


                        <p>
                            وعلى الأمر عدد 1224 لسنة 2012 المؤرخ في 10 أوت 2012 المتعلق بتطبيق أحكام قانون المالية التكميلي لسنة 2012 المتعلقة بإحداث البرنامج الخصوصي للسكن الاجتماعي وعلى جميع النصوص المنقحة والمتممة له كالأمر الرئاسي عدد 538 لسنة 2023 المؤرخ في
                            <span className='colored'>                        20 جويلية 2023.
                            </span>
                            وعلى قرار وزير التجهيز والإسكان والتهيئة الترابية ووزير المالية المؤرخ في 31 مارس 2016 المتعلق بضبط صيغ وشروط وإجراءات استكمال تمويل ثمن المساكن والمقاسم الاجتماعية المسندة في إطار البرنامج الخصوصي للسكن الاجتماعي،


                        </p>
                    </div>
                    <div className="section">
                        <p>



                            وعلى اتفاقية التفويض المبرمة بين وزارة التجهيز والبيئة والشركة الوطنية العقارية للبلاد التونسية
                            <span className='colored'>{' '}
                                المسجلة بالقباضة المالية بسيدي حسين تونس
                                {' '}
                            </span>

                            بتاريخ 24 جويلية 2012 تسجيل عدد 12401889 وصل عدد M020025 والتي تم بمقتضاها تكليف الشركة الوطنية العقارية للبلاد التونسية بإنجاز دراسات المجمع السكني بمدينة عمر المختار بمنطقة سيدي حسين السيجومي تونس على المقسم

                            <span className='colored'>{data.lotissement}</span> من الصنف الاجتماعي موضوع الرسم العقاري عدد
                            <span className='colored'>{' ' + data.num_dessin_immobileir + ' '} </span>
                            نابل،
                        </p>
                    </div>


                    <div className="section">
                        <p>
                            وعلى اتفاقية التفويض المبرمة بين وزارة التجهيز والبيئة والشركة الوطنية العقارية للبلاد التونسية المسجلة بالقباضة المالية بسيدي حسين تونس بتاريخ 24 جويلية 2012 تسجيل عدد 12401889 وصل عدد M020025 والتي تم بمقتضاها تكليف الشركة الوطنية العقارية للبلاد التونسية بإنجاز دراسات المجمع السكني بمدينة عمر المختار بمنطقة سيدي حسين السيجومي تونس على المقسم
                            <span className='data'>{' ' + data.lotissement + ' '}</span>
                            من الصنف الاجتماعي موضوع الرسم العقاري عدد
                            548340
                            نابل،
                        </p>
                    </div>
                    <div className="section">
                        <p>
                            وعلى ملحق عدد 01 لاتفاقية تفويض وتمويل إنجاز أشغال المجمع السكني "بمدينة عمر المختار" بمنطقة سيدي حسين السيجومي تونس المبرم بين وزارة التجهيز والإسكان والتهيئة الترابية والشركة الوطنية العقارية للبلاد التونسية والمسجل بالقباضة المالية بسيدي حسين تونس بتاريخ 13 ديسمبر 2019 تحت وصل عدد M06765 ، تسجيل عدد 19403868.
                        </p>
                    </div>

                </div>


                <div className="contract-page">

                    <div className="section">
                        <p>
                            وعلى ملحق عدد 02 لاتفاقية تفويض وتمويل إنجاز مجمع سكني "بمدينة عمر المختار" بمنطقة سيدي حسين السيجومي تونس المبرم بين وزارة التجهيز والإسكان والتهيئة الترابية والشركة الوطنية العقارية للبلاد التونسية والمسجل بالقباضة المالية بالمنزه السادس بتاريخ 07 ديسمبر 2016 تحت عدد 15405646، الوصل عدد M107977.
                            وعلى مصادقة لجنة قيادة برنامج السكن الاجتماعي على أنموذج عقد الكراء المملك بتاريخ 2 ديسمبر 2015،
                            وعلى مصادقة لجنة قيادة برنامج السكن الاجتماعي على أنموذج عقد الكراء المملك بتاريخ 30 ماي 2023،
                            وعلى قائمة المنتفعين بهذه الشقق المصادق عليها من قبل اللجنة الجهوية لمتابعة برنامج السكن الاجتماعي بولاية تونس بتاريخ
                            <span className='colored'>20 جويلية 2023.</span>

                        </p>
                    </div>

                    <div className="section">
                        <p>
                            وعلى قائمة المنتفعين بالشقق المنجزة بإنجاز المجمع السكني "بمدينة عمر المختار" بمنطقة سيدي حسين السيجومي تونس المعدلة والمصادق عليها من قبل اللجنة الجهوية لمتابعة برنامج السكن الاجتماعي بولاية نابل بتاريخ 12 ديسمبر 2023.
                            وعلى جدول تحديد الأثمان ومبلغ المنحة وثمن التفويت لكل منتفع المقترح من قبل اللجنة الجهوية لمتابعة برنامج السكن الاجتماعي بولاية تونس بجلستها المنعقدة بتاريخ 07 ماي 2024.

                            <br />
                            وعلى مصادقة لجنة قيادة برنامج السكن الاجتماعي المنعقدة بتاريخ 14 ماي 2024 على جدول تحديد الأثمان ومبلغ المنحة وثمن التفويت لكل منتفع.
                        </p>
                    </div>


                    <div className="title">
                        <h1> تم الاتفاق والتراضي على ما يلي:   </h1>
                    </div>

                    <div className="section">
                        <h4>الفصل الأول: موضوع العقد. </h4>

                        {isFEMME ? <FemmeText2 /> : <HommeText2 />}
                    </div>

                    <div className="section">
                        <h4>
                            الفصل الثاني: انجرار الملكية.
                        </h4>
                        <p>
                            انجرت ملكية العقار موضوع الرسم العقاري عدد 38013/110265 تونس لفائدة الشركة الوطنية العقارية للبلاد التونسية بموجب عقد البيع المبرم بينها وبين السيد وزير أملاك الدولة والشؤون العقارية القائم في حق ملك الدولة الخاص والمسجل بالقباضة المالية بسيدي حسين السيجومي تونس بتاريخ 06 ماي 2013 تحت وصل عدد M020272، تسجيل عدد 13101355.
                        </p>
                    </div>

                    <div className="section">
                        <h4>
                            الفصل الثالث: ثمن التفويت.
                        </h4>
                        <p>
                            تم تحديد ثمن التفويت بمبلغ جملي ونهائي قدره :
                            <span className='data'>{' ' + data.mantantEnLettre + ' '}</span>

                            (
                            <span className='data' dir='ltr'>{' ' + data2.ta.montantTotal + ' '}</span>
                            د) يضاف إليه نسبة

                            <span className='data' dir='ltr'>{' ' + data2.ta.tauxInteret + '% '}</span>
                            كل

                            <span className='data' >{' ' + data.dureePeriode + ' '}</span>
                            تطبيقا للفصل 2 من قرار وزير التجهيز والإسكان والتهيئة الترابية ووزير المالية المؤرخ في 31 مارس 2016 وذلك طبقا لجدول احتساب الأقساط المصاحب لهذا العقد الذي قبله المتسوغ والذي يعتبر جزءا لا يتجزأ من هذا العقد.
                        </p>
                    </div>

                    <div className="section">
                        <h4>
                            الفصل الرابع: طريقة خلاص ثمن التفويت.                    </h4>
                        <p>
                            يتم خلاص الثمن الجملي للشقة موضوع هذا العقد عن طريق الكراء المملك وذلك على أساس معينات كراء تدفع من قبل المتسوغ بالحساب البريدي الجاري للشركة الوطنية العقارية للبلاد التونسية عدد
                            <span className='data' dir='ltr'>{' ' + data.numCompteSnit + ' '}</span>


                            وذلك بداية كل شهر وطيلة مدة
                            <span className='data' >{' ' + data.durreeTotaleEnLettre + ' '}</span>
                            (
                            <span className='data' dir='ltr'>{' ' + Math.floor(data2.ta.durreeTotale / 12) + ' '}</span>
                            سنة)
                            طبقا للفصل 2 من قرار وزير التجهيز والإسكان والتهيئة الترابية ووزير المالية مؤرخ في 31 مارس 2016 بداية من تاريخ التسليم وذلك طبقا لجدول احتساب الخلاص المقابل لهذا العقد ومقابل وصولات خلاص تسلم شهريا في الغرض من قبل الشركة الوطنية العقارية للبلاد التونسية.
                            <br />
                            حرصا على ضمان استرجاع الدين المتخلّد بذمته لفائدة الدولة، يمضي المتسوغ كمبيالة في مبلغ الثمن الجملي للشقة موضوع هذا العقد.


                        </p>
                    </div>
                    <div className="section">
                        <p>
                            وفي حالة وفاة المتسوغ، ينتقل حق الانتفاع بهذا العقد وكل الالتزامات المضمّنة به لقرينه ما لم يتزوج من جديد، ولأبنائه بموجب عقد جديد.
                            <br />
                            وينتقل حق الانتفاع بهذا العقد إلى أبناء المتسوغ، في صورة وفاة القرين أو حرمانه من هذا الحق، بموجب عقد جديد.
                            وفي حالة وفاة المتسوغ ووجود أبناء قصّر، يتم البتّ في الوضعية وفقا للإجراءات القانونية المعمول بها من قبل اللجنة الجهوية لمتابعة برنامج السكن الاجتماعي بولاية تونس وبعد البت فيها يتم إبرام عقد جديد طبقا للقرار المتخذ في شأنها.

                        </p>
                    </div>

                </div>

                <div className="contract-page">




                    <div className="section">
                        <h4>
                            الفصل الخامس: تحويز المكرى.
                        </h4>
                        <p>
                            لا يحوّز المتسوغ بالمكرى إلا بعد إرجاع النظائر الأصلية الأربع من عقد الكراء المملك إلى المسوغ ممضاة مع التعريف بالإمضاء عليها ومسجلة بالقباضة المالية، ويتم تسليم مفاتيح الشقة وجوبا على عين المكان وبعد تحرير محضر تحويز يقع إمضاؤه من الطرفين.
                            <br />
                            يعترف المتسوغ بالرؤية والتقليب للمكرى وقبوله على الحالة التي هو عليها حدّا وموقعا ومساحة بالثمن المذكور دون احتراز أو تحفظ.
                            <br />
                            يجب على المتسوغ أن يعلم المسوغ بالعيوب الظاهرة للبناء وذلك في أجل ثلاثة أشهر بداية من تاريخ التحويز.
                        </p>
                    </div>

                    <div className="section">
                        <h4>
                            الفصل السادس: نقل الملكية.                    </h4>
                        <p>
                            يصبح المتسوغ مالكا للشقة بعد خلاص جميع معينات الكراء الشهرية طيلة خمسة وعشرون سنة (25 سنة)
                            طبقا للفصل 2 من قرار وزير التجهيز والإسكان والتهيئة الترابية ووزير المالية مؤرخ في 31 مارس 2016. كما يمكن له أن يصبح مالكا للشقة المذكورة بعد خلاص جميع معينات الكراء الشهرية قبل انتهاء مدّة التقسيط المذكورة أعلاه أو بمجرد خلاص كامل الأقساط المتخلدة بذمته صبرة واحدة.
                            <br />
                            ويحجر على المتسوغ إدخال أي تغيير على الشقة المذكورة إلا بعد خلاص كامل الثمن وإبرام عقد البيع.
                            <br />
                            ويحجر على المتسوغ التفويت في الشقة قبل خلاص كامل الأقساط المتخلدة بذمته وانقضاء مدة عشر سنوات من تاريخ ابرام عقد الكراء المملك معه أو بعد ترخيص الوزير المكلف بالإسكان في ذلك مسبقا حسب الوضعيّة.
                            <br />
                            تتعهد الشركة الوطنية العقارية للبلاد التونسية باستخراج شهادة الملكية الفردية الخاصة بالشقة موضوع هذا العقد وتتولى التفويت له فيها بعد خلاصه كامل ثمن التفويت الجملي للشقة.
                            <br />
                            يتم نقل الملكية بمقتضى كتب بيع يبرم بين الطرفين المتعاقدين بعد خلاص كامل أقساط معينات الكراء وتحمل جميع المصاريف المترتبة عن ترسيم كتب البيع وإيداعه بإدارة الملكية العقارية على كاهل المشتري الذي يلتزم بذلك.
                        </p>
                    </div>
                    <div className="section">
                        <h4>
                            الفصل السابع: سقوط الحق
                        </h4>
                        <p>
                            يسقط حق المتسوغ في ملكية الشقة المذكورة عند تخلفه عن خلاص معينات كراء ثلاثة أشهر متتالية وبعد اتخاذ جميع الإجراءات القانونية اللازمة والجاري بها العمل، ويتم وضع هذه الشقة على ذمة المسوغ قصد تسويغها بنفس الصيغة لمنتفع آخر بعد إخلائها ولا يمكن للمتسوغ بعد ذلك طلب استرجاع المبالغ التي دفعها والتي تعتبر بمثابة معينات كراء الفترة التي استغل فيها الشقة.
                            <br />
                            يلتزم المتسوغ بأن يتم استغلال المكرى من قبله وعائلته فقط ويحجّر عليه تسويغه لفائدة الغير ويسقط حقه في ملكية الشقة المسندة له في صورة تسويغها أو التفويت فيها قبل خلاص كامل الأقساط المتخلّدة بذمته وقبل انقضاء مدة عشر سنوات من تاريخ إبرام عقد الكراء المملك.
                        </p>
                    </div>
                    <div className="section">
                        <h4>
                            الفصل الثامن: إلتزامات المتسوغ.                    </h4>
                        <p>
                            يتعهد المتسوغ باحترام الصبغة السكنية للمكرى ويلتزم بعدم إكسابه أية صبغة أخرى أو ممارسة نشاطات غير مصادق عليها بالمكرى المذكور كما يلتزم باحترام المثال الهندسي الخارجي للمكرى المعد من طرف المسوغة.
                            <br />
                            كما يلتزم المتسوغ بالقيام بصيانة المكرى وجميع الإصلاحات اللازمة للأضرار التي قد تلحق به وذلك قصد المحافظة عليه.

                        </p>
                    </div>
                    <div className="section">
                        <h4>
                            الفصل التاسع: الأداءات.
                        </h4>
                        <p>
                            يتحمل المتسوغ جميع الآداءات والمعاليم الموظفة على الشقة بداية من إمضائه عقد الكراء المملك، ويلتزم بخلاص المبالغ المتخلدة بذمته حتى في صورة إخراجه من الشقة لعدم خلاص معينات الكراء.                    </p>
                    </div>
                    <div className="section">
                        <h4>
                            الفصل العاشر: معلوم التسجيل.
                        </h4>
                        <p>
                            يتم تسجيل هذا العقد بالمعلوم القار وذلك طبقا للفصل 31 من القانون عدد 27 لسنة 2012 المؤرخ في 29 ديسمبر 2012 والمتعلق بقانون المالية لسنة 2013 باعتبار أن التفويت في هذا المسكن يندرج في إطار البرنامج الخصوصي للسكن الاجتماعي.
                            <br />
                            وتحمل جميع مصاريف تسجيل هذا العقد بالقباضة المالية على المتسوغ الذي يلتزم بذلك.
                        </p>

                    </div>
                    <div className="section">
                        <h4>
                            الفصل   الحادي عشر: فض النزاعات
                        </h4>
                        <p>
                            في صورة نزاع بين الطرفين فإن محاكم مرجع نظر ولاية نابل تكون مختصة بالنظر في النزاع.
                        </p>
                    </div>
                </div>

                <div className="contract-page">

                    <div className="section">
                        <h4>
                            الفصل  الثاني عشر: تعيين محل مخابرة.
                        </h4>
                        <p>
                            لتنفيذ مقتضيات هذا العقد وما ينجر عنه، اختارت المسوغة محل مخابرتها بمقرها الاجتماعي المبين بطالع هذا العقد وبالنسبة للمتسوغ فإن محل مخابرته عنوان الشقة موضوع هذا العقد.                            </p>
                    </div>

                    <div className="section">
                        <h4>
                            الفصل  الثالث عشر: محرر العقد .
                        </h4>
                        <p>
                            عملا بمقتضيـات الفصل 377 من مجلـة الحقـوق العينية المنقـح بالقانــون عـــدد 46 لسنـة 1992 المـؤرخ فـي 04/05/1992 والمتمــم بالقانون عدد 84 لسنة 1992 المؤرخ في 06/08/1992 وقع تحرير هذا العقد من طرف الأستاذة حنان بن عمارة المحامية لدى التعقيب والكائن مكتبها بعدد 42 شارع الشاذلي قلالة الطابق الرابع بتونس معرفها الجبائي عدد Q/A/P/000 1020432 والتي تصرح بعدم وجود أي مانع قانوني للتحرير.
                            <br />
                            يعتبر إمضاء الطرفين على هذا الكتب إقرارا منهما بإعلامهما بتلك الحالة القانونية من ناحية وبقبولهما بها ورضائهما بالإمضاء على هذا الكتب بعد اطلاعهما عليه من ناحية أخرى.
                        </p>
                    </div>

                    <div className="footer">
                        <h3>
                            حرر هذا العقد في ستة نظائر
                            <br />
                            محرر هذا العقد
                            <br />
                            الأستاذة حنان بن عمارة المحامية


                        </h3>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '30px', fontSize: '22px' }}>

                        <p>الشركة الوطنية العقارية للبلاد التونسية</p>
                        <p>{adjustedText.locataire}</p>
                    </div>

                </div>

                <div className="contract-page">
                    <div className="title">
                        <h1 style={{ marginBottom: '20px' }}>
                            جدول احتساب الأقساط

                        </h1>
                    </div>
                    <div className="section">
                        <table className='table' aria-label="simple ta">
                            <tr className='ta-head'>
                                <th className="ta-cell" dir='rtl'>رقم</th>
                                <th className="ta-cell date" dir='rtl'>بداية</th>
                                <th className="ta-cell date" dir='rtl'>نهاية</th>
                                <th className="ta-cell" dir='rtl'>الباقي</th>
                                <th className="ta-cell" dir='rtl'>الفائدة</th>
                                <th className="ta-cell" dir='rtl' >التسديد</th>
                                <th className="ta-cell" dir='rtl'>السنوي</th>
                                <th className="ta-cell" dir='rtl'>الشهري</th>
                            </tr>
                            {data2.ta.simulTableauAmortissements.map((row) => (
                                <tr className="ta-row">
                                    <td className="ta-cell">{row.numero}</td>
                                    <td className="ta-cell date">{row.dateDebut}</td>
                                    <td className="ta-cell date">{row.dateFin}</td>
                                    <td className="ta-cell">{row.crd}</td>
                                    <td className="ta-cell">{row.interet}</td>
                                    <td className="ta-cell">{row.amortissement}</td>
                                    <td className="ta-cell">{row.annuite}</td>
                                    <td className="ta-cell mensualite">{row.mensualite}</td>
                                </tr>
                            ))}

                        </table>


                        {
                        /*
                        data2.ta.resume && <ResumeTable resumeTableauAmortissement={data2.ta.resume} />
                        */}
                    </div>


                </div>
            </div>

           
        </div>
    );
};

export default ContractDocument;
