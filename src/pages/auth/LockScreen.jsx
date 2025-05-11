import React, { useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  TextField,
  CircularProgress,
} from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import AuthLayout from '../../layouts/auth/AuthLayout';

const LockScreen = () => {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleUnlock = (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      alert('Unlocked successfully!');
    }, 1500);
  };

  return (
    <AuthLayout>
      <Box
        component="form"
        onSubmit={handleUnlock}
        sx={{
          width: '100%',
          maxWidth: 350,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ bgcolor: 'primary.main', mb: 2, width: 56, height: 56 }}>
          <LockIcon />
        </Avatar>
        <Box sx={{ mb: 1.5, fontWeight: 600, fontSize: '1.25rem', color: '#323130' }}>
          John Doe
        </Box>
        <TextField
          fullWidth
          type="password"
          label="Enter your password"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Button
          fullWidth
          type="submit"
          variant="contained"
          disabled={loading}
          sx={{ textTransform: 'none' }}
        >
          {loading ? <CircularProgress size={24} /> : 'Unlock'}
        </Button>
      </Box>
    </AuthLayout>
  );
};

export default LockScreen;
