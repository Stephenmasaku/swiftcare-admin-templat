import React, { useState, useMemo } from 'react';
import Layout from '../../components/layout/Layout';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  TextField,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  Paper,
  Chip,
  Button,
  useTheme,
} from '@mui/material';

const pathologyTestsData = [
  { id: 1, name: 'Complete Blood Count (CBC)', category: 'Hematology', price: 20, turnaround: '24 hrs', status: 'completed' },
  { id: 2, name: 'Urine Analysis', category: 'Urinalysis', price: 15, turnaround: '12 hrs', status: 'pending' },
  { id: 3, name: 'Blood Glucose', category: 'Biochemistry', price: 18, turnaround: '6 hrs', status: 'completed' },
  { id: 4, name: 'Lipid Profile', category: 'Biochemistry', price: 25, turnaround: '24 hrs', status: 'pending' },
  { id: 5, name: 'Thyroid Function Test', category: 'Endocrinology', price: 30, turnaround: '48 hrs', status: 'pending' },
  { id: 6, name: 'Liver Function Test', category: 'Biochemistry', price: 28, turnaround: '24 hrs', status: 'completed' },
  { id: 7, name: 'Blood Culture', category: 'Microbiology', price: 40, turnaround: '72 hrs', status: 'completed' },
  { id: 8, name: 'Stool Analysis', category: 'Microbiology', price: 12, turnaround: '24 hrs', status: 'pending' },
  { id: 9, name: 'Pregnancy Test', category: 'Immunology', price: 10, turnaround: '4 hrs', status: 'completed' },
  { id: 10, name: 'HbA1c', category: 'Biochemistry', price: 22, turnaround: '24 hrs', status: 'completed' },
];

const StatusChip = ({ status }) => {
  const color = status === 'completed' ? 'success' : status === 'pending' ? 'warning' : 'default';
  const label = status.charAt(0).toUpperCase() + status.slice(1);
  return <Chip label={label} color={color} size="small" />;
};

export default function DashboardMain({ children }) {
  const theme = useTheme();


  const [searchQuery, setSearchQuery] = useState('');

  // Filter pathology tests by search query on name or category
  const filteredTests = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return pathologyTestsData;
    return pathologyTestsData.filter(
      (test) =>
        test.name.toLowerCase().includes(q) ||
        test.category.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  // Summary stats
  const totalTests = pathologyTestsData.length;
  const pendingCount = pathologyTestsData.filter((test) => test.status === 'pending').length;
  const completedCount = pathologyTestsData.filter((test) => test.status === 'completed').length;

  return (
   <Layout>
    <Box sx={{ p: 3, maxWidth: 1100, mx: 'auto', fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif' }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ color: '#2e3b55' }}>
        Pathology Services
      </Typography>
      <Typography variant="subtitle1" gutterBottom sx={{ color: '#555', mb: 4 }}>
        Manage pathology tests, track status and turnaround times efficiently.
      </Typography>

      {/* Summary Cards */}
      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid item size={{xs:12, sm:12, md:4,lg:4}}>
          <Card elevation={3} sx={{ bgcolor: '#1976d2', color: '#fff', py: 2, textAlign: 'center' }}>
            <Typography variant="h6">Total Tests</Typography>
            <Typography variant="h4" fontWeight="bold">{totalTests}</Typography>
          </Card>
        </Grid>
        <Grid item size={{xs:12, sm:12, md:4,lg:4}}>
          <Card elevation={3} sx={{ bgcolor: '#fbc02d', color: '#000', py: 2, textAlign: 'center' }}>
            <Typography variant="h6">Pending Reports</Typography>
            <Typography variant="h4" fontWeight="bold">{pendingCount}</Typography>
          </Card>
        </Grid>
        <Grid item size={{xs:12, sm:12, md:4,lg:4}}>
          <Card elevation={3} sx={{ bgcolor: '#388e3c', color: '#fff', py: 2, textAlign: 'center' }}>
            <Typography variant="h6">Completed Reports</Typography>
            <Typography variant="h4" fontWeight="bold">{completedCount}</Typography>
          </Card>
        </Grid>
      </Grid>

      {/* Search Input */}
      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          label="Search tests by name or category"
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          size="small"
          sx={{ maxWidth: 400 }}
        />
      </Box>

      {/* Tests Table */}
      <TableContainer component={Paper} elevation={3}>
        <Table>
          <TableHead sx={{ bgcolor: theme.palette.grey[200] }}>
            <TableRow>
              <TableCell><strong>Test Name</strong></TableCell>
              <TableCell><strong>Category</strong></TableCell>
              <TableCell align="right"><strong>Price ($)</strong></TableCell>
              <TableCell align="center"><strong>Turnaround</strong></TableCell>
              <TableCell align="center"><strong>Status</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredTests.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center" sx={{ py: 4, fontStyle: 'italic', color: '#999' }}>
                  No tests found.
                </TableCell>
              </TableRow>
            ) : (
              filteredTests.map((test) => (
                <TableRow key={test.id} hover>
                  <TableCell>{test.name}</TableCell>
                  <TableCell>{test.category}</TableCell>
                  <TableCell align="right">{test.price.toFixed(2)}</TableCell>
                  <TableCell align="center">{test.turnaround}</TableCell>
                  <TableCell align="center"><StatusChip status={test.status} /></TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box> </Layout>
  );
}
