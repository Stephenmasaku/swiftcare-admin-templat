import React, { useState, useMemo } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  TextField,
  Chip,
  useTheme,
} from '@mui/material';
import Layout from '../../components/layout/Layout';
// Sample ambulance data
const ambulanceData = [
  { id: 1, vehicleNumber: 'AMB-101', driver: 'John Doe', status: 'available', lastServiceDate: '2025-04-15' },
  { id: 2, vehicleNumber: 'AMB-102', driver: 'Jane Smith', status: 'on trip', lastServiceDate: '2025-02-20' },
  { id: 3, vehicleNumber: 'AMB-103', driver: 'Mike Johnson', status: 'available', lastServiceDate: '2025-03-10' },
  { id: 4, vehicleNumber: 'AMB-104', driver: 'Linda Williams', status: 'maintenance', lastServiceDate: '2025-01-30' },
  { id: 5, vehicleNumber: 'AMB-105', driver: 'Chris Evans', status: 'on trip', lastServiceDate: '2025-04-01' },
  { id: 6, vehicleNumber: 'AMB-106', driver: 'Patricia Brown', status: 'available', lastServiceDate: '2025-04-10' },
];

// Status chip component
const StatusChip = ({ status }) => {
  const statusColors = {
    available: 'success',
    'on trip': 'warning',
    maintenance: 'error',
  };
  const displayText = status.charAt(0).toUpperCase() + status.slice(1);
  return <Chip label={displayText} color={statusColors[status] || 'default'} size="small" />;
};

export default function DashboardMain({ children }) {
  const theme = useTheme();



  const [searchQuery, setSearchQuery] = useState('');

  // Filter ambulances by vehicle number or driver name or status
  const filteredAmbulances = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return ambulanceData;
    return ambulanceData.filter(({ vehicleNumber, driver, status }) =>
      vehicleNumber.toLowerCase().includes(q) ||
      driver.toLowerCase().includes(q) ||
      status.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  // Summary data
  const totalAmbulances = ambulanceData.length;
  const availableCount = ambulanceData.filter(a => a.status === 'available').length;
  const onTripCount = ambulanceData.filter(a => a.status === 'on trip').length;

  return (
   <Layout>
    <Box sx={{ p: 3, maxWidth: 1000, mx: 'auto', fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif' }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ color: '#004d40' }}>
        Ambulance Management
      </Typography>
      <Typography variant="subtitle1" gutterBottom sx={{ color: '#555', mb: 4 }}>
        Track and manage hospital ambulance fleet availability and status.
      </Typography>

      {/* Summary Cards */}
      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid item size={{xs:12, sm:12, md:4,lg:4}}>
          <Card elevation={3} sx={{ bgcolor: '#00695c', color: 'white', py: 2, textAlign: 'center' }}>
            <Typography variant="h6">Total Ambulances</Typography>
            <Typography variant="h4" fontWeight="bold">{totalAmbulances}</Typography>
          </Card>
        </Grid>
        <Grid item size={{xs:12, sm:12, md:4,lg:4}}>
          <Card elevation={3} sx={{ bgcolor: '#2e7d32', color: 'white', py: 2, textAlign: 'center' }}>
            <Typography variant="h6">Available</Typography>
            <Typography variant="h4" fontWeight="bold">{availableCount}</Typography>
          </Card>
        </Grid>
        <Grid item size={{xs:12, sm:12, md:4,lg:4}}>
          <Card elevation={3} sx={{ bgcolor: '#f9a825', color: 'black', py: 2, textAlign: 'center' }}>
            <Typography variant="h6">On Trip</Typography>
            <Typography variant="h4" fontWeight="bold">{onTripCount}</Typography>
          </Card>
        </Grid>
      </Grid>

      {/* Search Input */}
      <Box sx={{ mb: 3, maxWidth: 400 }}>
        <TextField
          fullWidth
          label="Search by vehicle, driver or status"
          variant="outlined"
          size="small"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="e.g. AMB-101, John Doe, available"
        />
      </Box>

      {/* Ambulance Table */}
      <TableContainer component={Paper} elevation={3}>
        <Table>
          <TableHead sx={{ bgcolor: theme.palette.grey[200] }}>
            <TableRow>
              <TableCell><strong>Vehicle Number</strong></TableCell>
              <TableCell><strong>Driver Name</strong></TableCell>
              <TableCell align="center"><strong>Status</strong></TableCell>
              <TableCell align="center"><strong>Last Service Date</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredAmbulances.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} align="center" sx={{ py: 4, fontStyle: 'italic', color: '#999' }}>
                  No ambulances found.
                </TableCell>
              </TableRow>
            ) : (
              filteredAmbulances.map(({ id, vehicleNumber, driver, status, lastServiceDate }) => (
                <TableRow key={id} hover>
                  <TableCell>{vehicleNumber}</TableCell>
                  <TableCell>{driver}</TableCell>
                  <TableCell align="center"><StatusChip status={status} /></TableCell>
                  <TableCell align="center">{lastServiceDate}</TableCell>
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
