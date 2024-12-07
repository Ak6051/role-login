import React, { useState } from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Collapse,
  Box,
  Typography,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import ApartmentIcon from '@mui/icons-material/Apartment';
import BusinessIcon from '@mui/icons-material/Business';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { useNavigate } from 'react-router-dom';

const UserSidebar = () => {
  const navigate = useNavigate();
  const [departmentOpen, setDepartmentOpen] = useState(false);

  const handleDepartmentClick = () => {
    setDepartmentOpen(!departmentOpen);
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 240,
          boxSizing: 'border-box',
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          p: 2,
        }}
      >
        <img
          src="mascot.png"
          alt="Company Logo"
          style={{ width: '180px', height: '80px', marginBottom: '8px' }}
        />
        <Typography variant="h6">SA TECH</Typography>
      </Box>

      <List>
        {/* Dashboard Link */}
        <ListItem button onClick={() => navigate('/user-dashboard')}>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>

        {/* Settings Link */}
        <ListItem button onClick={() => navigate('/user-settings')}>
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItem>

        {/* Department with Dropdown
        // <ListItem button onClick={handleDepartmentClick}>
        //   <ListItemIcon>
        //     <ApartmentIcon />
        //   </ListItemIcon>
        //   <ListItemText primary="Department" />
        //   {departmentOpen ? <ExpandLess /> : <ExpandMore />}
        // </ListItem>
        // <Collapse in={departmentOpen} timeout="auto" unmountOnExit>
        //   <List component="div" disablePadding>
        //     <ListItem button sx={{ pl: 4 }} onClick={() => navigate('/sales-report')}>
        //       <ListItemIcon>
        //         <BusinessIcon />
        //       </ListItemIcon>
        //       <ListItemText primary="Sales Report" />
        //     </ListItem>
        //   </List>
        // </Collapse> */}
      </List>
    </Drawer>
  );
};

export default UserSidebar;
