import React, { useState } from 'react';
import { useEventPlateId, usePlateEditorRef } from '@platejs/react';
import Papa from 'papaparse';
import {
  Button,
  Typography,
  Box,
  CircularProgress,
  Alert,
  Snackbar,
  Divider
} from '@mui/material';
import { UploadFile, TableChart } from '@mui/icons-material';

export const CSVImporter = ({ setCsvData }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [fileName, setFileName] = useState('');
  
  const editor = usePlateEditorRef(useEventPlateId());

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setFileName(file.name);
    setIsLoading(true);
    setError(null);

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        if (results.errors.length) {
          setError(`Error parsing CSV: ${results.errors[0].message}`);
          setIsLoading(false);
          return;
        }

        // Set the CSV data for display in the table
        setCsvData(results);
        setIsLoading(false);
        setSuccess(true);
      },
      error: (error) => {
        setError(`Error parsing CSV: ${error.message}`);
        setIsLoading(false);
      }
    });
  };

  const insertTableFromCSV = () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.csv';
    fileInput.onchange = handleFileUpload;
    fileInput.click();
  };

  const handleCloseSnackbar = () => {
    setSuccess(false);
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Import CSV Data
      </Typography>
      <Typography variant="body2" color="text.secondary" paragraph>
        Import a CSV file to create a table in your document or view the data below.
      </Typography>
      
      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
        <Button
          variant="contained"
          startIcon={<UploadFile />}
          onClick={insertTableFromCSV}
          disabled={isLoading}
        >
          {isLoading ? 'Uploading...' : 'Upload CSV'}
        </Button>
        
        <Button
          variant="outlined"
          startIcon={<TableChart />}
          disabled={!fileName || isLoading}
          onClick={() => {
            if (editor && setCsvData) {
              // Insert table at current selection
              editor.insertCSVTable();
            }
          }}
        >
          Insert as Table
        </Button>
        
        {isLoading && <CircularProgress size={24} />}
        {fileName && !isLoading && (
          <Typography variant="body2" color="text.secondary">
            File: {fileName}
          </Typography>
        )}
      </Box>
      
      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}
      
      <Snackbar
        open={success}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="success">
          CSV file imported successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};