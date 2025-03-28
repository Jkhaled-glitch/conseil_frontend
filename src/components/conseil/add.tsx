import { useState, useEffect, useRef } from "react";
import { Box, TextField, Button, Typography, IconButton, List, ListItem, ListItemText, Paper, FormControl, InputLabel, MenuItem, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { api } from "../../config/config";
import { toast } from "react-toastify";
import { Membre, Point, Presence, PresenceRequest, PointRequest, DocumentRequest } from "../../config/types";

import {
  addConseil,
  addPresence,
  addPoint,
  addPv
} from "./methods";




const AjouterConseil = () => {
  const [nom, setNom] = useState("");
  const [dReunion, setDReunion] = useState("");
  const [membres, setMembres] = useState<Membre[]>([]);
  const [points, setPoints] = useState<PointRequest[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [presences, setPresences] = useState<PresenceRequest[]>([]);
  const [pv, setPv] = useState<File | null>(null)
  const buttonRef = useRef<HTMLButtonElement | null>(null);




  useEffect(() => {
    api.get("/membres/actif").then((response) => {
      const data = response.data as Membre[];
      setMembres(data);

      // Initialiser toutes les présences avec "Présent"
      setPresences(
        data.map((m) => ({
          membre: m.id,
          statut: "P"
        }))
      );
    });
  }, []);


  const handleAddPoint = () => {
    const numero = points.length + 1;
    if (inputValue.trim() !== "") {
      const point: PointRequest = { nom: inputValue, numero, documents: [], selectedFile: null };
      setPoints([...points, point]);
      setInputValue("");
    }
  };

  const handleAddDocument = (numero: number) => {
    setPoints(prevPoints => {
      const pointIndex = prevPoints.findIndex(p => p.numero === numero);
      if (pointIndex === -1 || prevPoints[pointIndex].selectedFile === null) {
        return prevPoints;
      }

      const updatedPoints = [...prevPoints];
      updatedPoints[pointIndex] = {
        ...updatedPoints[pointIndex],
        documents: [...updatedPoints[pointIndex].documents, updatedPoints[pointIndex].selectedFile!],
        selectedFile: null
      };

      return updatedPoints;
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, numero: number) => {
    if (e.target.files?.[0]) {
      setPoints(prevPoints => {
        return prevPoints.map(point => {
          if (point.numero === numero) {
            return {
              ...point,
              selectedFile: {
                name: e.target.files![0].name.substring(0, e.target.files![0].name.lastIndexOf('.')),
                file: e.target.files![0],
              }
            };
          }
          return point;
        });
      });
    }
  };


  const handlePVChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setPv(e.target.files?.[0]);
    }
  };

  const handleRemovePv = () => {
    setPv(null);
  };


  const handlePresenceChange = (membreId: number, statut: Presence["statut"]) => {
    setPresences((prevPresences) =>
      prevPresences.map((p) =>
        p.membre === membreId
          ? {
            ...p,
            statut,
            document: statut === "D" ? undefined : p.document,
            delegueA: undefined,
          }
          : p
      )
    );
  };


  const handlePresenceDelegueChange = (membreId: number, delegueA?: number) => {

    if (!delegueA) {
      delegueA = undefined
    }


    setPresences(presences.map(p => p.membre === membreId ? { ...p, delegueA } : p));
  };




  const handleFileDelegueChange = (membreId: number, event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.[0]) {
      setPresences(presences.map(p => p.membre === membreId ? { ...p, document: event.target.files?.[0] } : p));
    }
  };

  const handleRemovePoint = (numero: number) => {
    const updatedPoints: PointRequest[] = points.filter((point) => point.numero !== numero);

    // Réorganiser les numéros après suppression
    const renumberedPoints = updatedPoints.map((point, i) => ({
      ...point,
      numero: i + 1 // Numérotation commence à 1
    }));

    setPoints(renumberedPoints);
  };
  const handleRemoveDocument = (pointIndex: number, docIndex: number) => {
    const updatedPoints = [...points];
    updatedPoints[pointIndex].documents = updatedPoints[pointIndex].documents.filter((_, i) => i !== docIndex);
    setPoints(updatedPoints);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    //validataion des informations 

    if (presences.every(p => p.statut === "A")) {
      toast.error("Au moins un membre doit être présent.");
      return;
    }
  
      // Vérification des présences
  for (const presence of presences) {
    if (presence.statut === "D") {
      if (!presence.delegueA) {
        toast.error(`Le membre avec l'ID ${presence.membre} est délégué, mais aucun délégataire n'a été sélectionné.`);
        return;
      }
      if (!presence.document) {
        toast.error(`Le membre avec l'ID ${presence.membre} est délégué, mais aucun document de délégation n'a été ajouté.`);
        return;
      }
    }
  }

    try {
      /* Etapes
      1 - Ajouter le conseil avec son nom et dReunion et récupérer l'ID
      2 - Ajouter les présences et récupérer l'ID
      3 - Ajouter les documents de présence si présents
      4 - Ajouter les points un par un s'ils existent
      5 - Ajouter les documents des points pour chaque point
      */

      // 1. Ajouter le conseil
      const conseilData = {
        nom,
        dreunion: dReunion

      };
      const conseil = await addConseil(conseilData); // Ajout du conseil et récupération de l'ID

      // 2. Ajouter les présences
      for (const presence of presences) {
        const addedPresence = await addPresence(conseil.id, presence); // Ajout de chaque présence
        console.log("Présence ajoutée avec succès : ", addedPresence);
      }

      // 4. Ajouter les points un par un
      for (const point of points) {
        await addPoint(conseil.id, point); // Ajout de chaque point

      }

      if(pv){
       await  addPv(conseil.id,pv);

      }

      toast.success("Le conseil et toutes ses informations ont été ajoutés avec succès !");
    } catch (error) {
      console.error("Erreur lors de l'ajout du conseil :", error);
      toast.error("Erreur lors de l'ajout du conseil");
    }
  }


  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();  // Empêche le comportement par défaut de la touche Enter (soumission du formulaire)
      e.stopPropagation(); // Empêche la propagation de l'événement
      if (buttonRef.current) {
        buttonRef.current.click();
      }
    }
  };






  return (
    <Box p={3} sx={{ mx: "auto", textAlign: "right", direction: "rtl" }}>
      <Typography variant="h4" gutterBottom>
        إضافة مجلس الإدارة
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="المجلس"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
          required
          margin="normal"
        />
        <TextField
          fullWidth
          label="تاريخ المجلس"
          type="date"
          value={dReunion}
          onChange={(e) => setDReunion(e.target.value)}
          required
          margin="normal"
          InputLabelProps={{ shrink: true }}
        />

        <Box sx={{ my: 3 }}>
          <Typography variant="h6">جدول الأعمال :</Typography>
          <List sx={{ direction: 'rtl' }}>
            {points.map((point) => (
              <Paper key={point.numero} sx={{ p: 2, mb: 2 }}>
                <Box sx={{ position: "relative" }}>
                  <ListItemText primary={`${point.numero}. ${point.nom}`} sx={{ textAlign: 'right' }} />
                  <IconButton
                    color="error"
                    sx={{ position: "absolute", top: 0, left: 0 }}
                    onClick={() => handleRemovePoint(point.numero)}
                    title="حذف النقطة"
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
                <List sx={{ direction: 'rtl' }}>
                  {point.documents.map((doc, docIndex) => (
                    <ListItem key={docIndex} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pl: 2, textAlign: 'right', width: '100%' }}>
                      <ListItemText primary={`📄 ${doc.name}`} sx={{ flexGrow: 1 }} />
                      <IconButton color="error"
                        onClick={() => handleRemoveDocument(point.numero, docIndex)}
                        title="حذف الملف">
                        <DeleteIcon />
                      </IconButton>
                    </ListItem>
                  ))}
                </List>

                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Button variant="contained" component="label" startIcon={<UploadFileIcon />}
                    sx={{ width: '150px', marginLeft: '20px' }}>
                    تحميل ملف
                    <input
                      type="file"
                      accept=".pdf"
                      hidden
                      onChange={(e) => handleFileChange(e, point.numero)}
                    />
                  </Button>
                  <TextField
                    sx={{
                      direction: 'rtl',
                      textAlign: 'right',
                    }}
                    label="إسم الملف"
                    value={point.selectedFile?.name || ""}
                    onChange={(e) =>
                      setPoints(points.map((pt) => pt.numero === point.numero ? {
                        ...pt,
                        selectedFile: { ...pt.selectedFile!, name: e.target.value }
                      } : pt))
                    }

                    disabled={!point.selectedFile}
                    InputLabelProps={{
                      style: {
                        textAlign: 'right',
                      }
                    }}
                  />
                  <IconButton
                    color="success"
                    onClick={() => handleAddDocument(point.numero)}
                    disabled={!point.selectedFile}
                  >
                    <UploadFileIcon />
                  </IconButton>
                  {point.selectedFile?.name && <Typography>{point.selectedFile?.name}</Typography>}

                </Box>
              </Paper>
            ))}
          </List>

          <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
            <TextField
              label="إضافة نقطة"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              fullWidth
              onKeyDown={handleKeyDown}
              variant="outlined"
              size="small"

            />
            <IconButton color="primary" onClick={handleAddPoint} ref={buttonRef}>
              <AddIcon />
            </IconButton>
          </Box>
        </Box>



        <Typography variant="h6">الحضور :</Typography>

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
              {membres.map((membre) => {
                const presence = presences.find(p => p.membre === membre.id);
                return (
                  <TableRow key={membre.id}>
                    <TableCell>{membre.nom} {membre.prenom}</TableCell>
                    <TableCell>{membre.role}</TableCell>
                    <TableCell>
                      <FormControl fullWidth variant="outlined" size="small">
                        <InputLabel id={`presence-label-${membre.id}`}>الحضور</InputLabel>
                        <Select
                          labelId={`presence-label-${membre.id}`}
                          value={presence?.statut || "P"}
                          onChange={(e) =>
                            handlePresenceChange(membre.id, e.target.value as "P" | "A" | "D")
                          }
                          label="الحضور"
                        >
                          {["P", "A", "D"].map((status) => (
                            <MenuItem key={status} value={status}>
                              {status === "P" ? "حاضر" : status === "A" ? "غائب" : "تفويض"}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>


                    </TableCell>




                    <TableCell>
                      <FormControl fullWidth variant="outlined" size="small" >
                        <InputLabel id={`delegue-label-${membre.id}`} shrink={presence?.delegueA ? true : false} >المفوض له</InputLabel>
                        <Select
                          labelId={`delegue-label-${membre.id}`}
                          value={presence?.delegueA || ""}
                          onChange={(e) => handlePresenceDelegueChange(membre.id, Number(e.target.value))}
                          label="المفوض له"

                          disabled={presence?.statut != "D"}
                        >
                          <MenuItem value="">
                            <em>غير محدد</em> {/* Option vide ou texte comme "غير محدد" */}
                          </MenuItem>
                          {membres.filter((m) => m.id !== membre.id).map((m) => (
                            <MenuItem key={m.id} value={m.id}>
                              {m.nom} {m.prenom}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </TableCell>


                    <TableCell>
                      {presence?.statut === "D" && (
                        <>

                          <Button variant="contained" component="label" startIcon={<UploadFileIcon />}>
                            تحميل
                            <input type="file" accept=".pdf" hidden onChange={(e) => handleFileDelegueChange(membre.id, e)} />
                          </Button>

                          {presence.document && [
                            <Typography> {presence.document.name}</Typography>
                          ]}

                        </>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>


        <Box  sx={{ display: "flex", justifyContent:'space-between', mb: 2 , marginTop: 2 }}>
<Box>


          <Button variant="contained" component="label" startIcon={<UploadFileIcon />}
            sx={{ width: '250px', marginLeft: '20px' }}>
            تحميل محضر المجلس
            <input
              type="file"
              accept=".pdf"
              hidden
              onChange={(e) => handlePVChange(e)}
            />
          </Button>

        {pv && 
        <>{pv.name}</>}



          </Box>


          <IconButton color="error"
            onClick={() => handleRemovePv()}
            title="حذف محضر المجلس"
            disabled={!pv}
            
            >
            <DeleteIcon />
          </IconButton>
        </Box>


        <Button type="submit" variant="contained" sx={{ mt: 3 }}>
          حفظ المجلس
        </Button>
      </form>
    </Box>
  );
};

export default AjouterConseil;
