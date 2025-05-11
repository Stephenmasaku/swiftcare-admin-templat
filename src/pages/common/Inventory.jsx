import React, { useState, useMemo } from 'react';
import Layout from '../../components/layout/Layout';
import {
  Box,
  Typography,
  Tabs,
  Tab,
  TextField,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  useTheme,
} from '@mui/material';

function a11yProps(index) {
  return {
    id: `inventory-tab-${index}`,
    'aria-controls': `inventory-tabpanel-${index}`,
  };
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`inventory-tabpanel-${index}`}
      aria-labelledby={`inventory-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 2 }}>{children}</Box>}
    </div>
  );
}

// Sample inventory data for Medicines
const medicines = [
  { id: 1, name: 'Paracetamol', category: 'Analgesic', stock: 120, price: 0.5, expiry: '2025-08-12' },
  { id: 2, name: 'Amoxicillin', category: 'Antibiotic', stock: 25, price: 1.2, expiry: '2023-12-01' },
  { id: 3, name: 'Metformin', category: 'Antidiabetic', stock: 50, price: 0.8, expiry: '2024-05-30' },
];

// Sample inventory data for Surgical Supplies
const surgicalSupplies = [
  { id: 1, name: 'Surgical Gloves', category: 'Disposable', stock: 500, price: 0.1, expiry: '2026-01-01' },
  { id: 2, name: 'Sutures', category: 'Non-Absorbable', stock: 150, price: 2.5, expiry: '2027-01-15' },
  { id: 3, name: 'Face Masks', category: 'Disposable', stock: 1000, price: 0.15, expiry: '2025-06-30' },
];

// Sample inventory data for Equipment
const equipment = [
  { id: 1, name: 'ECG Machine', category: 'Diagnostic', stock: 5, price: 12000, maintenanceDate: '2025-10-01' },
  { id: 2, name: 'Infusion Pump', category: 'Therapeutic', stock: 10, price: 5000, maintenanceDate: '2025-07-15' },
  { id: 3, name: 'Ultrasound Machine', category: 'Diagnostic', stock: 3, price: 30000, maintenanceDate: '2025-12-20' },
];

// Helper to filter inventory by search
const filterInventory = (items, query) => {
  if (!query) return items;
  const lowerQuery = query.toLowerCase();
  return items.filter(
    (item) =>
      item.name.toLowerCase().includes(lowerQuery) ||
      item.category.toLowerCase().includes(lowerQuery)
  );
};

export default function DashboardMain({ children }) {
  const theme = useTheme();



  const [tabValue, setTabValue] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
    setSearchQuery('');
  };

  const filteredMedicines = useMemo(() => filterInventory(medicines, searchQuery), [searchQuery]);
  const filteredSurgicalSupplies = useMemo(() => filterInventory(surgicalSupplies, searchQuery), [searchQuery]);
  const filteredEquipment = useMemo(() => filterInventory(equipment, searchQuery), [searchQuery]);

  return (
   <Layout>
    <Box sx={{ width: '100%', maxWidth: 1100, mx: 'auto', p: 3, fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif' }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ color: theme.palette.primary.main }}>
        Inventory Management
      </Typography>
      <Typography variant="subtitle1" gutterBottom sx={{ color: '#555', mb: 3 }}>
        Manage hospital inventory across medicines, surgical supplies, and equipment.
      </Typography>

      <Tabs
        value={tabValue}
        onChange={handleChange}
        aria-label="Inventory categories"
        sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}
      >
        <Tab label="Medicines" {...a11yProps(0)} />
        <Tab label="Surgical Supplies" {...a11yProps(1)} />
        <Tab label="Equipment" {...a11yProps(2)} />
      </Tabs>

      <Box sx={{ mb: 3, maxWidth: 400 }}>
        <TextField
          variant="outlined"
          size="small"
          label="Search inventory"
          fullWidth
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by name or category"
        />
      </Box>

      {/* Medicines Tab */}
      <TabPanel value={tabValue} index={0}>
        <TableContainer component={Paper} elevation={3}>
          <Table>
            <TableHead sx={{ bgcolor: theme.palette.grey[200] }}>
              <TableRow>
                <TableCell><strong>Name</strong></TableCell>
                <TableCell><strong>Category</strong></TableCell>
                <TableCell align="right"><strong>Stock</strong></TableCell>
                <TableCell align="right"><strong>Price ($)</strong></TableCell>
                <TableCell align="center"><strong>Expiry Date</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredMedicines.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} align="center" sx={{ py: 4, fontStyle: 'italic', color: '#999' }}>
                    No medicines found.
                  </TableCell>
                </TableRow>
              ) : (
                filteredMedicines.map(({ id, name, category, stock, price, expiry }) => (
                  <TableRow key={id} hover>
                    <TableCell>{name}</TableCell>
                    <TableCell>{category}</TableCell>
                    <TableCell align="right">{stock}</TableCell>
                    <TableCell align="right">{price.toFixed(2)}</TableCell>
                    <TableCell align="center">{expiry}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </TabPanel>

      {/* Surgical Supplies Tab */}
      <TabPanel value={tabValue} index={1}>
        <TableContainer component={Paper} elevation={3}>
          <Table>
            <TableHead sx={{ bgcolor: theme.palette.grey[200] }}>
              <TableRow>
                <TableCell><strong>Name</strong></TableCell>
                <TableCell><strong>Category</strong></TableCell>
                <TableCell align="right"><strong>Stock</strong></TableCell>
                <TableCell align="right"><strong>Price ($)</strong></TableCell>
                <TableCell align="center"><strong>Expiry Date</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredSurgicalSupplies.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} align="center" sx={{ py: 4, fontStyle: 'italic', color: '#999' }}>
                    No surgical supplies found.
                  </TableCell>
                </TableRow>
              ) : (
                filteredSurgicalSupplies.map(({ id, name, category, stock, price, expiry }) => (
                  <TableRow key={id} hover>
                    <TableCell>{name}</TableCell>
                    <TableCell>{category}</TableCell>
                    <TableCell align="right">{stock}</TableCell>
                    <TableCell align="right">{price.toFixed(2)}</TableCell>
                    <TableCell align="center">{expiry}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </TabPanel>

      {/* Equipment Tab */}
      <TabPanel value={tabValue} index={2}>
        <TableContainer component={Paper} elevation={3}>
          <Table>
            <TableHead sx={{ bgcolor: theme.palette.grey[200] }}>
              <TableRow>
                <TableCell><strong>Name</strong></TableCell>
                <TableCell><strong>Category</strong></TableCell>
                <TableCell align="right"><strong>Quantity</strong></TableCell>
                <TableCell align="right"><strong>Price ($)</strong></TableCell>
                <TableCell align="center"><strong>Next Maintenance</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredEquipment.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} align="center" sx={{ py: 4, fontStyle: 'italic', color: '#999' }}>
                    No equipment found.
                  </TableCell>
                </TableRow>
              ) : (
                filteredEquipment.map(({ id, name, category, stock, price, maintenanceDate }) => (
                  <TableRow key={id} hover>
                    <TableCell>{name}</TableCell>
                    <TableCell>{category}</TableCell>
                    <TableCell align="right">{stock}</TableCell>
                    <TableCell align="right">{price.toFixed(2)}</TableCell>
                    <TableCell align="center">{maintenanceDate}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </TabPanel>
    </Box>
     </Layout>
  );
}
