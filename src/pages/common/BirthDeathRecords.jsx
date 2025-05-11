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
  TableRow,
  TableCell,
  TableBody,
  Paper,
  useTheme,
} from '@mui/material';

function a11yProps(index) {
  return {
    id: `record-tab-${index}`,
    'aria-controls': `record-tabpanel-${index}`,
  };
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`record-tabpanel-${index}`}
      aria-labelledby={`record-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ pt: 2 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

// Sample data for birth records
const birthRecords = [
  { id: 1, name: 'Emma Watson', dateOfBirth: '2024-11-15', place: 'City Hospital', fatherName: 'John Watson', motherName: 'Mary Watson' },
  { id: 2, name: 'Liam Johnson', dateOfBirth: '2025-01-03', place: 'Central Clinic', fatherName: 'Michael Johnson', motherName: 'Laura Johnson' },
  { id: 3, name: 'Olivia Brown', dateOfBirth: '2025-04-20', place: 'North Medical Center', fatherName: 'David Brown', motherName: 'Sarah Brown' },
  { id: 4, name: 'Noah Miller', dateOfBirth: '2025-05-01', place: 'City Hospital', fatherName: 'James Miller', motherName: 'Anna Miller' },
];

// Sample data for death records
const deathRecords = [
  { id: 1, name: 'Robert Green', dateOfDeath: '2025-02-10', place: 'City Hospital', cause: 'Natural Causes' },
  { id: 2, name: 'Susan Lee', dateOfDeath: '2025-03-22', place: 'Central Clinic', cause: 'Accident' },
  { id: 3, name: 'William Harris', dateOfDeath: '2025-04-05', place: 'North Medical Center', cause: 'Illness' },
  { id: 4, name: 'Patricia Clark', dateOfDeath: '2025-04-28', place: 'City Hospital', cause: 'Complications' },
];

export default function DashboardMain({ children }) {
  const theme = useTheme();
  const [tabValue, setTabValue] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
    setSearchQuery(''); // reset search on tab change
  };

  // Filter birth records based on search query
  const filteredBirthRecords = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return birthRecords;
    return birthRecords.filter(
      (record) =>
        record.name.toLowerCase().includes(q) ||
        record.place.toLowerCase().includes(q) ||
        record.fatherName.toLowerCase().includes(q) ||
        record.motherName.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  // Filter death records based on search query
  const filteredDeathRecords = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return deathRecords;
    return deathRecords.filter(
      (record) =>
        record.name.toLowerCase().includes(q) ||
        record.place.toLowerCase().includes(q) ||
        record.cause.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  return (
   <Layout>
    <Box sx={{ width: '100%', maxWidth: 1000, mx: 'auto', p: 3, fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif' }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ color: theme.palette.primary.main }}>
        Birth and Death Records
      </Typography>

      <Tabs value={tabValue} onChange={handleChange} aria-label="Birth and Death Records Tabs" sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tab label="Birth Records" {...a11yProps(0)} />
        <Tab label="Death Records" {...a11yProps(1)} />
      </Tabs>

      <Box sx={{ mt: 2, mb: 3, maxWidth: 400 }}>
        <TextField
          variant="outlined"
          size="small"
          label="Search records"
          fullWidth
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by name, place, cause, etc."
        />
      </Box>

      <TabPanel value={tabValue} index={0}>
        <TableContainer component={Paper} elevation={3}>
          <Table>
            <TableHead sx={{ bgcolor: theme.palette.grey[200] }}>
              <TableRow>
                <TableCell><strong>Name</strong></TableCell>
                <TableCell><strong>Date of Birth</strong></TableCell>
                <TableCell><strong>Place</strong></TableCell>
                <TableCell><strong>Father's Name</strong></TableCell>
                <TableCell><strong>Mother's Name</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredBirthRecords.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} align="center" sx={{ py: 4, fontStyle: 'italic', color: '#999' }}>
                    No birth records found.
                  </TableCell>
                </TableRow>
              ) : (
                filteredBirthRecords.map(({ id, name, dateOfBirth, place, fatherName, motherName }) => (
                  <TableRow key={id} hover>
                    <TableCell>{name}</TableCell>
                    <TableCell>{dateOfBirth}</TableCell>
                    <TableCell>{place}</TableCell>
                    <TableCell>{fatherName}</TableCell>
                    <TableCell>{motherName}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <TableContainer component={Paper} elevation={3}>
          <Table>
            <TableHead sx={{ bgcolor: theme.palette.grey[200] }}>
              <TableRow>
                <TableCell><strong>Name</strong></TableCell>
                <TableCell><strong>Date of Death</strong></TableCell>
                <TableCell><strong>Place</strong></TableCell>
                <TableCell><strong>Cause</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredDeathRecords.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} align="center" sx={{ py: 4, fontStyle: 'italic', color: '#999' }}>
                    No death records found.
                  </TableCell>
                </TableRow>
              ) : (
                filteredDeathRecords.map(({ id, name, dateOfDeath, place, cause }) => (
                  <TableRow key={id} hover>
                    <TableCell>{name}</TableCell>
                    <TableCell>{dateOfDeath}</TableCell>
                    <TableCell>{place}</TableCell>
                    <TableCell>{cause}</TableCell>
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
