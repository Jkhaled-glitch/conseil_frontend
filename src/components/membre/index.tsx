import React, { useState, useEffect, useContext } from 'react';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { Box, Button, Chip, IconButton } from '@mui/material';
import { Delete, Edit, ToggleOff, ToggleOn, Visibility } from '@mui/icons-material';
import { toast } from 'react-toastify';

import { Membre } from '../../config/types';
import { api } from '../../config/config';
import ViewPersonnel from './View';
import EditPersonnel from './Edit';
import ConfirmDelete from './ConfirmDelete';
import AddPersonnel from './Add';
import ConfirmAddPersonnel from './ConfirmAdd';




const App: React.FC = () => {
  const [rows, setRows] = useState<Membre[]>([]);
  const [openView, setOpenView] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [openConfirmAdd, setOpenConfirmAdd] = useState(false);
  const [openChangePassword, SetOpenChangePassword] = useState(false);
  const [selectedMembre, setSelectedPersonnel] = useState<Membre | null>(null);
  const [newPersonnel, setNewPersonnel] = useState<Membre | null>(null);


  useEffect(() => {
    api.get(`/membres`)
      .then(response => {
       
        setRows(response.data);
      })

  }, []);



  const handleViewClick = (membre: Membre) => {
    setSelectedPersonnel(membre);
    setOpenView(true);
  };

  const handleEditClick = (Membre: Membre) => {
    setSelectedPersonnel(Membre);
    setOpenEdit(true);
  };

  const handleDeleteClick = (Membre: Membre) => {
    setSelectedPersonnel(Membre);
    setOpenDelete(true);
  };

  const handleAddClick = () => {
    setOpenAdd(true);
  };

  const handleAddPersonnel = (Membre: Membre) => {
    setNewPersonnel(Membre);
    setOpenConfirmAdd(true);
  };

  const handleConfirmAddPersonnel = () => {

    if (newPersonnel) {
      api.post(`/personnels/add`, newPersonnel)
        .then(() => {
          toast.success('Membre ajouté avec succès');

          api.get(`/personnels`)
            .then(response => {
              setRows(response.data);
            })
        })
    }
    setOpenConfirmAdd(false);
    setNewPersonnel(null);
  };









  const handleConfirmDelete = () => {
    if (selectedMembre) {
      api.delete(`/personnels/${selectedMembre.id}`)
        .then(() => {
          setRows(rows.filter(row => row.id !== selectedMembre.id));
          toast.success('Membre supprimé avec succès');
        })
    }
    setOpenDelete(false);
    setSelectedPersonnel(null);
  };

  const handleSavePersonnel = (membre: Membre) => {
    api.put(`/personnels/${membre.id}`, membre)
      .then(response => {
        setRows(rows.map(row => row.id === membre.id ? response.data : row));
        toast.success('Membre modifié avec succès');
      })
  };



  function switchIsActif(membre: Membre): void {

    api.put(`/membres/${membre.id}/switch-actif`)
      .then(() => {
        const isActif = !membre.isActif;
        setRows(rows.map(row =>
          row.id === membre.id ? { ...row, isActif } : row
        ));

        const message = isActif
          ? `Le Membre ${membre.nom} ${membre.prenom} a été activé avec succès.`
          : `Le Membre ${membre.nom} ${membre.prenom}  a été désactivé avec succès.`;

        toast.success(message);
      })

  }


  


  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 130 },
    { field: 'nom', headerName: 'Nom', width: 130 },
    { field: 'prenom', headerName: 'Prenom', width: 130 },
    { field: 'role', headerName: 'Role', width: 130 },
    {
        field: "isActif",
        headerName: "Etat",
        width: 120,
        renderCell: (params: GridRenderCellParams) => {
         
  
          return (
  
            <IconButton color={params.row.isActif ? "success" : "error"} onClick={() => switchIsActif(params.row as Membre)} >
              {params.row.isActif ? <ToggleOff /> : <ToggleOn />}
            </IconButton>
          );
        },
      },

   
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params: GridRenderCellParams) => (
        <>
          <IconButton color="info" onClick={() => handleViewClick(params.row as Membre)}>
            <Visibility />
          </IconButton>
          <IconButton color="warning" onClick={() => handleEditClick(params.row as Membre)}>
            <Edit />
          </IconButton>
          <IconButton color="error" onClick={() => handleDeleteClick(params.row as Membre)}>
            <Delete />
          </IconButton>

        </>
      ),
    },
  ];

  return (
    <Box>
      <h3>Gestion des Membres</h3>
      <Box style={{ display: 'flex', justifyContent: 'end', marginBottom: '10px' }}>
        <Button variant="contained" color="primary" onClick={handleAddClick}>Ajouter Membre</Button>
      </Box>
      <DataGrid
        rows={rows}
        columns={columns}
        pagination
        style={{ minHeight: '50vh' }}
    
      />
      {selectedMembre &&
        <>
          <ViewPersonnel
            open={openView}
            onClose={() => setOpenView(false)}
            data={selectedMembre}
          />
          <EditPersonnel
            open={openEdit}
            onClose={() => setOpenEdit(false)}
            data={selectedMembre}
         
            onSave={handleSavePersonnel}
          
          />
          <ConfirmDelete
            open={openDelete}
            onClose={() => setOpenDelete(false)}
            onConfirm={handleConfirmDelete}
            data={selectedMembre?.id!}
          />




        </>}

      <AddPersonnel
        open={openAdd}
        onClose={() => setOpenAdd(false)}
      
        onAdd={handleAddPersonnel}
      />
      <ConfirmAddPersonnel
        open={openConfirmAdd}
        onClose={() => setOpenConfirmAdd(false)}
        data={newPersonnel}
        onConfirm={handleConfirmAddPersonnel}
      />
     

    </Box>
  );
};

export default App;
