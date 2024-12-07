import React, { useEffect, useState } from 'react';
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
import Person4Icon from '@mui/icons-material/Person4';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Sidebar = () => {
  const navigate = useNavigate();
  const [departmentOpen, setDepartmentOpen] = useState(false);
  const [settings, setSettings] = useState({ logoUrl: '', companyName: '' }); // Default initialization

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
      {/* Company Logo and Name */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          p: 2,
        }}
      >
        <img
          src={settings.logoUrl || 'mascot.png'} // Fallback to a default image if logoUrl is not set
          alt="Company Logo"
          style={{ width: '180px', height: '80px', marginBottom: '8px' }}
        />
        <Typography variant="h6">
          {settings.companyName || 'SA TECH'}
        </Typography>{' '}
        {/* Fallback company name */}
      </Box>

      <List>
        {/* Dashboard Link */}
        <ListItem button onClick={() => navigate('/Hr-dashboard')}>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button onClick={() => navigate('/Hr-assign')}>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Job Openning Report" />
        </ListItem>

        {/* Settings Link */}
        <ListItem button onClick={() => navigate('/hr-settings')}>
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItem>

        {/* Department with Dropdown */}
        <ListItem button onClick={handleDepartmentClick}>
          <ListItemIcon>
            <ApartmentIcon />
          </ListItemIcon>
          <ListItemText primary="Department" />
          {departmentOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={departmentOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button sx={{ pl: 4 }} onClick={() => navigate('/hr')}>
              <ListItemIcon>
                <PersonAddAlt1Icon />
              </ListItemIcon>
              <ListItemText primary="HR Form" />
            </ListItem>
          </List>
          <List component="div" disablePadding>
            <ListItem
              button
              sx={{ pl: 4 }}
              onClick={() => navigate('/employee-form')}
            >
              <ListItemIcon>
                <Person4Icon />
              </ListItemIcon>
              <ListItemText primary="Employee Form" />
            </ListItem>
          </List>
          <List component="div" disablePadding>
            <ListItem
              button
              sx={{ pl: 4 }}
              onClick={() => navigate('/employee-data')}
            >
              <ListItemIcon>
                <Person4Icon />
              </ListItemIcon>
              <ListItemText primary="Employee Report" />
            </ListItem>
          </List>
        </Collapse>
      </List>
    </Drawer>
  );
};

export default Sidebar;
