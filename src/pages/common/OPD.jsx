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
  Tabs,
  Tab,
  Avatar,
  useTheme,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

// Sample patient data with photo as initials (could be image URL)
const samplePatients = [
  {
    id: 'P001',
    name: 'Alice Brown',
    phone: '123-456-7890',
    bloodGroup: 'A+',
    email: 'alice.brown@example.com',
    assignedDoctor: 'Dr. Kim',
    photo: '', // Will use initials avatar
    personalInfo: {
      dob: '1978-11-21',
      gender: 'Female',
      address: '123 Maple St, Springfield',
      nationality: 'American',
    },
    socialHistory: {
      smoking: 'No',
      alcohol: 'Occasionally',
      allergies: 'Penicillin',
    },
    relatives: [
      { name: 'John Brown', relation: 'Husband', phone: '123-000-1111' },
      { name: 'Mary Brown', relation: 'Daughter', phone: '123-000-2222' },
    ],
    contacts: [
      { type: 'Home', contact: '123-456-0000' },
      { type: 'Mobile', contact: '123-456-7890' },
    ],
    medicationHistory: [
      { medicine: 'Atorvastatin', dosage: '10 mg daily', startDate: '2023-01-01', endDate: 'Ongoing' },
      { medicine: 'Lisinopril', dosage: '5 mg daily', startDate: '2022-06-15', endDate: '2023-01-01' },
    ],
  },
  {
    id: 'P002',
    name: 'David Green',
    phone: '234-567-8901',
    bloodGroup: 'B+',
    email: 'david.green@example.com',
    assignedDoctor: 'Dr. Singh',
    photo: '',
    personalInfo: {
      dob: '1963-05-10',
      gender: 'Male',
      address: '456 Oak St, Springfield',
      nationality: 'American',
    },
    socialHistory: {
      smoking: 'Former',
      alcohol: 'Frequently',
      allergies: 'None',
    },
    relatives: [
      { name: 'Helen Green', relation: 'Wife', phone: '234-000-1111' },
    ],
    contacts: [
      { type: 'Mobile', contact: '234-567-8901' },
    ],
    medicationHistory: [
      { medicine: 'Metformin', dosage: '500 mg twice daily', startDate: '2022-10-01', endDate: 'Ongoing' },
    ],
  },
  {
    id: 'P003',
    name: 'Sophia Wilson',
    phone: '345-678-9012',
    bloodGroup: 'O-',
    email: 'sophia.wilson@example.com',
    assignedDoctor: 'Dr. Patel',
    photo: '',
    personalInfo: {
      dob: '1993-07-30',
      gender: 'Female',
      address: '789 Pine St, Springfield',
      nationality: 'American',
    },
    socialHistory: {
      smoking: 'No',
      alcohol: 'No',
      allergies: 'None',
    },
    relatives: [],
    contacts: [
      { type: 'Home', contact: '345-678-0000' },
      { type: 'Mobile', contact: '345-678-9012' },
    ],
    medicationHistory: [
      { medicine: 'Ibuprofen', dosage: '200 mg as needed', startDate: '2023-04-01', endDate: '2023-04-05' },
    ],
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

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tab-panel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 1 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `tab-${index}`,
    'aria-controls': `tab-panel-${index}`,
  };
}

export default function DashboardMain() {
  const theme = useTheme();

  const [searchText, setSearchText] = useState('');
  const [page, setPage] = useState(0);
  const rowsPerPageOptions = [5, 10, 25];
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);

  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [viewPatient, setViewPatient] = useState(null);
  const [viewTab, setViewTab] = useState(0);

  // For create new patient modal
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [newPatient, setNewPatient] = useState({
    id: '',
    name: '',
    phone: '',
    bloodGroup: '',
    email: '',
    assignedDoctor: '',
    personalInfo: {
      dob: '',
      gender: '',
      address: '',
      nationality: '',
    },
    socialHistory: {
      smoking: '',
      alcohol: '',
      allergies: '',
    },
    relatives: [],
    contacts: [],
    medicationHistory: [],
  });

  // Filter patients based on search
  const filteredPatients = useMemo(() => {
    const lower = searchText.toLowerCase();
    return samplePatients.filter(
      (p) =>
        p.name.toLowerCase().includes(lower) ||
        p.id.toLowerCase().includes(lower) ||
        p.phone.includes(lower) ||
        p.bloodGroup.toLowerCase().includes(lower) ||
        p.email.toLowerCase().includes(lower) ||
        p.assignedDoctor.toLowerCase().includes(lower)
    );
  }, [searchText]);

  // Paginate filtered patients
  const paginatedPatients = useMemo(() => {
    const startIndex = page * rowsPerPage;
    return filteredPatients.slice(startIndex, startIndex + rowsPerPage);
  }, [filteredPatients, page, rowsPerPage]);

  // Pagination handlers
  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Open View Modal
  const handleOpenViewModal = (patient) => {
    setViewPatient(patient);
    setViewTab(0);
    setViewModalOpen(true);
  };

  // Close View Modal
  const handleCloseViewModal = () => {
    setViewModalOpen(false);
    setViewPatient(null);
  };

  // View tab change
  const handleViewTabChange = (event, newValue) => {
    setViewTab(newValue);
  };

  // Open Create Modal
  const handleOpenCreateModal = () => {
    setNewPatient({
      id: '',
      name: '',
      phone: '',
      bloodGroup: '',
      email: '',
      assignedDoctor: '',
      personalInfo: { dob: '', gender: '', address: '', nationality: '' },
      socialHistory: { smoking: '', alcohol: '', allergies: '' },
      relatives: [],
      contacts: [],
      medicationHistory: [],
    });
    setCreateModalOpen(true);
  };

  // Close Create Modal
  const handleCloseCreateModal = () => {
    setCreateModalOpen(false);
  };

  // Handle Create input change (top level fields)
  const handleCreateInputChange = (field, value) => {
    setNewPatient((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Handle nested Create input change for personalInfo and socialHistory
  const handleCreateNestedInputChange = (section, field, value) => {
    setNewPatient((prev) => ({
      ...prev,
      [section]: { ...prev[section], [field]: value },
    }));
  };

  // Save created patient - just logs for demo
  const handleCreateSave = () => {
    console.log('New patient created:', newPatient);
    // Normally here would append to patient list or call API
    handleCloseCreateModal();
  };

  // Utility function to get initials for avatar
  const getInitials = (name) => {
    if (!name) return '';
    const parts = name.trim().split(' ');
    if (parts.length === 1) return parts[0][0].toUpperCase();
    return (parts[0][0] + parts[1][0]).toUpperCase();
  };

  return (
    <Layout>
      <Box
        sx={{
          p: 3,
          maxWidth: 1100,
          mx: 'auto',
          fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
        }}
      >
        <Typography variant="h4" gutterBottom sx={{ color: theme.palette.primary.main }}>
          Hospital Management System - Patient Records
        </Typography>

        <Box
          sx={{
            mb: 2,
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            gap: 2,
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <TextField
            label="Search by Name, Id, Phone, Blood Group, Email, Doctor"
            variant="outlined"
            size="small"
            fullWidth
            sx={{ maxWidth: 500 }}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Button variant="contained" onClick={handleOpenCreateModal}>
            Add New Patient
          </Button>
        </Box>

        <Paper elevation={3}>
          <TableContainer>
            <Table aria-label="Hospital patient table" stickyHeader size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Photo</TableCell>
                  <TableCell>Patient Name</TableCell>
                  <TableCell>Patient Id</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>Blood Group</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Assigned Doctor</TableCell>
                  <TableCell align="center">Action</TableCell>
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
                    <TableRow key={patient.id} hover>
                      <TableCell>
                        <Avatar sx={{ bgcolor: theme.palette.primary.main, width: 36, height: 36 }}>
                          {getInitials(patient.name)}
                        </Avatar>
                      </TableCell>
                      <TableCell>{patient.name}</TableCell>
                      <TableCell>{patient.id}</TableCell>
                      <TableCell>{patient.phone}</TableCell>
                      <TableCell>{patient.bloodGroup}</TableCell>
                      <TableCell>{patient.email}</TableCell>
                      <TableCell>{patient.assignedDoctor}</TableCell>
                      <TableCell align="center">
                        <Button size="small" variant="outlined" onClick={() => handleOpenViewModal(patient)}>
                          View
                        </Button>
                      </TableCell>
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
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={rowsPerPageOptions}
          />
        </Paper>

        {/* View Patient Modal */}
        <Modal open={viewModalOpen} onClose={handleCloseViewModal} aria-labelledby="view-patient-modal-title" closeAfterTransition>
          <Box sx={style}>
            {viewPatient && (
              <>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography id="view-patient-modal-title" variant="h6" component="h2" gutterBottom>
                    Patient Details - {viewPatient.name} ({viewPatient.id})
                  </Typography>
                  <IconButton onClick={handleCloseViewModal} size="small" aria-label="close">
                    <CloseIcon />
                  </IconButton>
                </Box>

                <Divider sx={{ mb: 2 }} />

                <Tabs
                  value={viewTab}
                  onChange={handleViewTabChange}
                  variant="scrollable"
                  scrollButtons="auto"
                  aria-label="Patient details tabs"
                  sx={{ mb: 2 }}
                >
                  <Tab label="Personal Information" {...a11yProps(0)} />
                  <Tab label="Social History" {...a11yProps(1)} />
                  <Tab label="Relatives" {...a11yProps(2)} />
                  <Tab label="Contacts" {...a11yProps(3)} />
                  <Tab label="Medication History" {...a11yProps(4)} />
                </Tabs>

                <TabPanel value={viewTab} index={0}>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Typography><strong>Date of Birth:</strong> {viewPatient.personalInfo.dob}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography><strong>Gender:</strong> {viewPatient.personalInfo.gender}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography><strong>Address:</strong> {viewPatient.personalInfo.address}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography><strong>Nationality:</strong> {viewPatient.personalInfo.nationality}</Typography>
                    </Grid>
                  </Grid>
                </TabPanel>

                <TabPanel value={viewTab} index={1}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Typography><strong>Smoking:</strong> {viewPatient.socialHistory.smoking}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography><strong>Alcohol:</strong> {viewPatient.socialHistory.alcohol}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography><strong>Allergies:</strong> {viewPatient.socialHistory.allergies}</Typography>
                    </Grid>
                  </Grid>
                </TabPanel>

                <TabPanel value={viewTab} index={2}>
                  {viewPatient.relatives.length === 0 ? (
                    <Typography>No relatives data.</Typography>
                  ) : (
                    <Table size="small" aria-label="relatives table">
                      <TableHead>
                        <TableRow>
                          <TableCell>Name</TableCell>
                          <TableCell>Relation</TableCell>
                          <TableCell>Phone</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {viewPatient.relatives.map((relative, index) => (
                          <TableRow key={index}>
                            <TableCell>{relative.name}</TableCell>
                            <TableCell>{relative.relation}</TableCell>
                            <TableCell>{relative.phone}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </TabPanel>

                <TabPanel value={viewTab} index={3}>
                  {viewPatient.contacts.length === 0 ? (
                    <Typography>No contact data.</Typography>
                  ) : (
                    <Table size="small" aria-label="contacts table">
                      <TableHead>
                        <TableRow>
                          <TableCell>Type</TableCell>
                          <TableCell>Contact</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {viewPatient.contacts.map((contact, index) => (
                          <TableRow key={index}>
                            <TableCell>{contact.type}</TableCell>
                            <TableCell>{contact.contact}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </TabPanel>

                <TabPanel value={viewTab} index={4}>
                  {viewPatient.medicationHistory.length === 0 ? (
                    <Typography>No medication history.</Typography>
                  ) : (
                    <Table size="small" aria-label="medication history table">
                      <TableHead>
                        <TableRow>
                          <TableCell>Medicine</TableCell>
                          <TableCell>Dosage</TableCell>
                          <TableCell>Start Date</TableCell>
                          <TableCell>End Date</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {viewPatient.medicationHistory.map((med, index) => (
                          <TableRow key={index}>
                            <TableCell>{med.medicine}</TableCell>
                            <TableCell>{med.dosage}</TableCell>
                            <TableCell>{med.startDate}</TableCell>
                            <TableCell>{med.endDate}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </TabPanel>
              </>
            )}
          </Box>
        </Modal>

        {/* Create New Patient Modal */}
        <Modal open={createModalOpen} onClose={handleCloseCreateModal} aria-labelledby="create-patient-modal-title" closeAfterTransition>
          <Box sx={{ ...style, maxHeight: '90vh' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography id="create-patient-modal-title" variant="h6" component="h2" gutterBottom>
                Add New Patient
              </Typography>
              <IconButton onClick={handleCloseCreateModal} size="small" aria-label="close">
                <CloseIcon />
              </IconButton>
            </Box>

            <Divider sx={{ mb: 2 }} />

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Patient Id"
                  fullWidth
                  value={newPatient.id}
                  onChange={(e) => handleCreateInputChange('id', e.target.value)}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Patient Name"
                  fullWidth
                  value={newPatient.name}
                  onChange={(e) => handleCreateInputChange('name', e.target.value)}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Phone"
                  fullWidth
                  value={newPatient.phone}
                  onChange={(e) => handleCreateInputChange('phone', e.target.value)}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Blood Group</InputLabel>
                  <Select
                    label="Blood Group"
                    value={newPatient.bloodGroup}
                    onChange={(e) => handleCreateInputChange('bloodGroup', e.target.value)}
                  >
                    <MenuItem value="A+">A+</MenuItem>
                    <MenuItem value="A-">A-</MenuItem>
                    <MenuItem value="B+">B+</MenuItem>
                    <MenuItem value="B-">B-</MenuItem>
                    <MenuItem value="AB+">AB+</MenuItem>
                    <MenuItem value="AB-">AB-</MenuItem>
                    <MenuItem value="O+">O+</MenuItem>
                    <MenuItem value="O-">O-</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Email"
                  fullWidth
                  value={newPatient.email}
                  onChange={(e) => handleCreateInputChange('email', e.target.value)}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Assigned Doctor"
                  fullWidth
                  value={newPatient.assignedDoctor}
                  onChange={(e) => handleCreateInputChange('assignedDoctor', e.target.value)}
                />
              </Grid>

              {/* Personal Information */}
              <Grid item xs={12}>
                <Typography variant="subtitle1" sx={{ mt: 2, mb: 1, fontWeight: 'bold' }}>
                  Personal Information
                </Typography>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Date of Birth"
                  type="date"
                  fullWidth
                  value={newPatient.personalInfo.dob}
                  onChange={(e) => handleCreateNestedInputChange('personalInfo', 'dob', e.target.value)}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Gender</InputLabel>
                  <Select
                    label="Gender"
                    value={newPatient.personalInfo.gender}
                    onChange={(e) => handleCreateNestedInputChange('personalInfo', 'gender', e.target.value)}
                  >
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Address"
                  multiline
                  rows={2}
                  fullWidth
                  value={newPatient.personalInfo.address}
                  onChange={(e) => handleCreateNestedInputChange('personalInfo', 'address', e.target.value)}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Nationality"
                  fullWidth
                  value={newPatient.personalInfo.nationality}
                  onChange={(e) => handleCreateNestedInputChange('personalInfo', 'nationality', e.target.value)}
                />
              </Grid>

              {/* Social History */}
              <Grid item xs={12}>
                <Typography variant="subtitle1" sx={{ mt: 2, mb: 1, fontWeight: 'bold' }}>
                  Social History
                </Typography>
              </Grid>

              <Grid item xs={12} sm={4}>
                <TextField
                  label="Smoking"
                  fullWidth
                  value={newPatient.socialHistory.smoking}
                  onChange={(e) => handleCreateNestedInputChange('socialHistory', 'smoking', e.target.value)}
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <TextField
                  label="Alcohol"
                  fullWidth
                  value={newPatient.socialHistory.alcohol}
                  onChange={(e) => handleCreateNestedInputChange('socialHistory', 'alcohol', e.target.value)}
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <TextField
                  label="Allergies"
                  fullWidth
                  value={newPatient.socialHistory.allergies}
                  onChange={(e) => handleCreateNestedInputChange('socialHistory', 'allergies', e.target.value)}
                />
              </Grid>
            </Grid>

            <Box sx={{ mt: 4, textAlign: 'right' }}>
              <Button variant="outlined" onClick={handleCloseCreateModal} sx={{ mr: 2 }}>
                Cancel
              </Button>
              <Button variant="contained" onClick={handleCreateSave}>
                Save
              </Button>
            </Box>
          </Box>
        </Modal>
      </Box>
    </Layout>
  );
}

