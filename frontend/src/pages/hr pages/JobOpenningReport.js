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
} from '@mui/material';
import axios from 'axios';

const JobOpenningReport = () => {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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
            Job openning 
          </Typography>
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
        </Container>
      </Box>
    </Box>
  );
};

export default JobOpenningReport;

