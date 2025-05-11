import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  Menu,
  MenuItem,
  Avatar,
  Box,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MailIcon from '@mui/icons-material/Mail';
import LockIcon from '@mui/icons-material/Lock';
import logo from '../../assets/images/logo.png'; // adjust path if needed

export default function TopToolbar({ onSidebarToggle }) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

  // Notification menu
  const [notificationAnchorEl, setNotificationAnchorEl] = React.useState(null);
  const handleNotificationOpen = (e) => setNotificationAnchorEl(e.currentTarget);
  const handleNotificationClose = () => setNotificationAnchorEl(null);

  // Message menu
  const [messageAnchorEl, setMessageAnchorEl] = React.useState(null);
  const handleMessageOpen = (e) => setMessageAnchorEl(e.currentTarget);
  const handleMessageClose = () => setMessageAnchorEl(null);

  // Profile menu
  const [profileAnchorEl, setProfileAnchorEl] = React.useState(null);
  const handleProfileOpen = (e) => setProfileAnchorEl(e.currentTarget);
  const handleProfileClose = () => setProfileAnchorEl(null);

  return (
    <AppBar
      position="fixed"
      elevation={1}
      sx={{
        zIndex: theme.zIndex.drawer + 1,
        backgroundColor: '#ffffff',
        color: '#000000',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        px: 2,
        height: 64,
      }}
    >
      {/* Logo and Menu Icon */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          bgcolor: '#d92550',
          px: 2,
          height: '100%',
          borderTopLeftRadius: 0,
          borderBottomRightRadius: 20,
          pr: 3,
        }}
      >
        {isSmallScreen && (
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={onSidebarToggle}
            sx={{ mr: 1 }}
          >
            <MenuIcon />
          </IconButton>
        )}
        <img
          src={logo}
          alt="Logo"
          style={{
            width: isSmallScreen ? '100px' : '140px',
            maxWidth: '95%',
            objectFit: 'contain',
          }}
        />
      </Box>

      {/* Spacer */}
      <Box sx={{ flexGrow: 1 }} />

      {/* Icons */}
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        {/* Notifications */}
        <IconButton color="inherit" onClick={handleNotificationOpen}>
          <Badge badgeContent={3} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <Menu
          anchorEl={notificationAnchorEl}
          open={Boolean(notificationAnchorEl)}
          onClose={handleNotificationClose}
        >
          <MenuItem onClick={handleNotificationClose}>Emergency alert from ICU</MenuItem>
          <MenuItem onClick={handleNotificationClose}>Pharmacy stock low alert</MenuItem>
          <MenuItem onClick={handleNotificationClose}>New appointment scheduled</MenuItem>
        </Menu>

        {/* Messages */}
        <IconButton color="inherit" onClick={handleMessageOpen}>
          <Badge badgeContent={4} color="primary">
            <MailIcon />
          </Badge>
        </IconButton>
        <Menu
          anchorEl={messageAnchorEl}
          open={Boolean(messageAnchorEl)}
          onClose={handleMessageClose}
        >
          <MenuItem onClick={handleMessageClose}>Dr. Asha: Lab report ready</MenuItem>
          <MenuItem onClick={handleMessageClose}>Admin: Staff meeting at 3 PM</MenuItem>
          <MenuItem onClick={handleMessageClose}>Reception: Walk-in patient update</MenuItem>
        </Menu>

        {/* Profile */}
        <IconButton onClick={handleProfileOpen} sx={{ ml: 2 }}>
          <Avatar sx={{ bgcolor: 'primary.main', width: 40, height: 40 }}>
            <LockIcon />
          </Avatar>
        </IconButton>
        <Menu
          anchorEl={profileAnchorEl}
          open={Boolean(profileAnchorEl)}
          onClose={handleProfileClose}
        >
          <Box sx={{ px: 2, py: 1 }}>
            <Typography variant="subtitle1">Dr. John Doe</Typography>
            <Typography variant="body2" color="text.secondary">
              johndoe@swiftcare.com
            </Typography>
          </Box>
          <MenuItem onClick={handleProfileClose}>Profile</MenuItem>
          <MenuItem onClick={handleProfileClose}>Settings</MenuItem>
          <MenuItem onClick={handleProfileClose}>Sign Out</MenuItem>
        </Menu>
      </Box>
    </AppBar>
  );
}
