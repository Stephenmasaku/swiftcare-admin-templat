import React, { useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  TextField,
  CircularProgress,
  Typography,
} from '@mui/material';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import AuthLayout from '../../layouts/auth/AuthLayout';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleResetRequest = (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      alert(`Reset link sent to ${email}`);
    }, 1500);
  };

  return (
    <AuthLayout>
      <Box
        component="form"
        onSubmit={handleResetRequest}
        sx={{
          width: '100%',
          maxWidth: 350,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ bgcolor: 'primary.main', mb: 2, width: 56, height: 56 }}>
          <MailOutlineIcon />
        </Avatar>
        <Typography sx={{ mb: 1.5, fontWeight: 600, fontSize: '1.25rem', color: '#323130' }}>
          Forgot Password
        </Typography>
        <TextField
          fullWidth
          type="email"
          label="Enter your email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          sx={{ mb: 2 }}
        />
        <Button
          fullWidth
          type="submit"
          variant="contained"
          disabled={loading}
          sx={{ textTransform: 'none' }}
        >
          {loading ? <CircularProgress size={24} /> : 'Send Reset Link'}
        </Button>
      </Box>
    </AuthLayout>
  );
};

export default ForgotPassword;
