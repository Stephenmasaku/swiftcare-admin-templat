import React, { useState } from "react";
import { Link, useLocation } from 'react-router-dom';
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Box,
  Typography,
} from "@mui/material";
import {
  LocalHospital,
  Group,
  Hotel,
  LocalPharmacy,
  Science,
  MedicalServices,
  TheaterComedy,
  Bloodtype,
  AccountTree,
  AttachMoney,
  LocalShipping,
  EventNote,
  PeopleAlt,
  Message,
  Download,
  Inventory2,
} from "@mui/icons-material";


const Sidebar = () => {

 const location = useLocation();
  // Helper function to determine if path is active
  const isActive = (path) => location.pathname === path;
  
  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        width: 260,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: 260,
          boxSizing: "border-box",
          backgroundColor: "#d32f2f", // red-dark
          color: "white",
        },
      }}
    >
      <Toolbar />
      <Box  sx={{
    height: "100%",
    overflowY: "hidden",
    "&:hover": {
      overflowY: "auto",
    },
    "&::-webkit-scrollbar": {
      width: "6px",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "rgba(255, 255, 255, 0.3)",
      borderRadius: "3px",
    },
    "&::-webkit-scrollbar-track": {
      background: "transparent",
    },
  }}>
      <List>
      <Typography variant="subtitle2" px={2} pt={1} gutterBottom sx={{ color: 'white' }}>
        HOSPITAL MENU
      </Typography>

      <ListItemButton
        component={Link}
        to="/front-office"
        selected={isActive('/front-office')}
        sx={{
          color: 'white',
          '&.Mui-selected': {
            backgroundColor: '#1abc9c',
            '& .MuiListItemIcon-root': { color: 'white' },
            color: 'white',
          },
        }}
      >
        <ListItemIcon><LocalHospital sx={{ color: 'white' }} /></ListItemIcon>
        <ListItemText primary="Front Office" />
      </ListItemButton>

      <ListItemButton
        component={Link}
        to="/opd"
        selected={isActive('/opd')}
        sx={{
          color: 'white',
          '&.Mui-selected': {
            backgroundColor: '#1abc9c',
            '& .MuiListItemIcon-root': { color: 'white' },
            color: 'white',
          },
        }}
      >
        <ListItemIcon><Group sx={{ color: 'white' }} /></ListItemIcon>
        <ListItemText primary="OPD - Out Patient" />
      </ListItemButton>

      <ListItemButton
        component={Link}
        to="/ipd"
        selected={isActive('/ipd')}
        sx={{
          color: 'white',
          '&.Mui-selected': {
            backgroundColor: '#1abc9c',
            '& .MuiListItemIcon-root': { color: 'white' },
            color: 'white',
          },
        }}
      >
        <ListItemIcon><Hotel sx={{ color: 'white' }} /></ListItemIcon>
        <ListItemText primary="IPD - In Patient" />
      </ListItemButton>

      <ListItemButton
        component={Link}
        to="/pharmacy"
        selected={isActive('/pharmacy')}
        sx={{
          color: 'white',
          '&.Mui-selected': {
            backgroundColor: '#1abc9c',
            '& .MuiListItemIcon-root': { color: 'white' },
            color: 'white',
          },
        }}
      >
        <ListItemIcon><LocalPharmacy sx={{ color: 'white' }} /></ListItemIcon>
        <ListItemText primary="Pharmacy" />
      </ListItemButton>

      <ListItemButton
        component={Link}
        to="/pathology"
        selected={isActive('/pathology')}
        sx={{
          color: 'white',
          '&.Mui-selected': {
            backgroundColor: '#1abc9c',
            '& .MuiListItemIcon-root': { color: 'white' },
            color: 'white',
          },
        }}
      >
        <ListItemIcon><Science sx={{ color: 'white' }} /></ListItemIcon>
        <ListItemText primary="Pathology" />
      </ListItemButton>

      <ListItemButton
        component={Link}
        to="/radiology"
        selected={isActive('/radiology')}
        sx={{
          color: 'white',
          '&.Mui-selected': {
            backgroundColor: '#1abc9c',
            '& .MuiListItemIcon-root': { color: 'white' },
            color: 'white',
          },
        }}
      >
        <ListItemIcon><MedicalServices sx={{ color: 'white' }} /></ListItemIcon>
        <ListItemText primary="Radiology" />
      </ListItemButton>

      <ListItemButton
        component={Link}
        to="/operation-theater"
        selected={isActive('/operation-theater')}
        sx={{
          color: 'white',
          '&.Mui-selected': {
            backgroundColor: '#1abc9c',
            '& .MuiListItemIcon-root': { color: 'white' },
            color: 'white',
          },
        }}
      >
        <ListItemIcon><TheaterComedy sx={{ color: 'white' }} /></ListItemIcon>
        <ListItemText primary="Operation Theatre" />
      </ListItemButton>

      <ListItemButton
        component={Link}
        to="/blood-bank"
        selected={isActive('/blood-bank')}
        sx={{
          color: 'white',
          '&.Mui-selected': {
            backgroundColor: '#1abc9c',
            '& .MuiListItemIcon-root': { color: 'white' },
            color: 'white',
          },
        }}
      >
        <ListItemIcon><Bloodtype sx={{ color: 'white' }} /></ListItemIcon>
        <ListItemText primary="Blood Bank" />
      </ListItemButton>

      <ListItemButton
        component={Link}
        to="/tpa-management"
        selected={isActive('/tpa-management')}
        sx={{
          color: 'white',
          '&.Mui-selected': {
            backgroundColor: '#1abc9c',
            '& .MuiListItemIcon-root': { color: 'white' },
            color: 'white',
          },
        }}
      >
        <ListItemIcon><AccountTree sx={{ color: 'white' }} /></ListItemIcon>
        <ListItemText primary="TPA Management" />
      </ListItemButton>

      <ListItemButton
        component={Link}
        to="/finance"
        selected={isActive('/finance')}
        sx={{
          color: 'white',
          '&.Mui-selected': {
            backgroundColor: '#1abc9c',
            '& .MuiListItemIcon-root': { color: 'white' },
            color: 'white',
          },
        }}
      >
        <ListItemIcon><AttachMoney sx={{ color: 'white' }} /></ListItemIcon>
        <ListItemText primary="Finance" />
      </ListItemButton>

      <ListItemButton
        component={Link}
        to="/ambulance"
        selected={isActive('/ambulance')}
        sx={{
          color: 'white',
          '&.Mui-selected': {
            backgroundColor: '#1abc9c',
            '& .MuiListItemIcon-root': { color: 'white' },
            color: 'white',
          },
        }}
      >
        <ListItemIcon><LocalShipping sx={{ color: 'white' }} /></ListItemIcon>
        <ListItemText primary="Ambulance" />
      </ListItemButton>

      <ListItemButton
        component={Link}
        to="/birth-death-records"
        selected={isActive('/birth-death-records')}
        sx={{
          color: 'white',
          '&.Mui-selected': {
            backgroundColor: '#1abc9c',
            '& .MuiListItemIcon-root': { color: 'white' },
            color: 'white',
          },
        }}
      >
        <ListItemIcon><EventNote sx={{ color: 'white' }} /></ListItemIcon>
        <ListItemText primary="Birth & Death Record" />
      </ListItemButton>

      <ListItemButton
        component={Link}
        to="/hr"
        selected={isActive('/hr')}
        sx={{
          color: 'white',
          '&.Mui-selected': {
            backgroundColor: '#1abc9c',
            '& .MuiListItemIcon-root': { color: 'white' },
            color: 'white',
          },
        }}
      >
        <ListItemIcon><PeopleAlt sx={{ color: 'white' }} /></ListItemIcon>
        <ListItemText primary="Human Resource" />
      </ListItemButton>

      <ListItemButton
        component={Link}
        to="/messages"
        selected={isActive('/messages')}
        sx={{
          color: 'white',
          '&.Mui-selected': {
            backgroundColor: '#1abc9c',
            '& .MuiListItemIcon-root': { color: 'white' },
            color: 'white',
          },
        }}
      >
        <ListItemIcon><Message sx={{ color: 'white' }} /></ListItemIcon>
        <ListItemText primary="Messaging" />
      </ListItemButton>

      <ListItemButton
        component={Link}
        to="/download-center"
        selected={isActive('/download-center')}
        sx={{
          color: 'white',
          '&.Mui-selected': {
            backgroundColor: '#1abc9c',
            '& .MuiListItemIcon-root': { color: 'white' },
            color: 'white',
          },
        }}
      >
        <ListItemIcon><Download sx={{ color: 'white' }} /></ListItemIcon>
        <ListItemText primary="Download Center" />
      </ListItemButton>

      <ListItemButton
        component={Link}
        to="/inventory"
        selected={isActive('/inventory')}
        sx={{
          color: 'white',
          '&.Mui-selected': {
            backgroundColor: '#1abc9c',
            '& .MuiListItemIcon-root': { color: 'white' },
            color: 'white',
          },
        }}
      >
        <ListItemIcon><Inventory2 sx={{ color: 'white' }} /></ListItemIcon>
        <ListItemText primary="Inventory" />
      </ListItemButton>
    </List>  
      </Box>
    </Drawer>
  );
};

export default Sidebar;
