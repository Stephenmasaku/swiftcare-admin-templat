import React from 'react';
import { Box, Card, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import backgroundImage from '../../assets/images/auth-bg.jpg';
import logo from '../../assets/images/logo.png';
import '../../assets/css/AuthLayout.css';

const AuthLayout = ({ children }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100%',
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center', // Center horizontally
        overflowX: 'hidden',
        boxSizing: 'border-box',
        px: 2,
        py: 4,
      }}
    >
      <Card
        elevation={3}
        sx={{
          width: '100%',
          maxWidth: '400px',
          p: 4,
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          overflow: 'hidden',
        }}
      >
        <Box sx={{ mb: 3, width: '100%', textAlign: 'center' }}>
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

        {children}
      </Card>

      {/* Footer */}
      <Box
        sx={{
          mt: 4,
          width: '100%',
          textAlign: 'center',
          fontSize: '0.8rem',
          color: '#2b579a', // Office 365 blue
        }}
      >
        © {new Date().getFullYear()} Swift Escrow Enterprises. All rights reserved.
      </Box>
    </Box>
  );
};

export default AuthLayout;
