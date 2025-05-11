import React, { useState } from 'react';
import { TextField, Button, Checkbox, FormControlLabel, Grid, Typography, Link as MuiLink } from '@mui/material';
import { Link } from 'react-router-dom';
import AuthLayout from '../../layouts/auth/AuthLayout';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    remember: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login form submitted:', formData);
    // TODO: Add real login logic
  };

  return (
    <AuthLayout>
      <form onSubmit={handleSubmit}>
        <Typography variant="h6" align="center" sx={{
                 textAlign: 'center',
          fontSize: '0.875rem',
          color: '#2b579a', 
        }} gutterBottom>
          Login to Your Account
        </Typography>

        <TextField
          fullWidth
          margin="normal"
          label="Username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Enter your username"
          required
        />

        <TextField
          fullWidth
          margin="normal"
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter your password"
          required
        />

        <Grid container alignItems="center" justifyContent="space-between" sx={{ my: 1 }}>
          <Grid item>
            <FormControlLabel
              control={
                <Checkbox
                  name="remember"
                  checked={formData.remember}
                  onChange={handleChange}
                  color="primary"
                />
              }
              label="Remember Me"
            />
          </Grid>
          <Grid item>
            <MuiLink component={Link} to="/forgot-password" underline="hover">
              Forgot Password?
            </MuiLink>
          </Grid>
        </Grid>

        <Button
          fullWidth
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
        >
          Login
        </Button>
      </form>
    </AuthLayout>
  );
};

export default Login;
