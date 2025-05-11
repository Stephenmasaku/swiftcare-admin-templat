import React, { useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  TextField,
  CircularProgress,
  Typography,
} from '@mui/material';
import KeyIcon from '@mui/icons-material/VpnKey';
import AuthLayout from '../../layouts/auth/AuthLayout';

const OTP = () => {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);

  const handleVerify = (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate OTP verification API call
    setTimeout(() => {
      setLoading(false);
      alert(`OTP verified: ${otp}`);
    }, 1500);
  };

  return (
    <AuthLayout>
      <Box
        component="form"
        onSubmit={handleVerify}
        sx={{
          width: '100%',
          maxWidth: 350,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ bgcolor: 'primary.main', mb: 2, width: 56, height: 56 }}>
          <KeyIcon />
        </Avatar>
        <Typography sx={{ mb: 1.5, fontWeight: 600, fontSize: '1.25rem', color: '#323130' }}>
          Enter OTP
        </Typography>
        <TextField
          fullWidth
          type="text"
          label="6-digit OTP"
          variant="outlined"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
          inputProps={{ maxLength: 6 }}
          sx={{ mb: 2 }}
        />
        <Button
          fullWidth
          type="submit"
          variant="contained"
          disabled={loading}
          sx={{ textTransform: 'none' }}
        >
          {loading ? <CircularProgress size={24} /> : 'Verify'}
        </Button>
      </Box>
    </AuthLayout>
  );
};

export default OTP;
