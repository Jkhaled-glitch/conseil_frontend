import React, { useState, useEffect, } from 'react';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { Box, IconButton, Card, CardContent, TextField, Button, Grid } from '@mui/material';
import { Visibility } from '@mui/icons-material';

import { Historique } from '../../config/types';
import { api } from '../../config/config';
import View from './View';
import { format,isValid,addDays} from 'date-fns';


const App: React.FC = () => {
  const [rows, setRows] = useState<Historique[]>([]);
  const [openView, setOpenView] = useState(false);
  const [selected, setSelected] = useState<Historique | null>(null);

  const [filterUsername, setFilterUsername] = useState<string>('');
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  useEffect(() => {
    api.get(`/historique`)
    .then(response => {
      setRows(response.data);
    })
    .catch(error => {
      
    });
  }, []);



  const handleViewClick = (historique: Historique) => {
    setSelected(historique);
    setOpenView(true);
  };

  const getActionCardColor = (action: string) => {
    switch (action) {
      case 'CREATE':
        return '#4CAF50'; // Green
      case 'UPDATE':
        return '#FFC107'; // Orange
      case 'DELETE':
        return '#F44336'; // Red
      default:
        return '#9E9E9E'; // Grey
    }
  };

  const formatDate = (date: Date) => {
    return format(new Date(date), 'dd-MM-yyyy HH:mm');
  };

  const customFilterByDate = (params: { value: any }) => {
    const createdAt = new Date(params.value);

    if (startDate && !endDate) {
      return createdAt >= startDate;
    }

    if (startDate && endDate) {
      return createdAt >= startDate && createdAt < addDays(endDate, 1);
    }

    if (!startDate && endDate) {
      return createdAt < addDays(endDate, 1);
    }

    return true;
  };

  const handleStartDateChange = (date: string) => {
    const parsedDate = new Date(date);
    setStartDate(isValid(parsedDate) ? parsedDate : null);
  };

  const handleEndDateChange = (date: string) => {
    const parsedDate = new Date(date);
    setEndDate(isValid(parsedDate) ? parsedDate : null);
  };

  const handleClearFilters = () => {
    setFilterUsername('');
    setStartDate(null);
    setEndDate(null);
  };

  const columns: GridColDef[] = [
    {
      field: 'action',
      headerName: 'Action',
      width: 200,
      renderCell: (params: GridRenderCellParams) => (
        <Card sx={{
          backgroundColor: getActionCardColor(params.value.toString()),
          marginTop: '10px',
          maxHeight: '60%',
          maxWidth: "80%",
        }}>
          <CardContent sx={{ margin: "-25px 25px 20px 1px" }}>{params.value}</CardContent>
        </Card>
      ),
    },
    {
      field: 'createdBy.username',
      headerName: 'Username',
      width: 150,
      renderCell: (params: GridRenderCellParams) => params.row.createdBy.username,
      disableColumnMenu: true,
      filterable: false,
    },
    { field: 'entity', headerName: 'Entity', width: 150 },

    { field: 'reference', headerName: 'Reference', width: 150 },

    
    {
      field: 'createdAt',
      headerName: 'Date',
      width: 250,
      renderCell: (params: GridRenderCellParams) => formatDate(params.value as Date),
      filterable: true,
      disableColumnMenu: true,
    },
    {
      field: 'actions',
      headerName: 'Operations',
      width: 150,
      disableColumnMenu: true,
      filterable: false,
      renderCell: (params: GridRenderCellParams) => (
        <>
          <IconButton color="info" onClick={() => handleViewClick(params.row as Historique)}>
            <Visibility />
          </IconButton>
        </>
      ),
    },
  ];

  const filteredRows = rows.filter(row => {
    const matchesUsername = row.createdBy.username.toLowerCase().includes(filterUsername.toLowerCase());
    return matchesUsername && customFilterByDate({ value: row.createdAt });
  });

  return (
    <Box>
      <h3>Historiques</h3>
      <Box style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
        <TextField
          label="Filtrer par username"
          variant="outlined"
          size="small"
          value={filterUsername}
          onChange={(e) => setFilterUsername(e.target.value)}
        />
        <Grid container spacing={2}>
          <Grid item>
            <TextField
              label="Date de début"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={startDate ? format(startDate, 'yyyy-MM-dd') : ''}
              onChange={(e) => handleStartDateChange(e.target.value)}
              variant="outlined"
              size="small"
              style={{ width: 170 }}
            />
          </Grid>
          <Grid item>
            <TextField
              label="Date de fin"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={endDate ? format(endDate, 'yyyy-MM-dd') : ''}
              onChange={(e) => handleEndDateChange(e.target.value)}
              variant="outlined"
              size="small"
              style={{ width: 170 }}
            />
          </Grid>
          <Grid item>
            <Button variant="outlined" onClick={handleClearFilters}>Effacer les filtres</Button>
          </Grid>
        </Grid>
      </Box>

      <DataGrid
        rows={filteredRows}
        columns={columns}
        pagination
        style={{ minHeight: '50vh' }}
      />

      <View
        open={openView}
        onClose={() => setOpenView(false)}
        historique={selected}
      />
    </Box>
  );
};

export default App;
