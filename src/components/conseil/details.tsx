import { useState, useEffect } from "react";
import {
  Box, Typography, Paper, Grid, Divider, Button,
  List, ListItem, ListItemText, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow,
  CircularProgress
} from "@mui/material";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { api } from "../../config/config";
import { Conseil, Membre, Point, Presence } from "../../config/types";
import { toast } from "react-toastify";



const ConseilDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [conseil, setConseil] = useState<Conseil | null>(null);
  const [loading, setLoading] = useState(false)




  useEffect(() => {
    if (id) fetchConseilDetails(id);
  }, [id]);

  const fetchConseilDetails = async (id: string) => {
    try {
      const { data } = await api.get(`/conseils/${id}`);
      setConseil(data);
    } catch (error) {
      console.error("Erreur de chargement du conseil", error);
    }
  };

  const handleDownloadAllDocuments = async () => {
    if (!conseil || !conseil.points.length || !conseil.pv) {
      toast.warn(" ! لا يوجد أي ملف");
      return;
    }

    setLoading(true); // 
    toast.info("📂 Création du fichier ZIP en cours...");

    const zip = new JSZip();

    const downloadAndStoreFile = async (url: string) => {
      try {
        const response = await axios.get(url, { responseType: "arraybuffer" });

        const relativePath = url.split("/storage/")[1];
        if (!relativePath) return;

        let folder = zip;
        const pathParts = relativePath.split("/");
        for (let i = 0; i < pathParts.length - 1; i++) {
          folder = folder.folder(pathParts[i]) ?? folder.folder(pathParts[i])!;
        }

        folder.file(pathParts[pathParts.length - 1], response.data);
      } catch (error) {
        console.error(`Erreur lors du téléchargement du fichier ${url}`, error);
      }
    };

    const requests: Promise<void>[] = [];

    if (conseil.pv && conseil.pv.url) {
      requests.push(downloadAndStoreFile(conseil.pv.url));
    }

    conseil.points.forEach((point) => {
      point.documents.forEach((doc) => {
        requests.push(downloadAndStoreFile(doc.url));
      });
    });

    conseil.presences.forEach((presence) => {
      if (presence.document && presence.document.url) {
        requests.push(downloadAndStoreFile(presence.document.url));
      }
    });

    await Promise.all(requests);

    zip.generateAsync({ type: "blob" }).then((content) => {
      saveAs(content, `${conseil.nom}.zip`);
      toast.success("✅ Téléchargement terminé !");
    }).catch((error) => {
      console.error("Erreur lors de la création du ZIP", error);
      toast.error("❌ Erreur lors de la création du ZIP.");
    }).finally(() => {
      setLoading(false); // 🔴 Désactiver le loading
    });
  };







  return (
    <Box p={3} sx={{ mx: "auto", textAlign: "right", direction: "rtl" }}>
      <Typography variant="h4" gutterBottom>تفاصيل المجلس</Typography>

      {conseil ? (
        <Paper sx={{ p: 3, boxShadow: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6">المجلس: {conseil.nom}</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6">تاريخ الإنعقاد: {conseil.dreunion}</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6">تاريخ المصادقة: {conseil.daccord}</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6">محضر المجلس:</Typography>
              {conseil.pv && (
                <a
                  href={`/document/${conseil.pv.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: "none", color: "#3f51b5" }}
                >
                  {conseil.pv.name}
                </a>
              )}
            </Grid>
          </Grid>

          <AgendaList points={conseil.points} conseilId={conseil.id} />

          <Typography variant="h6">الحضور :</Typography>
          <AttendanceTable presences={conseil.presences} conseilId={conseil.id} />

          <Grid item xs={12} md={6} mt={2}>


            <Button onClick={handleDownloadAllDocuments} disabled={loading}>
              {loading ? <CircularProgress size={20} /> : "تحميل جميع الوثائق"}
            </Button>
          </Grid>

          <Divider sx={{ my: 2 }} />
          <Button variant="contained" color="primary" onClick={() => navigate(-1)}>رجوع</Button>
        </Paper>
      ) : (
        <Typography variant="body1" color="textSecondary">جاري تحميل التفاصيل...</Typography>
      )}
    </Box>
  );
};

const AgendaList = ({ points, conseilId }: { points: Point[], conseilId: number }) => (
  <Box sx={{ my: 3 }}>
    <Typography variant="h6">جدول الأعمال :</Typography>
    <List sx={{ direction: 'rtl' }}>
      {points.map((point, index) => (
        <Paper key={index} sx={{ p: 2, mb: 2 }}>
          <ListItemText primary={`${index + 1}. ${point.nom}`} sx={{ textAlign: 'right' }} />
          <List sx={{ direction: 'rtl' }}>
            {point.documents.map((doc, docIndex) => (
              <ListItem key={docIndex} sx={{ display: 'flex', alignItems: 'center', pl: 2 }}>
                <a
                  href={`/document/${doc.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: 'none', color: '#3f51b5' }}
                >
                  📄 {doc.name}
                </a>
              </ListItem>
            ))}
          </List>
        </Paper>
      ))}
    </List>

  </Box>
);

const AttendanceTable = ({ presences, conseilId }: { presences: Presence[], conseilId: number }) => (
  <TableContainer component={Paper}>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>الاسم</TableCell>
          <TableCell>الدور</TableCell>
          <TableCell>الحضور</TableCell>
          <TableCell>المفوض له</TableCell>
          <TableCell>وثيقة التفويض</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {presences.map((p) => {


          return (
            <TableRow key={p.id}>
              <TableCell>{p.membre.nom} {p.membre.prenom}</TableCell>
              <TableCell>{p.membre.role}</TableCell>
              <TableCell>{p.statut === "P" ? "حاضر" : p.statut === "A" ? "غائب" : "تفويض"}</TableCell>
              <TableCell>{p.delegueA ? `${p.delegueA.nom} ${p.delegueA.prenom}` : ""}</TableCell>
              <TableCell>
                {p.document && (
                  <a
                    href={`/document/${p.document.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: "none", color: "#3f51b5" }}
                  >
                    {p.document.name}
                  </a>
                )}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  </TableContainer>
);

export default ConseilDetails;
