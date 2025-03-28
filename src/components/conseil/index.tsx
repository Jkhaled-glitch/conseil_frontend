import { useState, useEffect } from "react";
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Pagination, IconButton } from "@mui/material";
import axios from "axios";
import { Visibility } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { Conseil } from "../../config/types";
import { api } from "../../config/config";



const ConseilList = () => {
  const [conseils, setConseils] = useState<Conseil[]>([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const size = 10;

  const navigate = useNavigate();

  useEffect(() => {
    fetchConseils();
  }, [page,size]);

  const fetchConseils = async () => {
    try {
      const response = await api.get("/conseils", {
        params: {
          page: page , 
          size
        }
      });
      setConseils(response.data.content);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Erreur lors du chargement des conseils", error);
    }
  };

  return (
    <Box p={3} sx={{ maxWidth: 900, mx: "auto", textAlign: "right", direction: "rtl" }}>
      <Typography variant="h4" gutterBottom sx={{ marginBottom: 2 }}>
        قائمة المجالس الإدارية
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="right" sx={{ fontWeight: 'bold', padding: '16px' }}>المجلس</TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold', padding: '16px' }}>تاريخ الإنعقاد</TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold', padding: '16px' }}>تاريخ المصادقة</TableCell>
             
              <TableCell align="right" sx={{ fontWeight: 'bold', padding: '16px' }}>الإجراء</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {conseils.map((conseil) => (
              <TableRow key={conseil.id} hover onClick={() => navigate(`/conseil/${conseil.id}`)}>
                <TableCell align="right" sx={{ padding: '16px' }}>{conseil.nom}</TableCell>
                <TableCell align="right" sx={{ padding: '16px' }}>{conseil.dreunion}</TableCell>
                <TableCell align="right" sx={{ padding: '16px' }}>{conseil.daccord}</TableCell>
                <TableCell align="right" sx={{ padding: '16px' }}>
                  <IconButton color="primary" aria-label="voir" onClick={() => navigate(`/conseil/${conseil.id}`)}>
                    <Visibility />
                  </IconButton>
                </TableCell>
                
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box display="flex" justifyContent="center" mt={2}>
        <Pagination
          count={totalPages}
          page={page+ 1 }
          onChange={(e, value) => setPage(value -1)}
          color="primary"
        />
      </Box>
    </Box>
  );
};

export default ConseilList;
