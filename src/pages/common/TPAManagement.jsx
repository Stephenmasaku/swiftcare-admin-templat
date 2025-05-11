import React, { useState, useMemo } from 'react';
import Layout from '../../components/layout/Layout';
import {
  Box,
  Typography,
  Grid,
  Card,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  TextField,
  Chip,
  useTheme,
} from '@mui/material';

// Sample TPA data
const tpaData = [
  { id: 1, name: 'MediCare TPA', contactPerson: 'John Smith', contactEmail: 'john.smith@medicare.com', status: 'active', validThru: '2025-12-31' },
  { id: 2, name: 'HealthSecure', contactPerson: 'Emily Davis', contactEmail: 'emily.davis@healthsecure.com', status: 'pending', validThru: '2024-03-31' },
  { id: 3, name: 'WellCare', contactPerson: 'Michael Lee', contactEmail: 'michael.lee@wellcare.com', status: 'expired', validThru: '2023-06-30' },
  { id: 4, name: 'CarePlus', contactPerson: 'Sarah Johnson', contactEmail: 'sarah.johnson@careplus.com', status: 'active', validThru: '2025-05-15' },
  { id: 5, name: 'AssureHealth', contactPerson: 'David Brown', contactEmail: 'david.brown@assurehealth.com', status: 'pending', validThru: '2024-11-20' },
  { id: 6, name: 'PrimeHealth TPA', contactPerson: 'Linda Garcia', contactEmail: 'linda.garcia@primehealth.com', status: 'active', validThru: '2026-01-15' },
];

// Helper component for status chips
const StatusChip = ({ status }) => {
  const colorMap = {
    active: 'success',
    pending: 'warning',
    expired: 'error',
  };
  const label = status.charAt(0).toUpperCase() + status.slice(1);
  return <Chip label={label} color={colorMap[status] || 'default'} size="small" />;
};

export default function DashboardMain({ children }) {
  const theme = useTheme();


  const [searchQuery, setSearchQuery] = useState('');

  // Filter TPA records by name or contact person or email or status
  const filteredTPAs = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return tpaData;
    return tpaData.filter(({ name, contactPerson, contactEmail, status }) =>
      name.toLowerCase().includes(q) ||
      contactPerson.toLowerCase().includes(q) ||
      contactEmail.toLowerCase().includes(q) ||
      status.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  // Summary counts
  const totalTPA = tpaData.length;
  const activeCount = tpaData.filter((tpa) => tpa.status === 'active').length;
  const pendingCount = tpaData.filter((tpa) => tpa.status === 'pending').length;

  return (
   <Layout>
    <Box sx={{ p: 3, maxWidth: 1000, mx: 'auto', fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif' }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ color: '#1b5e20' }}>
        TPA Management
      </Typography>
      <Typography variant="subtitle1" gutterBottom sx={{ color: '#555', mb: 4 }}>
        Manage Third Party Administrator contacts, contracts, and approvals.
      </Typography>

      {/* Summary cards */}
      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid item size={{ xs: 6, sm :6, md: 4 , lg:4}}>
          <Card elevation={3} sx={{ bgcolor: '#4caf50', color: 'white', py: 2, textAlign: 'center' }}>
            <Typography variant="h6">Total TPAs</Typography>
            <Typography variant="h4" fontWeight="bold">{totalTPA}</Typography>
          </Card>
        </Grid>
        <Grid item size={{ xs: 6, sm :6, md: 4 , lg:4}}>
          <Card elevation={3} sx={{ bgcolor: '#81c784', color: 'black', py: 2, textAlign: 'center' }}>
            <Typography variant="h6">Active Contracts</Typography>
            <Typography variant="h4" fontWeight="bold">{activeCount}</Typography>
          </Card>
        </Grid>
        <Grid item size={{ xs: 6, sm :6, md: 4 , lg:4}}>
          <Card elevation={3} sx={{ bgcolor: '#ffb300', color: 'black', py: 2, textAlign: 'center' }}>
            <Typography variant="h6">Pending Approvals</Typography>
            <Typography variant="h4" fontWeight="bold">{pendingCount}</Typography>
          </Card>
        </Grid>
      </Grid>

      {/* Search input */}
      <Box sx={{ mb: 3, maxWidth: 500 }}>
        <TextField
          variant="outlined"
          size="small"
          label="Search TPAs by name, contact, email or status"
          fullWidth
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search..."
        />
      </Box>

      {/* TPA Table */}
      <TableContainer component={Paper} elevation={3}>
        <Table>
          <TableHead sx={{ bgcolor: theme.palette.grey[200] }}>
            <TableRow>
              <TableCell><strong>TPA Name</strong></TableCell>
              <TableCell><strong>Contact Person</strong></TableCell>
              <TableCell><strong>Contact Email</strong></TableCell>
              <TableCell><strong>Contract Status</strong></TableCell>
              <TableCell><strong>Valid Through</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredTPAs.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center" sx={{ py: 4, fontStyle: 'italic', color: '#999' }}>
                  No TPAs found.
                </TableCell>
              </TableRow>
            ) : (
              filteredTPAs.map(({ id, name, contactPerson, contactEmail, status, validThru }) => (
                <TableRow key={id} hover>
                  <TableCell>{name}</TableCell>
                  <TableCell>{contactPerson}</TableCell>
                  <TableCell>{contactEmail}</TableCell>
                  <TableCell><StatusChip status={status} /></TableCell>
                  <TableCell>{validThru}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
     </Layout>
  );
}
