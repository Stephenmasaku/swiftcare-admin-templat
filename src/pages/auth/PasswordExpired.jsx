import React, { useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  TextField,
  CircularProgress,
  Typography,
} from '@mui/material';
import LockResetIcon from '@mui/icons-material/LockReset';
import AuthLayout from '../../layouts/auth/AuthLayout';

const PasswordExpired = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleResetPassword = (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    setLoading(true);

    // Simulate password reset
    setTimeout(() => {
      setLoading(false);
      alert('Password reset successfully!');
    }, 1500);
  };

  return (
    <AuthLayout>
      <Box
        component="form"
        onSubmit={handleResetPassword}
        sx={{
          width: '100%',
          maxWidth: 350,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ bgcolor: 'primary.main', mb: 2, width: 56, height: 56 }}>
          <LockResetIcon />
        </Avatar>
        <Typography sx={{ mb: 1.5, fontWeight: 600, fontSize: '1.25rem', color: '#323130' }}>
          Password Expired
        </Typography>
        <TextField
          fullWidth
          type="password"
          label="New Password"
          variant="outlined"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          type="password"
          label="Confirm Password"
          variant="outlined"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
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
          {loading ? <CircularProgress size={24} /> : 'Reset Password'}
        </Button>
      </Box>
    </AuthLayout>
  );
};

export default PasswordExpired;
