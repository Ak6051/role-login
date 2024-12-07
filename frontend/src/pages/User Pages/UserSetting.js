import React from 'react';
import { Typography, Container, Box } from '@mui/material';

import UserNavbar from './../../components/User Components/UserNavbar';
import UserSidebar from './../../components/User Components/UserSidebar';

const UserSettingsPage = () => {
  return (
    <div style={{ display: 'flex' }}>
      <UserSidebar />
      <Box sx={{ flexGrow: 1 }}>
        <UserNavbar />
        <Container maxWidth="md" sx={{ mt: 4 }}>
          <Typography variant="h4">Settings</Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            This is the Settings page.
          </Typography>
        </Container>
      </Box>
    </div>
  );
};

export default UserSettingsPage;
