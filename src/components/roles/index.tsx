import React, { useState, useEffect } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Grid,
} from "@mui/material";

import { Role, Permission } from "../../config/types";
import { api } from "../../config/config";
import { toast } from "react-toastify";
import ConfirmDeleteRole from "./ConfirmDeleteRole";
import ConfirmRetirer from "./ConfirmRetirer";

const RoleManagement = () => {
    const [roles, setRoles] = useState<Role[]>([]);
    const [selectedRole, setSelectedRole] = useState<string | null>(null);

    const [selectedPermission, setSelectedPermission] = useState<Permission | null>(null);

    const [permissions, setPermissions] = useState<Permission[]>([]);

    const [allPermissions, setAllPermissions] = useState<Permission[]>([]);
    const [open, setOpen] = useState(false);

    const [openDelete, setOpenDelete] = useState(false);

    const [openRetirer, setOpenRetirer] = useState(false);

    const [newRole, setNewRole] = useState("");
    const [newPermission, setNewPermission] = useState<Partial<Permission>>({});

    useEffect(() => {
        fetchRoles();
        fetchAllPermissions();
    }, []);

    const fetchRoles = async () => {
        const response = await api.get("/roles");
        setRoles(response.data as Role[]);



    };



    const handleChangeNewPermission = (key: 'name' | 'path', value: string) => {
        setNewPermission({
            ...newPermission,
            [key]: value
        })
    }



    const fetchAllPermissions = async () => {
        const response = await api.get("/roles/permissions");
        setAllPermissions(response.data as Permission[]);
    };




    const handleAddPermission = async (e: React.FormEvent) => {
        e.preventDefault();
        // newPermission : {name:"string",path:"string"}


        if (newPermission) {
            api.post(`/roles/permissions/add`, newPermission).then(
                response => {
                    setAllPermissions(prev => [...prev, response.data as Permission]);
                    setNewPermission({
                        name: '',
                        path: ''
                    });
                    toast.success('Permission ajoutée avec succès!')
                });


        }
    };

    const handleRemoveAddPermission = async (permission: Permission) => {
        // Ajouter la permission

        if (selectedRole) {


            if (!permissions.some(p => p.name === permission.name)) {
                await api.post(`/roles/${selectedRole}/permissions/add`, permission.id,
                    { headers: { "Content-Type": "application/json" } }
                );
                // Après l'ajout, mettre à jour la liste des permissions localement
                setPermissions(prev => [...prev, { ...permission }]);  // Assurez-vous d'ajouter un path valide si nécessaire

                setRoles(prev => prev.map(role => {
                    if (role.name === selectedRole) {
                        return {
                            ...role,
                            permissions: [...role.permissions, { ...permission }]
                        };
                    }
                    return role;
                }));
            }
            // Retirer la permission
            else {
                //confirmation

                setSelectedPermission(permission);
                setOpenRetirer(true)

            }


        } else {
            toast.error("une Erreur Innatendue! Contacter votre administrateur")
        }
    };


    const handleCreateRole = async () => {
        if (newRole) {
            await api.post("/roles/add", newRole);
            setNewRole("");
            fetchRoles();
        }
    };

    const handleDeleteRole = async (roleName: string) => {

        setOpenDelete(true)
        setSelectedRole(roleName)



    };


    const confirmDelete = () => {
        setOpenDelete(false)
        api.delete(`/roles/${selectedRole}`).then(() => {
            setSelectedRole(null);

            setRoles(prev => prev.filter(role => role.name != selectedRole))
        });


    }



    const confirmRetirer = () => {

        setOpenRetirer(false)

        api.post(`/roles/${selectedRole}/permissions/remove`, selectedPermission?.id,
            { headers: { "Content-Type": "application/json" } }
        ).then(response => {

            toast.success("Accées Retirer avec succées")



            setPermissions(prev => prev.filter(p => p.id !== selectedPermission?.id));

            setRoles(prev => prev.map(role => {
                if (role.name === selectedRole) {
                    return {
                        ...role,
                        permissions: role.permissions.filter(p => p.id !== selectedPermission?.id)
                    };
                }
                return role;
            }));


        });



    }








    const handlePermissions = (role: Role) => {

        setPermissions(role.permissions)

        setSelectedRole(role.name)


        setOpen(true)

    }

    return (
        <div>
            <h2>Gestion des Rôles</h2>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Rôle</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {roles.map((role) => (
                            <TableRow key={role.name}>
                                <TableCell>{role.name}</TableCell>
                                <TableCell>
                                    <Button onClick={() => handlePermissions(role)}>Gérer Permissions</Button>
                                    <Button onClick={() => handleDeleteRole(role.name)} color="error" disabled={role.name === "ADMIN"}>
                                        Supprimer
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <TextField
                label="Nouveau Rôle"
                value={newRole}
                onChange={(e) => setNewRole(e.target.value)}
                fullWidth
                margin="normal"
            />
            <Button
                onClick={handleCreateRole}
                disabled={!newRole}
                variant="contained"
                color="primary"
            >
                Créer Rôle
            </Button>

            {selectedRole &&

                <ConfirmDeleteRole
                    role={selectedRole}
                    open={openDelete}
                    onClose={() => setOpenDelete(false)}

                    onConfirm={confirmDelete}

                />

            }


            <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
                <DialogTitle>Permissions pour Rôle {selectedRole}</DialogTitle>
                <DialogContent>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow >
                                    <TableCell sx={{ fontWeight: 'bold' }}>Permission</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Path</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {allPermissions.map((permission, index) => (
                                    <TableRow key={permission.name} sx={{ backgroundColor: index % 2 === 0 ? "#eee" : "#fff" }}>
                                        <TableCell>{permission.name}</TableCell>
                                        <TableCell>{permission.path}</TableCell>
                                        <TableCell>
                                            <Button
                                                onClick={() => handleRemoveAddPermission(permission)}
                                                color={permissions.some(p => p.name === permission.name) ? "error" : "primary"}
                                                disabled={selectedRole === 'ADMIN' && permissions.some(p => p.name === permission.name)}
                                            >
                                                {permissions.some(p => p.name === permission.name) ? "Retirer" : "Ajouter"}
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>





                    {(selectedRole && selectedPermission) &&

                        <ConfirmRetirer
                            role={selectedRole}
                            open={openRetirer}
                            onClose={() => setOpenRetirer(false)}
                            permission={selectedPermission}
                            onConfirm={confirmRetirer}

                        />

                    }

                    <form onSubmit={handleAddPermission}>
                        <Grid container spacing={2}>

                            <Grid item xs={6}>
                                <TextField
                                    label="Nom de la permission"
                                    value={newPermission.name}

                                    onChange={e => handleChangeNewPermission("name", e.target.value)}
                                    fullWidth
                                    margin="normal"
                                    variant="outlined"
                                    required
                                />
                            </Grid>

                            <Grid item xs={6}>
                                <TextField
                                    label="Path de la permission"
                                    value={newPermission.path}
                                    onChange={e => handleChangeNewPermission("path", e.target.value)}
                                    fullWidth
                                    margin="normal"
                                    variant="outlined"
                                    required
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                    type='submit'
                                >
                                    Créer la Permission
                                </Button>
                            </Grid>

                        </Grid>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)} color="secondary">
                        Fermer
                    </Button>
                </DialogActions>
            </Dialog>

        </div>
    );
};

export default RoleManagement;
