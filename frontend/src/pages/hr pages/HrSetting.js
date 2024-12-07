import React, { useEffect, useState } from 'react';
import { Container, Typography, Table, TableBody, TableCell, TableHead, TableRow, Box } from '@mui/material';
import axios from 'axios';
import Navbar from '../../components/hr components/HrNavbar';
import Sidebar from '../../components/hr components/HrSidebar';

const HRFormData = () => {
  const [hrData, setHrData] = useState([]);

  // Fetch data from the backend
  const fetchHRData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/hrform/fetch'); // Adjust the endpoint as needed
      setHrData(response.data);
    } catch (error) {
      console.error('Error fetching HRForm data:', error.message);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchHRData();
  }, []);

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1 }}>
        <Navbar />
        <Container sx={{ mt: 4 }}>
          <Typography variant="h4" align="center" gutterBottom>
            Submitted HR Form Data
          </Typography>
          <Box sx={{ overflowX: 'auto', mt: 2 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><strong>Website URL</strong></TableCell>
                  <TableCell><strong>Employee Count</strong></TableCell>
                  <TableCell><strong>CV Files</strong></TableCell>
                  <TableCell><strong>Date Submitted</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {hrData.map((form, index) => (
                  <TableRow key={index}>
                    <TableCell>{form.websiteUrl}</TableCell>
                    <TableCell>{form.employeeCount}</TableCell>
                    <TableCell>
                      {form.cvFiles &&
                        form.cvFiles.map((file, idx) => {
                          const fileName = file.split('\\').pop(); // Extract the filename
                          return (
                            <div key={idx}>
                              {/* View Button */}
                              <a 
                                href={`http://localhost:5000/uploads/${fileName}`} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                style={{ textDecoration: 'none', color: '#007bff', marginRight: '10px' }}
                              >
                                View
                              </a>
                              {/* Download Button */}
                              <a 
                                href={`http://localhost:5000/uploads/${fileName}`} 
                                download
                                style={{ textDecoration: 'none', color: '#28a745' }}
                              >
                                Download
                              </a>
                            </div>
                          );
                        })}
                    </TableCell>
                    <TableCell>{new Date(form.createdAt).toLocaleString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </Container>
      </Box>
    </div>
  );
};

export default HRFormData;
