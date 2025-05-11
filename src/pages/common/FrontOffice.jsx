import React, { useState, useMemo } from 'react';
import Layout from '../../components/layout/Layout';
import {
  Box,
  Typography,
  TextField,
  TableContainer,
  Table,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
  Paper,
  TablePagination,
  Modal,
  Button,
  Divider,
  Grid,
  useTheme,
} from '@mui/material';

// Sample front office patient registrations data
const sampleRegistrations = [
  {
    id: 1,
    name: 'John Doe',
    age: 30,
    gender: 'Male',
    registrationDate: '2025-05-10',
    registrationType: 'New Patient',
    contact: 'john.doe@example.com',
    address: '123 Main St',
    notes: 'Requires wheelchair assistance',
  },
  {
    id: 2,
    name: 'Mary Smith',
    age: 25,
    gender: 'Female',
    registrationDate: '2025-05-11',
    registrationType: 'Follow-up',
    contact: 'mary.smith@example.com',
    address: '456 Oak St',
    notes: '',
  },
  {
    id: 3,
    name: 'James Wilson',
    age: 40,
    gender: 'Male',
    registrationDate: '2025-05-09',
    registrationType: 'New Patient',
    contact: 'james.wilson@example.com',
    address: '789 Pine St',
    notes: 'Allergic to penicillin',
  },
];

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  maxWidth: 600,
  width: '90%',
  maxHeight: '80vh',
  overflowY: 'auto',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: 2,
  p: 4,
};

export default function DashboardMain({ children }) {
  const theme = useTheme();



  const [searchText, setSearchText] = useState('');
  const [page, setPage] = useState(0);
  const rowsPerPageOptions = [5, 10, 25];
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);
  const [selectedRegistration, setSelectedRegistration] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Filter registrations by name or registrationType
  const filteredRegistrations = useMemo(() => {
    const lower = searchText.toLowerCase();
    return sampleRegistrations.filter(
      (r) =>
        r.name.toLowerCase().includes(lower) ||
        r.registrationType.toLowerCase().includes(lower)
    );
  }, [searchText]);

  const paginatedRegistrations = useMemo(() => {
    const start = page * rowsPerPage;
    return filteredRegistrations.slice(start, start + rowsPerPage);
  }, [filteredRegistrations, page, rowsPerPage]);

  function handleChangePage(event, newPage) {
    setPage(newPage);
  }

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }

  function handleOpenModal(registration) {
    setSelectedRegistration(registration);
    setModalOpen(true);
  }

  function handleCloseModal() {
    setModalOpen(false);
    setSelectedRegistration(null);
  }

  return (
   <Layout>
    
    
    <Box sx={{ p: 3, maxWidth: 1100, mx: 'auto', fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif' }}>
      <Typography variant="h4" gutterBottom sx={{ color: theme.palette.primary.main }}>
        Front Office - Patient Registrations
      </Typography>

      <TextField
        label="Search by name or registration type"
        variant="outlined"
        size="small"
        fullWidth
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        sx={{ mb: 2 }}
      />

      <Paper elevation={3}>
        <TableContainer>
          <Table stickyHeader aria-label="patient registrations">
            <TableHead>
              <TableRow>
                <TableCell>Patient Name</TableCell>
                <TableCell>Age</TableCell>
                <TableCell>Gender</TableCell>
                <TableCell>Registration Date</TableCell>
                <TableCell>Registration Type</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedRegistrations.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} align="center" sx={{ py: 3 }}>
                    No records found.
                  </TableCell>
                </TableRow>
              ) : (
                paginatedRegistrations.map((reg) => (
                  <TableRow
                    key={reg.id}
                    hover
                    onClick={() => handleOpenModal(reg)}
                    sx={{ cursor: 'pointer' }}
                  >
                    <TableCell>{reg.name}</TableCell>
                    <TableCell>{reg.age}</TableCell>
                    <TableCell>{reg.gender}</TableCell>
                    <TableCell>{reg.registrationDate}</TableCell>
                    <TableCell>{reg.registrationType}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          component="div"
          count={filteredRegistrations.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={rowsPerPageOptions}
        />
      </Paper>

      <Modal
        open={modalOpen}
        onClose={handleCloseModal}
        aria-labelledby="registration-details-title"
        aria-describedby="registration-details-description"
      >
        <Box sx={style}>
          {selectedRegistration && (
            <>
              <Typography id="registration-details-title" variant="h6" component="h2" gutterBottom>
                Registration Details - {selectedRegistration.name}
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography><strong>Age:</strong> {selectedRegistration.age}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography><strong>Gender:</strong> {selectedRegistration.gender}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography><strong>Registration Date:</strong> {selectedRegistration.registrationDate}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography><strong>Registration Type:</strong> {selectedRegistration.registrationType}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography><strong>Contact:</strong> {selectedRegistration.contact}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography><strong>Address:</strong> {selectedRegistration.address}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography><strong>Notes:</strong> {selectedRegistration.notes || 'N/A'}</Typography>
                </Grid>
              </Grid>
              <Box sx={{ mt: 3, textAlign: 'right' }}>
                <Button variant="contained" onClick={handleCloseModal}>
                  Close
                </Button>
              </Box>
            </>
          )}
        </Box>
      </Modal>
    </Box>
    </Layout>
  );
}
