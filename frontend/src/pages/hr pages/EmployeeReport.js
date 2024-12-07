// import React, { useState, useEffect } from 'react';
// import { DataGrid, GridToolbar } from '@mui/x-data-grid';
// import { format } from 'date-fns';
// import { Box, Grid, Typography, Toolbar, Button } from '@mui/material';
// import { useSnackbar } from 'notistack';
// import Navbar from '../../components/hr components/HrNavbar';
// import Sidebar from '../../components/hr components/HrSidebar';

// const EmployeeReport = () => {
//   const [employees, setEmployees] = useState([]);
//   const { enqueueSnackbar } = useSnackbar();

//   useEffect(() => {
//     // Fetch the data from the API
//     const fetchEmployees = async () => {
//       try {
//         const response = await fetch(
//           'http://localhost:5000/api/form/employees-data'
//         );
//         const data = await response.json();

//         // Add an 'id' field to each row using '_id' as the unique identifier
//         const employeesWithId = data.map((employee) => ({
//           ...employee,
//           id: employee._id, // Use '_id' from MongoDB as the unique 'id'
//         }));

//         setEmployees(employeesWithId);
//       } catch (error) {
//         enqueueSnackbar('Error fetching employees', { variant: 'error' });
//       }
//     };

//     fetchEmployees();
//   }, [enqueueSnackbar]);

//   // Column definitions for DataGrid

//   const columns = [
//     { field: 'id', headerName: 'ID', width: 100 },
//     { field: 'name', headerName: 'Name', width: 180 },
//     { field: 'fathersName', headerName: "Father's Name", width: 180 },
//     { field: 'occupation', headerName: 'Occupation', width: 150 },
//     { field: 'permanentAddress', headerName: 'Permanent Address', width: 250 },
//     {
//       field: 'correspondentAddress',
//       headerName: 'Correspondent Address',
//       width: 250,
//     },
//     { field: 'contactNo', headerName: 'Contact No.', width: 180 },
//     { field: 'education', headerName: 'Education', width: 150 },
//     { field: 'boardUniversity', headerName: 'Board/University', width: 200 },
//     { field: 'year', headerName: 'Year', width: 120 },
//     { field: 'percentage', headerName: 'Percentage', width: 120 },
//     { field: 'height', headerName: 'Height', width: 120 },
//     { field: 'weight', headerName: 'Weight', width: 120 },
//     {
//       field: 'birthDate',
//       headerName: 'Birth Date',
//       width: 150,
//       type: 'date',
//       valueGetter: (params) => {
//         const row = params.row;
//         if (row && row.birthDate) {
//           // If birthDate exists and is a valid date string, convert it to Date object
//           const date = new Date(row.birthDate);
//           return date instanceof Date && !isNaN(date) ? date : null; // Return valid date or null
//         } else {
//           return null; // Return null if birthDate is missing or invalid
//         }
//       },
//       renderCell: (params) => {
//         // If birthDate exists, format it, otherwise return an empty string or custom message
//         if (params.value) {
//           return format(new Date(params.value), 'MM/dd/yyyy'); // Use date-fns to format the date
//         }
//         return ''; // Return empty string if date is null or invalid
//       },
//     },
//     { field: 'age', headerName: 'Age', width: 100 },
//     { field: 'bloodGroup', headerName: 'Blood Group', width: 120 },
//     { field: 'identityCard', headerName: 'Identity Card', width: 180 },
//     { field: 'companyName', headerName: 'Company Name', width: 180 },
//     { field: 'designation', headerName: 'Designation', width: 180 },
//     { field: 'companyMobileNo', headerName: 'Company Mobile No.', width: 180 },
//     { field: 'salary', headerName: 'Salary', width: 120 },
//     { field: 'willingToWork', headerName: 'Willing to Work', width: 150 },
//     {
//       field: 'preferredLocation',
//       headerName: 'Preferred Location',
//       width: 180,
//     },
//     {
//       field: 'preferredDesignation',
//       headerName: 'Preferred Designation',
//       width: 180,
//     },
//     { field: 'expectedSalary', headerName: 'Expected Salary', width: 180 },
//     { field: 'photo', headerName: 'Photo', width: 180 },
//     { field: 'signature', headerName: 'Signature', width: 180 },
//   ];

//   return (
//     <div style={{ display: 'flex' }}>
//       <Sidebar />
//       <Box sx={{ flexGrow: 1 }}>
//         <Navbar />
//         <Box sx={{ height: 600, width: '100%' }}>
//           <Typography variant="h6" gutterBottom>
//             Employee List
//           </Typography>
//           <Toolbar>
//             <Button variant="contained" color="primary">
//               Add Employee
//             </Button>
//           </Toolbar>
//           <div style={{ height: 600, width: '100%' }}>
//             <DataGrid
//               rows={employees}
//               columns={columns}
//               components={{
//                 Toolbar: GridToolbar,
//               }}
//               pageSize={5}
//               rowsPerPageOptions={[5]}
//               checkboxSelection
//               disableSelectionOnClick
//               getRowId={(row) => row._id} // Use '_id' for row id
//             />
//           </div>
//         </Box>
//       </Box>
//     </div>
//   );
// };

// export default EmployeeReport;

import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Avatar,
  Divider,
} from '@mui/material';
import { useSnackbar } from 'notistack';
import Navbar from '../../components/hr components/HrNavbar';
import Sidebar from '../../components/hr components/HrSidebar';

const EmployeeReport = () => {
  const [employees, setEmployees] = useState([]);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch(
          'http://localhost:5000/api/form/employees-data' // Replace with your API endpoint
        );
        const data = await response.json();

        setEmployees(data);
      } catch (error) {
        enqueueSnackbar('Error fetching employees', { variant: 'error' });
      }
    };

    fetchEmployees();
  }, [enqueueSnackbar]);

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1 }}>
        <Navbar />
        <Box sx={{ p: 2 }}>
          <Typography variant="h4" gutterBottom>
            Employee Report
          </Typography>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
              gap: 2,
            }}
          >
            {employees.map((employee) => (
              <Card
                key={employee._id}
                sx={{
                  p: 2,
                  boxShadow: 3,
                  borderRadius: 2,
                  backgroundColor: '#f9f9f9',
                }}
              >
                <CardContent>
                  <Grid container spacing={2}>
                    <Grid item xs={3}>
                      <Avatar
                        alt={employee.name}
                        src={employee.photo || ''}
                        sx={{ width: 70, height: 70 }}
                      />
                    </Grid>
                    <Grid item xs={9}>
                      <Typography variant="h6">
                        {employee.name || 'N/A'}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        <strong>Father's Name:</strong>{' '}
                        {employee.fathersName || 'N/A'}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        <strong>Designation:</strong>{' '}
                        {employee.designation || 'N/A'}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        <strong>Company:</strong>{' '}
                        {employee.companyName || 'N/A'}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Divider sx={{ my: 2 }} />
                  <Grid container spacing={1}>
                    <Grid item xs={6}>
                      <Typography variant="body2">
                        <strong>Contact:</strong> {employee.contactNo || 'N/A'}
                      </Typography>
                      <Typography variant="body2">
                        <strong>Address:</strong>{' '}
                        {employee.permanentAddress || 'N/A'}
                      </Typography>
                      <Typography variant="body2">
                        <strong>Correspondent Address:</strong>{' '}
                        {employee.correspondentAddress || 'N/A'}
                      </Typography>
                      <Typography variant="body2">
                        <strong>Education:</strong>{' '}
                        {employee.education || 'N/A'}
                      </Typography>
                      <Typography variant="body2">
                        <strong>Board:</strong>{' '}
                        {employee.boardUniversity || 'N/A'}
                      </Typography>
                      <Typography variant="body2">
                        <strong>Year:</strong> {employee.year || 'N/A'}
                      </Typography>
                      <Typography variant="body2">
                        <strong>Percentage:</strong>{' '}
                        {employee.percentage || 'N/A'}
                      </Typography>
                      <Typography variant="body2">
                        <strong>Age:</strong> {employee.age || 'N/A'}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2">
                        <strong>Identity Card:</strong>{' '}
                        {employee.identityCard || 'N/A'}
                      </Typography>
                      <Typography variant="body2">
                        <strong>Salary:</strong> {employee.salary || 'N/A'}
                      </Typography>
                      <Typography variant="body2">
                        <strong>Height:</strong> {employee.height || 'N/A'}
                      </Typography>
                      <Typography variant="body2">
                        <strong>Weight:</strong> {employee.weight || 'N/A'}
                      </Typography>
                      <Typography variant="body2">
                        <strong>Blood Group:</strong>{' '}
                        {employee.bloodGroup || 'N/A'}
                      </Typography>
                      <Typography variant="body2">
                        <strong>Preferred Location:</strong>{' '}
                        {employee.preferredLocation || 'N/A'}
                      </Typography>
                      <Typography variant="body2">
                        <strong>Expected Salary:</strong>{' '}
                        {employee.expectedSalary || 'N/A'}
                      </Typography>
                      <Typography variant="body2">
                        <strong>Birth Date:</strong>{' '}
                        {new Date(employee.birthDate).toLocaleDateString() ||
                          'N/A'}
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default EmployeeReport;
