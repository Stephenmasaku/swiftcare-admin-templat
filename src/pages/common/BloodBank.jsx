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

// Sample blood inventory data
const bloodInventoryData = [
  { id: 1, group: 'A+', units: 25, expiry: '2024-07-15' },
  { id: 2, group: 'O+', units: 10, expiry: '2024-05-20' },
  { id: 3, group: 'B+', units: 5, expiry: '2024-04-30' },
  { id: 4, group: 'AB+', units: 8, expiry: '2024-06-12' },
  { id: 5, group: 'A-', units: 12, expiry: '2024-05-01' },
  { id: 6, group: 'O-', units: 4, expiry: '2024-04-25' },
  { id: 7, group: 'B-', units: 7, expiry: '2024-06-10' },
  { id: 8, group: 'AB-', units: 6, expiry: '2024-07-05' },
];

// Helper to get days till expiry from today
const daysToExpiry = (expiryDateStr) => {
  const today = new Date();
  const expiryDate = new Date(expiryDateStr);
  const diff = expiryDate - today;
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
};

// Chip component for expiry status
const ExpiryChip = ({ expiry }) => {
  const days = daysToExpiry(expiry);
  if (days < 0) return <Chip label="Expired" size="small" color="error" />;
  if (days <= 30) return <Chip label="Near Expiry" size="small" color="warning" />;
  return <Chip label="Valid" size="small" color="success" />;
};

// Chip component for stock status
const StockChip = ({ units }) => {
  if (units === 0) return <Chip label="Out of Stock" size="small" color="error" />;
  if (units <= 10) return <Chip label="Low Stock" size="small" color="warning" />;
  return <Chip label="In Stock" size="small" color="success" />;
};

export default function DashboardMain({ children }) {
  const theme = useTheme();


  const [searchQuery, setSearchQuery] = useState('');

  // Filter blood inventory by blood group
  const filteredInventory = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return bloodInventoryData;
    return bloodInventoryData.filter((item) => item.group.toLowerCase().includes(q));
  }, [searchQuery]);

  // Summary calculations
  const totalUnits = bloodInventoryData.reduce((acc, item) => acc + item.units, 0);
  const bloodGroupsAvailable = new Set(bloodInventoryData.filter(item => item.units > 0).map(item => item.group)).size;
  const lowStockCount = bloodInventoryData.filter(item => item.units > 0 && item.units <= 10).length;

  return (
   <Layout>
    <Box sx={{ p: 3, mx: 'auto', fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif' }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ color: '#b71c1c' }}>
        Blood Bank Inventory
      </Typography>
      <Typography variant="subtitle1" gutterBottom sx={{ color: '#555', mb: 4 }}>
        Manage blood stock levels and monitor expiry dates to ensure availability.
      </Typography>

      {/* Summary Cards */}
      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid item size={{xs:12, sm:12, md:4,lg:4}}>
          <Card elevation={3} sx={{ bgcolor: '#d32f2f', color: 'white', py: 2, textAlign: 'center' }}>
            <Typography variant="h6">Total Units</Typography>
            <Typography variant="h4" fontWeight="bold">{totalUnits}</Typography>
          </Card>
        </Grid>
        <Grid size={{xs:12, sm:12, md:4,lg:4}}>
          <Card elevation={3} sx={{ bgcolor: '#c62828', color: 'white', py: 2, textAlign: 'center' }}>
            <Typography variant="h6">Groups Available</Typography>
            <Typography variant="h4" fontWeight="bold">{bloodGroupsAvailable}</Typography>
          </Card>
        </Grid>
        <Grid item size={{xs:12, sm:12, md:4,lg:4}}>
          <Card elevation={3} sx={{ bgcolor: '#f57c00', color: 'black', py: 2, textAlign: 'center' }}>
            <Typography variant="h6">Low Stock Items</Typography>
            <Typography variant="h4" fontWeight="bold">{lowStockCount}</Typography>
          </Card>
        </Grid>
      </Grid>

      {/* Search input */}
      <Box sx={{ mb: 3, maxWidth: 300 }}>
        <TextField
          variant="outlined"
          size="small"
          label="Search Blood Group"
          fullWidth
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="e.g. A+, O-"
        />
      </Box>

      {/* Blood Inventory Table */}
      <TableContainer component={Paper} elevation={3}>
        <Table>
          <TableHead sx={{ bgcolor: theme.palette.grey[200] }}>
            <TableRow>
              <TableCell><strong>Blood Group</strong></TableCell>
              <TableCell align="right"><strong>Units Available</strong></TableCell>
              <TableCell align="center"><strong>Expiry Date</strong></TableCell>
              <TableCell align="center"><strong>Expiry Status</strong></TableCell>
              <TableCell align="center"><strong>Stock Status</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredInventory.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center" sx={{ py: 4, color: '#999', fontStyle: 'italic' }}>
                  No blood groups found.
                </TableCell>
              </TableRow>
            ) : (
              filteredInventory.map(({ id, group, units, expiry }) => (
                <TableRow key={id} hover>
                  <TableCell>{group}</TableCell>
                  <TableCell align="right" sx={{ color: units === 0 ? '#d32f2f' : 'inherit', fontWeight: units === 0 ? 'bold' : 'normal' }}>
                    {units}
                  </TableCell>
                  <TableCell align="center">{expiry}</TableCell>
                  <TableCell align="center"><ExpiryChip expiry={expiry} /></TableCell>
                  <TableCell align="center"><StockChip units={units} /></TableCell>
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
