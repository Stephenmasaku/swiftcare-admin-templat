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
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  useTheme,
} from '@mui/material';

// Sample IPD patient data
const sampleIPDPatients = [
  {
    id: 1,
    name: 'Alice Brown',
    age: 45,
    gender: 'Female',
    admissionDate: '2025-04-20',
    department: 'Surgery',
    doctor: 'Dr. Kim',
    roomNumber: '101A',
    diagnosis: 'Appendicitis',
    contact: 'alice.brown@example.com',
    registrationStatus: 'Admitted',
  },
  {
    id: 2,
    name: 'David Green',
    age: 60,
    gender: 'Male',
    admissionDate: '2025-04-18',
    department: 'Cardiology',
    doctor: 'Dr. Singh',
    roomNumber: '202B',
    diagnosis: 'Heart Attack',
    contact: 'david.green@example.com',
    registrationStatus: 'Under Treatment',
  },
  {
    id: 3,
    name: 'Sophia Wilson',
    age: 30,
    gender: 'Female',
    admissionDate: '2025-04-22',
    department: 'Neurology',
    doctor: 'Dr. Patel',
    roomNumber: '303C',
    diagnosis: 'Migraine',
    contact: 'sophia.wilson@example.com',
    registrationStatus: 'Admitted',
  },
  // Add more patients as needed
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
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editForm, setEditForm] = useState({});

  // Filter IPD patients based on search text (name, department, doctor)
  const filteredPatients = useMemo(() => {
    const lower = searchText.toLowerCase();
    return sampleIPDPatients.filter(
      (p) =>
        p.name.toLowerCase().includes(lower) ||
        p.department.toLowerCase().includes(lower) ||
        p.doctor.toLowerCase().includes(lower)
    );
  }, [searchText]);

  // Paginate filtered patients
  const paginatedPatients = useMemo(() => {
    const startIndex = page * rowsPerPage;
    return filteredPatients.slice(startIndex, startIndex + rowsPerPage);
  }, [filteredPatients, page, rowsPerPage]);

  // Handlers for pagination
  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Open modal and initialize edit form
  const handleOpenModal = (patient) => {
    setSelectedPatient(patient);
    setEditForm({ ...patient });
    setModalOpen(true);
  };

  // Close modal and clear selected patient
  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedPatient(null);
  };

  // Handle form input changes
  const handleInputChange = (field, value) => {
    setEditForm((prev) => ({ ...prev, [field]: value }));
  };

  // Save edited form (here just closes modal; you would connect to backend)
  const handleSave = () => {
    // TODO: Implement update logic
    console.log('Saved patient info:', editForm);
    handleCloseModal();
  };
  
  const onSearch = () => {
  console.log('Search clicked!');
 
};

  const [name, setName] = useState('');
const [department, setDepartment] = useState('');
const [doctor, setDoctor] = useState('');

  return (
   <Layout>
    <Box sx={{ p: 3, maxWidth: 1100, mx: 'auto', fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif' }}>
      <Typography variant="h4" gutterBottom sx={{ color: theme.palette.primary.main }}>
        IPD Patient Records
      </Typography>

     <Grid container spacing={3} alignItems="center"  sx={{
        bgcolor: 'white',
        borderRadius: 1,
        p: 2,
        mb: 3,
        boxShadow: 1,
      }}>
        <Grid item xs={12} sm={3}>
          <TextField
            fullWidth
            label="Search by Name"
            variant="outlined"
            size="small"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            fullWidth
            label="Search by Department"
            variant="outlined"
            size="small"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            fullWidth
            label="Search by Doctor"
            variant="outlined"
            size="small"
            value={doctor}
            onChange={(e) => setDoctor(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={onSearch}
            sx={{ height: '38px' }}
          >
            Search Patient
          </Button>
        </Grid>
      </Grid>

      <Paper elevation={3}>
        <TableContainer>
          <Table aria-label="IPD patient table" stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Patient Name</TableCell>
                <TableCell>Age</TableCell>
                <TableCell>Gender</TableCell>
                <TableCell>Admission Date</TableCell>
                <TableCell>Department</TableCell>
                <TableCell>Doctor</TableCell>
                <TableCell>Room Number</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedPatients.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} align="center" sx={{ py: 3 }}>
                    No records found.
                  </TableCell>
                </TableRow>
              ) : (
                paginatedPatients.map((patient) => (
                  <TableRow
                    key={patient.id}
                    hover
                    onClick={() => handleOpenModal(patient)}
                    sx={{ cursor: 'pointer' }}
                  >
                    <TableCell>{patient.name}</TableCell>
                    <TableCell>{patient.age}</TableCell>
                    <TableCell>{patient.gender}</TableCell>
                    <TableCell>{patient.admissionDate}</TableCell>
                    <TableCell>{patient.department}</TableCell>
                    <TableCell>{patient.doctor}</TableCell>
                    <TableCell>{patient.roomNumber}</TableCell>
                    <TableCell>{patient.registrationStatus}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          component="div"
          count={filteredPatients.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={rowsPerPageOptions}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      <Modal
        open={modalOpen}
        onClose={handleCloseModal}
        aria-labelledby="ipd-patient-modal-title"
        aria-describedby="ipd-patient-modal-description"
      >
        <Box sx={style}>
          {selectedPatient && (
            <>
              <Typography id="ipd-patient-modal-title" variant="h6" component="h2" gutterBottom>
                Edit Registration - {selectedPatient.name}
              </Typography>

              <Divider sx={{ mb: 2 }} />

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Patient Name"
                    fullWidth
                    value={editForm.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                  />
                </Grid>

                <Grid item xs={6} sm={3}>
                  <TextField
                    label="Age"
                    type="number"
                    fullWidth
                    value={editForm.age}
                    onChange={(e) => handleInputChange('age', e.target.value)}
                    inputProps={{ min: 0 }}
                  />
                </Grid>

                <Grid item xs={6} sm={3}>
                  <TextField
                    label="Gender"
                    fullWidth
                    value={editForm.gender}
                    onChange={(e) => handleInputChange('gender', e.target.value)}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Admission Date"
                    type="date"
                    fullWidth
                    value={editForm.admissionDate}
                    onChange={(e) => handleInputChange('admissionDate', e.target.value)}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Department"
                    fullWidth
                    value={editForm.department}
                    onChange={(e) => handleInputChange('department', e.target.value)}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Doctor"
                    fullWidth
                    value={editForm.doctor}
                    onChange={(e) => handleInputChange('doctor', e.target.value)}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Room Number"
                    fullWidth
                    value={editForm.roomNumber}
                    onChange={(e) => handleInputChange('roomNumber', e.target.value)}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Status</InputLabel>
                    <Select
                      value={editForm.registrationStatus}
                      label="Status"
                      onChange={(e) => handleInputChange('registrationStatus', e.target.value)}
                    >
                      <MenuItem value="Admitted">Admitted</MenuItem>
                      <MenuItem value="Under Treatment">Under Treatment</MenuItem>
                      <MenuItem value="Discharged">Discharged</MenuItem>
                      <MenuItem value="Transferred">Transferred</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    label="Diagnosis"
                    multiline
                    rows={3}
                    fullWidth
                    value={editForm.diagnosis}
                    onChange={(e) => handleInputChange('diagnosis', e.target.value)}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    label="Contact"
                    fullWidth
                    value={editForm.contact}
                    onChange={(e) => handleInputChange('contact', e.target.value)}
                  />
                </Grid>
              </Grid>

              <Box sx={{ mt: 4, textAlign: 'right' }}>
                <Button variant="outlined" onClick={handleCloseModal} sx={{ mr: 2 }}>
                  Cancel
                </Button>
                <Button variant="contained" onClick={handleSave}>
                  Save
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
