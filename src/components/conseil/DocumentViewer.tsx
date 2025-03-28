import { useState, useEffect } from "react";
import { Box, IconButton, Paper, Typography, Tooltip } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import { useParams } from "react-router-dom";
import { api } from "../../config/config";
import { Document } from "../../config/types";

const DocumentViewer = () => {
  const { documentId } = useParams();
  const [data, setData] = useState<Document | null>(null);

  useEffect(() => {
    if (documentId) fetchData(documentId);
  }, [documentId]);

  const fetchData = async (id: string) => {
    try {
      const { data } = await api.get(`/documents/${id}`);
      setData(data);

      console.log(data)
    } catch (error) {
      console.error("Erreur de chargement du document", error);
    }
  };

  const handleDownload = async (url: string) => {
    try {
      const fileName = url.substring(url.lastIndexOf('/') + 1);
      const response = await fetch(url);
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.setAttribute('download', fileName || 'document');
      document.body.appendChild(link);
      link.click();
      link.parentNode?.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error("Erreur lors du téléchargement", error);
    }
  };

  return (
    <Box sx={{ mx: 0, textAlign: "center", direction: "rtl" }}>
      {data ? (
        <Paper sx={{ p: 3, boxShadow: 3, textAlign: "center" }}>
          <div style={{ display: "flex", width: "100%" }}>
            <div style={{
              flex: 1,
              padding: "10px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              minWidth: 0 // Important pour que textOverflow fonctionne avec flex
            }}>
              <Tooltip title={data.name} arrow>
                <Typography variant="h6" noWrap>
                  {data.name}
                </Typography>
              </Tooltip>
            </div>

            <div style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "10px",
              flexShrink: 0
            }}>
              <IconButton
                onClick={() => handleDownload(data.url)}
                color="primary"
                title="Télécharger"
              >
                <DownloadIcon />
              </IconButton>
            </div>
          </div>

          <iframe
            src={data.url}
            width="100%"
            height="600px"
            style={{ border: "none", marginTop: "10px" }}
          />
        </Paper>
      ) : (
        <Typography variant="body1" color="textSecondary">جاري تحميل الوثيقة...</Typography>
      )}
    </Box>
  );
};

export default DocumentViewer;