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
  TableBody,
  TableRow,
  TableCell,
  Paper,
  TextField,
  Chip,
  useTheme,
} from '@mui/material';

const operationsData = [
  { id: 1, patient: 'John Doe', surgery: 'Appendectomy', surgeon: 'Dr. Smith', datetime: '2025-05-10T09:00', status: 'upcoming' },
  { id: 2, patient: 'Mary Johnson', surgery: 'Knee Replacement', surgeon: 'Dr. Clarke', datetime: '2025-05-09T14:30', status: 'completed' },
  { id: 3, patient: 'Alex Lee', surgery: 'Cataract Surgery', surgeon: 'Dr. Patel', datetime: '2025-05-11T11:00', status: 'upcoming' },
  { id: 4, patient: 'Nancy Drew', surgery: 'Gallbladder Removal', surgeon: 'Dr. Gupta', datetime: '2025-05-08T08:00', status: 'cancelled' },
  { id: 5, patient: 'Michael Brown', surgery: 'Hernia Repair', surgeon: 'Dr. Kim', datetime: '2025-05-10T15:00', status: 'completed' },
  { id: 6, patient: 'Emily Davis', surgery: 'Hip Replacement', surgeon: 'Dr. Wilson', datetime: '2025-05-12T10:30', status: 'upcoming' },
  { id: 7, patient: 'Robert Garcia', surgery: 'Tonsillectomy', surgeon: 'Dr. Martinez', datetime: '2025-05-07T13:00', status: 'completed' },
  { id: 8, patient: 'Lisa White', surgery: 'Thyroidectomy', surgeon: 'Dr. Brown', datetime: '2025-05-11T16:00', status: 'upcoming' },
  { id: 9, patient: 'David Wilson', surgery: 'CABG', surgeon: 'Dr. Singh', datetime: '2025-05-08T09:30', status: 'completed' },
  { id: 10, patient: 'Sophia Martinez', surgery: 'C-Section', surgeon: 'Dr. Nguyen', datetime: '2025-05-09T12:00', status: 'cancelled' },
];

// Helper component for status chips
const StatusChip = ({ status }) => {
  const labels = {
    completed: { label: 'Completed', color: 'success' },
    upcoming: { label: 'Upcoming', color: 'info' },
    cancelled: { label: 'Cancelled', color: 'error' },
  };
  const { label, color } = labels[status] || { label: 'Unknown', color: 'default' };
  return <Chip label={label} color={color} size="small" />;
};

// Format date and time for display
const formatDateTime = (datetimeStr) => {
  const options = { year: 'numeric', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit' };
  const dt = new Date(datetimeStr);
  return dt.toLocaleString(undefined, options);
};

export default function DashboardMain({ children }) {
  const theme = useTheme();


  const [searchQuery, setSearchQuery] = useState('');

  // Filter operations by patient, surgery, surgeon, or status
  const filteredOperations = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return operationsData;
    return operationsData.filter(({ patient, surgery, surgeon, status }) =>
      patient.toLowerCase().includes(q) ||
      surgery.toLowerCase().includes(q) ||
      surgeon.toLowerCase().includes(q) ||
      status.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  // Summary calculation
  const totalOperations = operationsData.length;
  const completedCount = operationsData.filter((op) => op.status === 'completed').length;
  const upcomingCount = operationsData.filter((op) => op.status === 'upcoming').length;
  const cancelledCount = operationsData.filter((op) => op.status === 'cancelled').length;

  return (
   <Layout>
    <Box sx={{ p: 3, maxWidth: 1100, mx: 'auto', fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif' }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ color: '#2c3e50' }}>
        Operation Theater Schedule
      </Typography>
      <Typography variant="subtitle1" gutterBottom sx={{ color: '#555', mb: 4 }}>
        View and manage scheduled operations and their statuses.
      </Typography>

      {/* Summary Cards */}
      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid item  size={{ xs: 6, sm:6, md: 3 , lg:3}}>
          <Card elevation={3} sx={{ bgcolor: '#3949ab', color: 'white', py: 2, textAlign: 'center' }}>
            <Typography variant="h6">Total Operations</Typography>
            <Typography variant="h4" fontWeight="bold">{totalOperations}</Typography>
          </Card>
        </Grid>
        <Grid item size={{ xs: 6, sm:6, md: 3 , lg:3}}>
          <Card elevation={3} sx={{ bgcolor: '#43a047', color: 'white', py: 2, textAlign: 'center' }}>
            <Typography variant="h6">Completed</Typography>
            <Typography variant="h4" fontWeight="bold">{completedCount}</Typography>
          </Card>
        </Grid>
        <Grid item size={{ xs: 6, sm:6, md: 3 , lg:3}}>
          <Card elevation={3} sx={{ bgcolor: '#0288d1', color: 'white', py: 2, textAlign: 'center' }}>
            <Typography variant="h6">Upcoming</Typography>
            <Typography variant="h4" fontWeight="bold">{upcomingCount}</Typography>
          </Card>
        </Grid>
        <Grid item size={{ xs: 6, sm:6, md: 3 , lg:3}}>
          <Card elevation={3} sx={{ bgcolor: '#e53935', color: 'white', py: 2, textAlign: 'center' }}>
            <Typography variant="h6">Cancelled</Typography>
            <Typography variant="h4" fontWeight="bold">{cancelledCount}</Typography>
          </Card>
        </Grid>
      </Grid>

      {/* Search Field */}
      <Box sx={{ mb: 3, maxWidth: 400 }}>
        <TextField
          fullWidth
          label="Search operations by patient, surgery, surgeon, or status"
          variant="outlined"
          size="small"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </Box>

      {/* Operations Table */}
      <TableContainer component={Paper} elevation={3}>
        <Table>
          <TableHead sx={{ bgcolor: theme.palette.grey[200] }}>
            <TableRow>
              <TableCell><strong>Patient</strong></TableCell>
              <TableCell><strong>Surgery Type</strong></TableCell>
              <TableCell><strong>Surgeon</strong></TableCell>
              <TableCell><strong>Date & Time</strong></TableCell>
              <TableCell align="center"><strong>Status</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredOperations.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center" sx={{ py: 4, fontStyle: 'italic', color: '#999' }}>
                  No operations found.
                </TableCell>
              </TableRow>
            ) : (
              filteredOperations.map((op) => (
                <TableRow key={op.id} hover>
                  <TableCell>{op.patient}</TableCell>
                  <TableCell>{op.surgery}</TableCell>
                  <TableCell>{op.surgeon}</TableCell>
                  <TableCell>{formatDateTime(op.datetime)}</TableCell>
                  <TableCell align="center"><StatusChip status={op.status} /></TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box> </Layout>
  );
}
