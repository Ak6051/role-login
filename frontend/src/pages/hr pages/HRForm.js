
// import React, { useState } from 'react';
// import {
//   TextField,
//   Button,
//   Typography,
//   Box,
//   Grid,
//   InputAdornment,
//   Container,
// } from '@mui/material';
// import { Search, CloudUpload, Language } from '@mui/icons-material'; // Import icons
// import Navbar from '../../components/hr components/HrNavbar';
// import Sidebar from '../../components/hr components/HrSidebar';
// import axios from 'axios';


// const HRForm = () => {
//   const [employeeCount, setEmployeeCount] = useState(0);
//   const [cvFiles, setCvFiles] = useState([]);

//   const handleEmployeeCountChange = (event) => {
//     const count = parseInt(event.target.value, 10);
//     if (count >= 0 && !isNaN(count)) {
//       setEmployeeCount(count);
//       setCvFiles(Array(count).fill(null));
//     } else {
//       setEmployeeCount(0);
//       setCvFiles([]);
//     }
//   };

//   const handleCvChange = (index, event) => {
//     const files = [...cvFiles];
//     files[index] = event.target.files[0];
//     setCvFiles(files);
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     const formData = new FormData();
//     formData.append('websiteUrl', event.target.websiteUrl.value);
//     formData.append('employeeCount', employeeCount);
  
//     cvFiles.forEach((file, index) => {
//       if (file) {
//         formData.append('cvFiles', file);
//       }
//     });
  
//     try {
//       const response = await axios.post('http://localhost:5000/api/hrform/submit', formData, {
//         headers: { 'Content-Type': 'multipart/form-data' },
//       });
//       console.log(response.data.message);
//     } catch (error) {
//       console.error('Error submitting form:', error.response?.data?.error || error.message);
//     }
//   };

//   return (
//     <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
//       <Sidebar />
//       <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
//         <Navbar />

//         <Container
//           sx={{
//             p: 3,
//             maxWidth: 400, // Reduced width
//             mx: 'auto',
//             mt: '25px',
//             height: 'calc(100vh - 64px)',
//             display: 'flex',
//             flexDirection: 'column',
//             boxShadow: 3,
//             borderRadius: 2,
//             backgroundColor: 'white',
//           }}
//         >
//           <Typography variant="h4" align="center" gutterBottom>
//             HR Form
//           </Typography>

//           {/* Website URL Field with Icon */}
//           <TextField
//             fullWidth
//             margin="normal"
//             label="Website URL"
//             name="websiteUrl"
//             variant="outlined"
//             InputProps={{
//               startAdornment: (
//                 <InputAdornment position="start">
//                   <Language />
//                 </InputAdornment>
//               ),
//             }}
//           />

//           {/* Search Employee Field with Icon */}
//           <TextField
//             fullWidth
//             margin="normal"
//             type="number"
//             label="Search Employee"
//             value={employeeCount}
//             onChange={handleEmployeeCountChange}
//             variant="outlined"
//             InputProps={{
//               startAdornment: (
//                 <InputAdornment position="start">
//                   <Search />
//                 </InputAdornment>
//               ),
//             }}
//           />
          
//           <Box
//             mt={2}
//             sx={{ flexGrow: 1, overflowY: 'auto', maxHeight: '300px' }}
//           >
//             {' '}
//             {/* Set a fixed height and scroll */}
//             <Typography variant="subtitle1">Upload CVs</Typography>
//             <Grid container spacing={2}>
//               {cvFiles.map((_, index) => (
//                 <Grid item xs={12} key={index}>
//                   <TextField
//                     fullWidth
//                     type="file"
//                     inputProps={{ accept: '.pdf,.doc,.docx' }}
//                     onChange={(e) => handleCvChange(index, e)}
//                     variant="outlined"
//                     InputProps={{
//                       endAdornment: (
//                         <InputAdornment position="end">
//                           <CloudUpload />
//                         </InputAdornment>
//                       ),
//                     }}
//                   />
//                 </Grid>
//               ))}
//             </Grid>
//           </Box>

//           {/* Submit Button with Icon */}
//           <Button
//             type="submit"
//             variant="contained"
//             color="primary"
//             fullWidth
//             startIcon={<CloudUpload />} // Button icon
//             sx={{ mt: 3 }}
//           >
//             Submit
//           </Button>
//         </Container>
//       </Box>
//     </div>
//   );
// };

// export default HRForm;
import React, { useState } from 'react';
import {
  TextField,
  Button,
  Typography,
  Box,
  Grid,
  InputAdornment,
  Container,
} from '@mui/material';
import { Search, CloudUpload, Language } from '@mui/icons-material';
import Navbar from '../../components/hr components/HrNavbar';
import Sidebar from '../../components/hr components/HrSidebar';
import axios from 'axios';

const HRForm = () => {
  const [employeeCount, setEmployeeCount] = useState(0);
  const [cvFiles, setCvFiles] = useState([]);

  const handleEmployeeCountChange = (event) => {
    const count = parseInt(event.target.value, 10);
    if (count >= 0 && !isNaN(count)) {
      setEmployeeCount(count);
      setCvFiles(Array(count).fill(null));
    } else {
      setEmployeeCount(0);
      setCvFiles([]);
    }
  };

  const handleCvChange = (index, event) => {
    const files = [...cvFiles];
    files[index] = event.target.files[0];
    setCvFiles(files);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('websiteUrl', event.target.websiteUrl.value);
    formData.append('employeeCount', employeeCount);

    cvFiles.forEach((file) => {
      if (file) {
        formData.append('cvFiles', file);
      }
    });

    try {
      const response = await axios.post('http://localhost:5000/api/hrform/submit', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      // Display success alert
      alert('Form submitted successfully!');

      // Optionally, clear the form fields
      setEmployeeCount(0);
      setCvFiles([]);
    } catch (error) {
      console.error('Error submitting form:', error.response?.data?.error || error.message);
      alert('Failed to submit the form. Please try again!');
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Navbar />
        <Container
          component="form"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          sx={{
            p: 3,
            maxWidth: 400,
            mx: 'auto',
            mt: '25px',
            height: 'calc(100vh - 64px)',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: 3,
            borderRadius: 2,
            backgroundColor: 'white',
          }}
        >
          <Typography variant="h4" align="center" gutterBottom>
            HR Form
          </Typography>

          {/* Website URL Field */}
          <TextField
            fullWidth
            margin="normal"
            label="Website URL"
            name="websiteUrl"
            variant="outlined"
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Language />
                </InputAdornment>
              ),
            }}
          />

          {/* Employee Count Field */}
          <TextField
            fullWidth
            margin="normal"
            type="number"
            label="Number of Employees"
            value={employeeCount}
            onChange={handleEmployeeCountChange}
            variant="outlined"
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
          />

          {/* CV Upload Fields */}
          <Box mt={2} sx={{ flexGrow: 1, overflowY: 'auto', maxHeight: '300px' }}>
            <Typography variant="subtitle1">Upload CVs</Typography>
            <Grid container spacing={2}>
              {cvFiles.map((_, index) => (
                <Grid item xs={12} key={index}>
                  <TextField
                    fullWidth
                    type="file"
                    inputProps={{ accept: '.pdf,.doc,.docx' }}
                    onChange={(e) => handleCvChange(index, e)}
                    variant="outlined"
                    required
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <CloudUpload />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* Submit Button */}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            startIcon={<CloudUpload />}
            sx={{ mt: 3 }}
          >
            Submit
          </Button>
        </Container>
      </Box>
    </div>
  );
};

export default HRForm;
