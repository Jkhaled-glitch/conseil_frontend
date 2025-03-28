import React, { useState, useEffect, useContext } from 'react';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { Box, Button, Chip, IconButton } from '@mui/material';
import { Delete, Edit, ToggleOff, ToggleOn, Visibility } from '@mui/icons-material';
import { toast } from 'react-toastify';

import { User as UserSchema, PasswordInfo, UserRequest, Role } from '../../config/types';
import { api } from '../../config/config';
import ViewUser from './View';
import EditUser from './Edit';
import ConfirmDelete from './ConfirmDelete';
import AddUser from './Add';
import ConfirmAddUser from './ConfirmAdd';
import ChangePassword from './ChangePassword'
import { AuthContext } from '../../context/AuthContext';




const User: React.FC = () => {
  const [rows, setRows] = useState<UserSchema[]>([]);
  const [openView, setOpenView] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [openConfirmAdd, setOpenConfirmAdd] = useState(false);
  const [openChangePassword, SetOpenChangePassword] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserSchema | null>(null);
  const [newUser, setNewUser] = useState<UserRequest | null>(null);

  const {username} = useContext(AuthContext)


  const [roles, setRoles] = useState<Role[]>([])


  useEffect(() => {
    api.get(`/users`)
      .then(response => {
        setRows(response.data);
      })


    api.get(`/roles`)
      .then(response => {

        setRoles(response.data as Role[]);
      })

  }, []);



  const handleViewClick = (User: UserSchema) => {
    setSelectedUser(User);
    setOpenView(true);
  };

  const handleEditClick = (User: UserSchema) => {
    setSelectedUser(User);
    setOpenEdit(true);
  };

  const handleDeleteClick = (User: UserSchema) => {
    setSelectedUser(User);
    setOpenDelete(true);
  };

  const handleAddClick = () => {
    setOpenAdd(true);
  };

  const handleAddUser = (User: UserRequest) => {
    setNewUser(User);
    setOpenConfirmAdd(true);
  };

  const handleConfirmAddUser = () => {

    if (newUser) {
      api.post(`/users/register`, newUser)
        .then(() => {
          toast.success('User ajouté avec succès');

          api.get(`/users`)
            .then(response => {
              setRows(response.data);
            })
        })
    }
    setOpenConfirmAdd(false);
    setNewUser(null);
  };

  const handleChangePasswordRequest = () => {
    setOpenEdit(false)
    SetOpenChangePassword(true)
  };


  const handleCloseChangePassword = () => {
    SetOpenChangePassword(false)
    setOpenEdit(true)
  };

  const handleChangePassword = (passwordInfo: PasswordInfo) => {



    api.post(`/users/change-password-by-admin`, {
      username: selectedUser?.username,
      password: passwordInfo.password
    })
      .then(() => {
        SetOpenChangePassword(false)
        toast.success("Password changed Successfully")

      })
  }



  const handleConfirmDelete = () => {
    if (selectedUser) {
      api.delete(`/users/${selectedUser.username}`)
        .then(() => {
          setRows(rows.filter(row => row.username !== selectedUser.username));
          toast.success('User supprimé avec succès');
        })
    }
    setOpenDelete(false);
    setSelectedUser(null);
  };

  const handleSaveUser = (User: UserRequest) => {
    api.put(`/users/${User.username}`, User)
      .then(response => {
        setRows(rows.map(row => row.username === User.username ? response.data : row));
        toast.success('User modifié avec succès');
      })
  };


  function switchUserStatus(user: UserSchema): void {

    api.put(`/users/${user.username}/change-etat`)
      .then(() => {
        const isActif = !user.isActif;
        setRows(rows.map(row =>
          row.username === user.username ? { ...row, isActif } : row
        ));

        const message = isActif
          ? `L'utilisateur ${user.username} a été activé avec succès.`
          : `L'utilisateur ${user.username} a été désactivé avec succès.`;

        toast.success(message);
      })

  }


  const columns: GridColDef[] = [
    { field: 'username', headerName: 'Username', width: 130 },
    { field: 'firstname', headerName: 'Firstname', width: 130 },
    { field: 'lastname', headerName: 'Lastname', width: 130 },

    {
      field: 'role', headerName: 'Role', width: 170,
      renderCell: (params: GridRenderCellParams) => {
        const user = params.row as UserSchema;
        return (
          <>
            {user.role.name}
          </>
        );
      }
    },
    {
      field: "isActif",
      headerName: "Etat",
      width: 120,
      renderCell: (params: GridRenderCellParams) => {
        const user = params.row as UserSchema;

        return (

          <IconButton color={params.row.isActif ? "success" : "error"} onClick={() => switchUserStatus(params.row as UserSchema)} disabled={user.username == username}>
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
          <IconButton color="info" onClick={() => handleViewClick(params.row as UserSchema)}>
            <Visibility />
          </IconButton>
          <IconButton color="warning" onClick={() => handleEditClick(params.row as UserSchema)}>
            <Edit />
          </IconButton>
          <IconButton color="error" onClick={() => handleDeleteClick(params.row as UserSchema)}>
            <Delete />
          </IconButton>

        </>
      ),
    },
  ];

  return (
    <Box>
      <h3>Gestion des Utilisateurs</h3>
      <Box style={{ display: 'flex', justifyContent: 'end', marginBottom: '10px' }}>
        <Button variant="contained" color="primary" onClick={handleAddClick}>Ajouter Utilisateurs</Button>
      </Box>
      <DataGrid
        rows={rows}
        columns={columns}
        pagination
        style={{ minHeight: '50vh' }}
        getRowId={(row: UserSchema) => row.username}
      />
      {selectedUser &&
        <>
          <ViewUser
            open={openView}
            onClose={() => setOpenView(false)}
            data={selectedUser}
          />
          <EditUser
            open={openEdit}
            onClose={() => setOpenEdit(false)}
            data={{ ...selectedUser, role: selectedUser.role.name }}
            roles={roles}
            onSave={handleSaveUser}
            changePasswordRequest={handleChangePasswordRequest}
          />
          <ConfirmDelete
            open={openDelete}
            onClose={() => setOpenDelete(false)}
            onConfirm={handleConfirmDelete}
            data={selectedUser?.username!}
          />




        </>}

      <AddUser
        open={openAdd}
        onClose={() => setOpenAdd(false)}
        roles={roles}
        onAdd={handleAddUser}
      />
      <ConfirmAddUser
        open={openConfirmAdd}
        onClose={() => setOpenConfirmAdd(false)}
        data={newUser}
        onConfirm={handleConfirmAddUser}
      />
      <ChangePassword
        open={openChangePassword}
        onClose={handleCloseChangePassword}
        data={selectedUser}
        onSave={handleChangePassword}

      />

    </Box>
  );
};

export default User;
