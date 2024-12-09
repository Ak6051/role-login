// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Navbar from '../../components/hr components/HrNavbar';
// import Sidebar from '../../components/hr components/HrSidebar';
// import {
//   Container,
//   Typography,
//   Box,
//   Grid,
//   Card,
//   CardContent,
// } from '@mui/material';
// import axios from 'axios';

// const JobOpenningReport = () => {
//   const [sales, setSales] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchAssignedSales = async () => {
//       try {
//         const token = localStorage.getItem('token'); // Token from localStorage

//         if (token) {
//           const response = await axios.get(
//             'http://localhost:5000/api/assignhr',
//             {
//               headers: {
//                 Authorization: `Bearer ${token}`,
//               },
//             }
//           );

//           console.log('Response Data:', response.data); // Console log response to check data structure

//           // Agar response mein data property hai toh uska use karein
//           if (Array.isArray(response.data.data)) {
//             setSales(response.data.data);
//           } else {
//             setSales(response.data); // Fallback in case array is directly in data
//           }
//         } else {
//           console.error('No token found');
//         }

//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching assigned sales:', error);
//         setLoading(false);
//       }
//     };

//     fetchAssignedSales();
//   }, []);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <Box sx={{ display: 'flex' }}>
//       <Sidebar />
//       <Box sx={{ flexGrow: 1 }}>
//         <Navbar />
//         <Container>
//           <Typography variant="h4" gutterBottom>
//             Job openning
//           </Typography>
//           {sales.length === 0 ? (
//             <Typography>No sales assigned</Typography>
//           ) : (
//             <Grid container spacing={3}>
//               {sales.map((sale) => (
//                 <Grid item xs={12} sm={6} md={4} key={sale._id}>
//                   <Card variant="outlined">
//                     <CardContent>
//                       <Typography variant="h6">{sale.companyName}</Typography>
//                       <Typography variant="body2">
//                         Lead By: {sale.LeadBy}
//                       </Typography>
//                       <Typography variant="body2">
//                         Phone: {sale.phoneNumber}
//                       </Typography>
//                       <Typography variant="body2">
//                         Email: {sale.emailId}
//                       </Typography>
//                       <Typography variant="body2">
//                         Address: {sale.address}
//                       </Typography>
//                       <Typography variant="body2">
//                         Website: {sale.websiteUrl}
//                       </Typography>
//                       <Typography variant="body2">
//                         Call Status: {sale.callStatus}
//                       </Typography>
//                       <Typography variant="body2">
//                         Meeting Date:{' '}
//                         {new Date(sale.meetingDate).toLocaleDateString()}
//                       </Typography>
//                       <Typography variant="body2">
//                         Meeting Time: {sale.meetingTime}
//                       </Typography>
//                       <Typography variant="body2">
//                         Contact Person: {sale.contactPerson}
//                       </Typography>
//                       <Typography variant="body2">
//                         Designation: {sale.designation}
//                       </Typography>
//                       <Typography variant="body2">
//                         Description: {sale.description}
//                       </Typography>
//                     </CardContent>
//                   </Card>
//                 </Grid>
//               ))}
//             </Grid>
//           )}
//         </Container>
//       </Box>
//     </Box>
//   );
// };

// export default JobOpenningReport;

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/hr components/HrNavbar';
import Sidebar from '../../components/hr components/HrSidebar';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
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

const JobOpenningReport = () => {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hrForms, setHrForms] = useState([]);
  const navigate = useNavigate();

  // Fetch Assigned Sales
  useEffect(() => {
    const fetchAssignedSales = async () => {
      try {
        const token = localStorage.getItem('token'); // Token from localStorage

        if (token) {
          const response = await axios.get(
            'http://localhost:5000/api/assignhr',
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          console.log('Response Data:', response.data); // Console log response to check data structure

          // Agar response mein data property hai toh uska use karein
          if (Array.isArray(response.data.data)) {
            setSales(response.data.data);
          } else {
            setSales(response.data); // Fallback in case array is directly in data
          }
        } else {
          console.error('No token found');
        }

        setLoading(false);
      } catch (error) {
        console.error('Error fetching assigned sales:', error);
        setLoading(false);
      }
    };

    fetchAssignedSales();
  }, []);

  // Fetch HR Forms
  useEffect(() => {
    const fetchHRForms = async () => {
      try {
        const response = await axios.get(
          'http://localhost:5000/api/hrform/fetch'
        );
        setHrForms(response.data);
      } catch (error) {
        console.error('Failed to fetch HR forms:', error);
      }
    };

    fetchHRForms();
  }, []);

  // const handleDownload = (filePath) => {
  //   const fileName = filePath.split('/').pop();
  //   const link = document.createElement('a');
  //   link.href = `http://localhost:5000/${filePath}`;
  //   link.download = fileName;
  //   link.click();
  // };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1 }}>
        <Navbar />
        <Container>
          <Typography variant="h4" gutterBottom>
            Job Openning Report
          </Typography>

          {/* Sales Section */}
          {sales.length === 0 ? (
            <Typography>No sales assigned</Typography>
          ) : (
            <Grid container spacing={3}>
              {sales.map((sale) => (
                <Grid item xs={12} sm={6} md={4} key={sale._id}>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography variant="h6">{sale.companyName}</Typography>
                      <Typography variant="body2">
                        Lead By: {sale.LeadBy}
                      </Typography>
                      <Typography variant="body2">
                        Phone: {sale.phoneNumber}
                      </Typography>
                      <Typography variant="body2">
                        Email: {sale.emailId}
                      </Typography>
                      <Typography variant="body2">
                        Address: {sale.address}
                      </Typography>
                      <Typography variant="body2">
                        Website: {sale.websiteUrl}
                      </Typography>
                      <Typography variant="body2">
                        Call Status: {sale.callStatus}
                      </Typography>
                      <Typography variant="body2">
                        Meeting Date:{' '}
                        {new Date(sale.meetingDate).toLocaleDateString()}
                      </Typography>
                      <Typography variant="body2">
                        Meeting Time: {sale.meetingTime}
                      </Typography>
                      <Typography variant="body2">
                        Contact Person: {sale.contactPerson}
                      </Typography>
                      <Typography variant="body2">
                        Designation: {sale.designation}
                      </Typography>
                      <Typography variant="body2">
                        Description: {sale.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}

          {/* HR Forms Section */}
          <Typography variant="h4" align="center" gutterBottom sx={{ mt: 4 }}>
            HR Form Submissions
          </Typography>
          {hrForms.length === 0 ? (
            <Typography align="center" color="textSecondary">
              No HR form data available.
            </Typography>
          ) : (
            <TableContainer component={Paper} sx={{ mt: 3 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Company Name</TableCell>
                    <TableCell>Website URL</TableCell>
                    <TableCell align="center">Employee Count</TableCell>
                    <TableCell>CV Files</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {hrForms.map((form) => (
                    <TableRow key={form._id}>
                      <TableCell>{form.companyName}</TableCell>
                      <TableCell>{form.websiteUrl}</TableCell>
                      <TableCell align="center">{form.employeeCount}</TableCell>
                      <TableCell>
                        {form.cvFiles.map((file, index) => (
                          <div
                            key={index}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              marginBottom: 4,
                            }}
                          >
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
                            {/* <Button
                              variant="contained"
                              size="small"
                              color="secondary"
                              startIcon={<Download />}
                              onClick={() => handleDownload(file.path)}
                            >
                              Download
                            </Button> */}
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
    </Box>
  );
};

export default JobOpenningReport;
