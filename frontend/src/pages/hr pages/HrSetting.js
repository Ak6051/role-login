import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from '@mui/material';
import { Download, Visibility } from '@mui/icons-material';
import axios from 'axios';
import Navbar from '../../components/hr components/HrNavbar';
import Sidebar from '../../components/hr components/HrSidebar';

const HrSettings = () => {
  const [hrForms, setHrForms] = useState([]);

  // Fetch HR Forms from the Backend
  const fetchHRForms = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/hrform/fetch');
      setHrForms(response.data);
    } catch (error) {
      console.error('Failed to fetch HR forms:', error);
    }
  };

  // Handle Download
  const handleDownload = (filePath) => {
    const fileName = filePath.split('/').pop();
    const link = document.createElement('a');
    link.href = `http://localhost:5000/${filePath}`;
    link.download = fileName;
    link.click();
  };

  useEffect(() => {
    fetchHRForms();
  }, []);

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
    <Sidebar />
    <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
      <Navbar />
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        HR Form Submissions
      </Typography>
      {hrForms.length === 0 ? (
        <Typography align="center" color="textSecondary">
          No data available.
        </Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Website URL</TableCell>
                <TableCell align="center">Employee Count</TableCell>
                <TableCell>CV Files</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {hrForms.map((form) => (
                <TableRow key={form._id}>
                  <TableCell>{form.websiteUrl}</TableCell>
                  <TableCell align="center">{form.employeeCount}</TableCell>
                  <TableCell>
                    {form.cvFiles.map((file, index) => (
                      <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: 4 }}>
                        <Button
                          variant="outlined"
                          size="small"
                          color="primary"
                          startIcon={<Visibility />}
                          href={`http://localhost:5000/${file.path}`}
                          target="_blank"
                          style={{ marginRight: 8 }}
                        >
                          View
                        </Button>
                        <Button
                          variant="contained"
                          size="small"
                          color="secondary"
                          startIcon={<Download />}
                          onClick={() => handleDownload(file.path)}
                        >
                          Download
                        </Button>
                      </div>
                    ))}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
    </Box>
    </div>
  );
};

export default HrSettings;
