import React, { useState, useMemo } from 'react';
import Layout from '../../components/layout/Layout';
import {
  Box,
  Typography,
  Grid,
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Chip,
  useTheme,
} from '@mui/material';

const radiologyScansData = [
  { id: 1, name: 'Chest X-Ray', modality: 'X-Ray', price: 50, turnaround: '2 hrs', status: 'completed' },
  { id: 2, name: 'CT Scan - Head', modality: 'CT', price: 300, turnaround: '6 hrs', status: 'pending' },
  { id: 3, name: 'MRI Brain', modality: 'MRI', price: 600, turnaround: '12 hrs', status: 'pending' },
  { id: 4, name: 'Ultrasound Abdomen', modality: 'Ultrasound', price: 150, turnaround: '4 hrs', status: 'completed' },
  { id: 5, name: 'Mammography', modality: 'X-Ray', price: 100, turnaround: '8 hrs', status: 'completed' },
  { id: 6, name: 'Chest CT', modality: 'CT', price: 320, turnaround: '6 hrs', status: 'completed' },
  { id: 7, name: 'MRI Spine', modality: 'MRI', price: 650, turnaround: '14 hrs', status: 'pending' },
  { id: 8, name: 'Ultrasound Pelvis', modality: 'Ultrasound', price: 130, turnaround: '4 hrs', status: 'completed' },
  { id: 9, name: 'X-Ray Limb', modality: 'X-Ray', price: 60, turnaround: '2 hrs', status: 'completed' },
  { id: 10, name: 'CT Abdomen', modality: 'CT', price: 350, turnaround: '6 hrs', status: 'pending' },
];

// Status Chip styling utility
const StatusChip = ({ status }) => {
  const colorMap = {
    completed: 'success',
    pending: 'warning',
    cancelled: 'default',
  };
  const label = status.charAt(0).toUpperCase() + status.slice(1);
  return <Chip label={label} color={colorMap[status] || 'default'} size="small" />;
};

export default function DashboardMain({ children }) {
  const theme = useTheme();


  const [searchQuery, setSearchQuery] = useState('');

  // Filter scans by name or modality
  const filteredScans = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return radiologyScansData;
    return radiologyScansData.filter(
      (scan) =>
        scan.name.toLowerCase().includes(q) ||
        scan.modality.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  // Summary stats
  const totalScans = radiologyScansData.length;
  const pendingCount = radiologyScansData.filter((scan) => scan.status === 'pending').length;
  const completedCount = radiologyScansData.filter((scan) => scan.status === 'completed').length;

  return (
   <Layout>
    <Box sx={{ p: 3, maxWidth: 1100, mx: 'auto', fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif' }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ color: '#2b3a67' }}>
        Radiology Department
      </Typography>
      <Typography variant="subtitle1" gutterBottom sx={{ color: '#555', mb: 4 }}>
        Manage radiology scans, track report statuses and turnaround times efficiently.
      </Typography>

      {/* Summary Cards */}
      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid item size={{xs:12, sm:12, md:4,lg:4}}>
          <Card elevation={3} sx={{ bgcolor: '#303f9f', color: '#fff', py: 2, textAlign: 'center' }}>
            <Typography variant="h6">Total Scans</Typography>
            <Typography variant="h4" fontWeight="bold">{totalScans}</Typography>
          </Card>
        </Grid>
        <Grid item size={{xs:12, sm:12, md:4,lg:4}}>
          <Card elevation={3} sx={{ bgcolor: '#fbc02d', color: '#000', py: 2, textAlign: 'center' }}>
            <Typography variant="h6">Pending Reports</Typography>
            <Typography variant="h4" fontWeight="bold">{pendingCount}</Typography>
          </Card>
        </Grid>
        <Grid item size={{xs:12, sm:12, md:4,lg:4}}>
          <Card elevation={3} sx={{ bgcolor: '#43a047', color: '#fff', py: 2, textAlign: 'center' }}>
            <Typography variant="h6">Completed Reports</Typography>
            <Typography variant="h4" fontWeight="bold">{completedCount}</Typography>
          </Card>
        </Grid>
      </Grid>

      {/* Search Input */}
      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          label="Search scans by name or modality"
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          size="small"
          sx={{ maxWidth: 400 }}
        />
      </Box>

      {/* Scans Table */}
      <TableContainer component={Paper} elevation={3}>
        <Table>
          <TableHead sx={{ bgcolor: theme.palette.grey[200] }}>
            <TableRow>
              <TableCell><strong>Scan Name</strong></TableCell>
              <TableCell><strong>Modality</strong></TableCell>
              <TableCell align="right"><strong>Price ($)</strong></TableCell>
              <TableCell align="center"><strong>Report Turnaround</strong></TableCell>
              <TableCell align="center"><strong>Status</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredScans.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center" sx={{ py: 4, fontStyle: 'italic', color: '#999' }}>
                  No scans found.
                </TableCell>
              </TableRow>
            ) : (
              filteredScans.map((scan) => (
                <TableRow key={scan.id} hover>
                  <TableCell>{scan.name}</TableCell>
                  <TableCell>{scan.modality}</TableCell>
                  <TableCell align="right">{scan.price.toFixed(2)}</TableCell>
                  <TableCell align="center">{scan.turnaround}</TableCell>
                  <TableCell align="center"><StatusChip status={scan.status} /></TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>  </Layout>
  );
}
