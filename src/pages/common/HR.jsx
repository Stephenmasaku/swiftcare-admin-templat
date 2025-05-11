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
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Tabs,
  Tab,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  useTheme,
  Stack,
  Tooltip,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import CloseIcon from '@mui/icons-material/Close';
import TodayIcon from '@mui/icons-material/Today';

// Sample employees data
const initialEmployees = [
  { id: 1, name: 'Alice Johnson', department: 'Nursing', role: 'Senior Nurse', status: 'active', contact: 'alice.johnson@hospital.com' },
  { id: 2, name: 'Mark Smith', department: 'Administration', role: 'HR Manager', status: 'active', contact: 'mark.smith@hospital.com' },
  { id: 3, name: 'Linda Brown', department: 'Laboratory', role: 'Lab Technician', status: 'on leave', contact: 'linda.brown@hospital.com' },
  { id: 4, name: 'James Williams', department: 'Radiology', role: 'Radiology Technician', status: 'active', contact: 'james.williams@hospital.com' },
  { id: 5, name: 'Sophia Davis', department: 'Pharmacy', role: 'Pharmacist', status: 'resigned', contact: 'sophia.davis@hospital.com' },
  { id: 6, name: 'Robert Miller', department: 'Surgery', role: 'Surgeon', status: 'active', contact: 'robert.miller@hospital.com' },
  { id: 7, name: 'Emily Wilson', department: 'Nursing', role: 'Nurse', status: 'active', contact: 'emily.wilson@hospital.com' },
  { id: 8, name: 'Michael Taylor', department: 'Administration', role: 'Receptionist', status: 'on leave', contact: 'michael.taylor@hospital.com' },
  { id: 9, name: 'Jessica Anderson', department: 'Laboratory', role: 'Lab Assistant', status: 'active', contact: 'jessica.anderson@hospital.com' },
  { id: 10, name: 'David Thomas', department: 'Radiology', role: 'Radiologist', status: 'active', contact: 'david.thomas@hospital.com' },
];

// Sample departments data
const initialDepartments = [
  { id: 1, name: 'Nursing', description: 'Nursing staff and management' },
  { id: 2, name: 'Administration', description: 'Administrative and HR' },
  { id: 3, name: 'Laboratory', description: 'Lab staff and technicians' },
  { id: 4, name: 'Radiology', description: 'Radiology specialists' },
  { id: 5, name: 'Pharmacy', description: 'Pharmacists and medication management' },
  { id: 6, name: 'Surgery', description: 'Surgeons and operating room staff' },
];

// Sample leave/off day data
const initialLeaves = [
  { id: 1, employeeName: 'Linda Brown', fromDate: '2024-07-01', toDate: '2024-07-07', reason: 'Vacation' },
  { id: 2, employeeName: 'Michael Taylor', fromDate: '2024-06-15', toDate: '2024-06-20', reason: 'Medical Leave' },
];

// Employee status chip component
const StatusChip = ({ status }) => {
  const colorMap = {
    active: 'success',
    'on leave': 'warning',
    resigned: 'default',
  };
  const label = status.charAt(0).toUpperCase() + status.slice(1);
  return <Chip label={label} color={colorMap[status] || 'default'} size="small" />;
};

function a11yProps(index) {
  return {
    id: `tab-${index}`,
    'aria-controls': `tabpanel-${index}`,
  };
}

export default function DashboardMain() {
  const theme = useTheme();
  // Current tab index: 0 Employees, 1 Departments, 2 Leave
  const [tabValue, setTabValue] = useState(0);

  // State for employees, departments, leaves
  const [employees, setEmployees] = useState(initialEmployees);
  const [departments, setDepartments] = useState(initialDepartments);
  const [leaves, setLeaves] = useState(initialLeaves);

  // Search query per tab, handled via objects for extensibility
  const [searches, setSearches] = useState({
    employees: {
      name: '',
      department: '',
      role: '',
      status: '',
    },
    departments: {
      name: '',
      description: '',
    },
    leaves: {
      employeeName: '',
      fromDate: '',
      toDate: '',
    },
  });

  // Dialog state and form data for add/edit
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState(''); // 'employee' or 'department' or 'leave'
  const [isEdit, setIsEdit] = useState(false);
  const [formData, setFormData] = useState({});

  // Handle tab change
  const handleChangeTab = (event, newValue) => {
    setTabValue(newValue);
    setDialogOpen(false);
    setFormData({});
    setIsEdit(false);
  };

  /* --- Employees Tab Filters and Data --- */
  const filteredEmployees = useMemo(() => {
    return employees.filter(e => {
      const nameMatch = e.name.toLowerCase().includes(searches.employees.name.toLowerCase());
      const deptMatch = searches.employees.department ? e.department.toLowerCase() === searches.employees.department.toLowerCase() : true;
      const roleMatch = e.role.toLowerCase().includes(searches.employees.role.toLowerCase());
      const statusMatch = searches.employees.status ? e.status.toLowerCase() === searches.employees.status.toLowerCase() : true;
      return nameMatch && deptMatch && roleMatch && statusMatch;
    });
  }, [employees, searches.employees]);

  /* --- Departments Tab Filter and Data --- */
  const filteredDepartments = useMemo(() => {
    return departments.filter(d => {
      const nameMatch = d.name.toLowerCase().includes(searches.departments.name.toLowerCase());
      const descMatch = d.description.toLowerCase().includes(searches.departments.description.toLowerCase());
      return nameMatch && descMatch;
    });
  }, [departments, searches.departments]);

  /* --- Leaves Tab Filter and Data --- */
  const filteredLeaves = useMemo(() => {
    return leaves.filter(l => {
      const empMatch = l.employeeName.toLowerCase().includes(searches.leaves.employeeName.toLowerCase());
      let fromDateMatch = true;
      let toDateMatch = true;
      if (searches.leaves.fromDate) {
        fromDateMatch = new Date(l.fromDate) >= new Date(searches.leaves.fromDate);
      }
      if (searches.leaves.toDate) {
        toDateMatch = new Date(l.toDate) <= new Date(searches.leaves.toDate);
      }
      return empMatch && fromDateMatch && toDateMatch;
    });
  }, [leaves, searches.leaves]);

  const openAddDialog = (type) => {
    setDialogType(type);
    setIsEdit(false);
    setFormData({});
    setDialogOpen(true);
  };

  const openEditDialog = (type, data) => {
    setDialogType(type);
    setIsEdit(true);
    setFormData(data);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setFormData({});
    setIsEdit(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (dialogType === 'employee') {
      if (isEdit) {
        // Update existing employee
        setEmployees(prev =>
          prev.map(emp => (emp.id === formData.id ? { ...formData, id: emp.id } : emp))
        );
      } else {
        // Add new employee with unique id
        const newId = employees.length ? Math.max(...employees.map(e => e.id)) + 1 : 1;
        setEmployees(prev => [...prev, { ...formData, id: newId }]);
      }
    } else if (dialogType === 'department') {
      if (isEdit) {
        setDepartments(prev =>
          prev.map(dep => (dep.id === formData.id ? { ...formData, id: dep.id } : dep))
        );
      } else {
        const newId = departments.length ? Math.max(...departments.map(d => d.id)) + 1 : 1;
        setDepartments(prev => [...prev, { ...formData, id: newId }]);
      }
    } else if (dialogType === 'leave') {
      if (isEdit) {
        setLeaves(prev =>
          prev.map(lv => (lv.id === formData.id ? { ...formData, id: lv.id } : lv))
        );
      } else {
        const newId = leaves.length ? Math.max(...leaves.map(l => l.id)) + 1 : 1;
        setLeaves(prev => [...prev, { ...formData, id: newId }]);
      }
    }
    handleDialogClose();
  };

  const handleDelete = (type, id) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;
    if (type === 'employee') {
      setEmployees(prev => prev.filter(e => e.id !== id));
    } else if (type === 'department') {
      setDepartments(prev => prev.filter(d => d.id !== id));
    } else if (type === 'leave') {
      setLeaves(prev => prev.filter(l => l.id !== id));
    }
  };

  // Handle import (simple JSON paste input)
  const handleImport = (type) => {
    let data = prompt('Paste JSON array data to import:');
    if (!data) return;
    try {
      const parsed = JSON.parse(data);
      if (!Array.isArray(parsed)) {
        alert('Invalid data format: Expected an array.');
        return;
      }
      if (type === 'employee') {
        const maxId = employees.length ? Math.max(...employees.map(e => e.id)) : 0;
        const newEmployees = parsed.map((emp, idx) => ({
          ...emp,
          id: maxId + idx + 1,
        }));
        setEmployees(prev => [...prev, ...newEmployees]);
      } else if (type === 'department') {
        const maxId = departments.length ? Math.max(...departments.map(d => d.id)) : 0;
        const newDepartments = parsed.map((dep, idx) => ({
          ...dep,
          id: maxId + idx + 1,
        }));
        setDepartments(prev => [...prev, ...newDepartments]);
      } else if (type === 'leave') {
        const maxId = leaves.length ? Math.max(...leaves.map(l => l.id)) : 0;
        const newLeaves = parsed.map((lv, idx) => ({
          ...lv,
          id: maxId + idx + 1,
        }));
        setLeaves(prev => [...prev, ...newLeaves]);
      }
    } catch (e) {
      alert('Import failed: Invalid JSON format.');
    }
  };

  /* -------- Render Section -------- */
  return (
    <Layout>
      <Box sx={{ p: 2, maxWidth: 1100, mx: 'auto', fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif' }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ color: '#1565c0', mb: 2 }}>
          Hospital Human Resources Management
        </Typography>

        {/* Tabs */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
          <Tabs value={tabValue} onChange={handleChangeTab} aria-label="HR Management Tabs" variant="fullWidth" centered>
            <Tab label="Employees" {...a11yProps(0)} />
            <Tab label="Departments" {...a11yProps(1)} />
            <Tab label="Leave / Off Days" {...a11yProps(2)} />
          </Tabs>
        </Box>

        {/* Tab Panels */}
        {/* Employees Panel */}
        {tabValue === 0 && (
          <Box>
            {/* Summary Cards */}
            <Grid container spacing={2} sx={{ mb: 3 }}>
              <Grid item  size={{ xs: 6, sm:6, md: 3,lg:3 }}>
                <Card elevation={3} sx={{ bgcolor: '#1976d2', color: 'white', py: 2, textAlign: 'center' }}>
                  <Typography variant="h6">Total Employees</Typography>
                  <Typography variant="h4" fontWeight="bold">{employees.length}</Typography>
                </Card>
              </Grid>
              <Grid item size={{ xs: 6, sm:6, md: 3,lg:3 }}>
                <Card elevation={3} sx={{ bgcolor: '#388e3c', color: 'white', py: 2, textAlign: 'center' }}>
                  <Typography variant="h6">Active Employees</Typography>
                  <Typography variant="h4" fontWeight="bold">{employees.filter(e => e.status === 'active').length}</Typography>
                </Card>
              </Grid>
              <Grid item size={{ xs: 6, sm:6, md: 3,lg:3 }}>
                <Card elevation={3} sx={{ bgcolor: '#fbc02d', color: 'black', py: 2, textAlign: 'center' }}>
                  <Typography variant="h6">On Leave</Typography>
                  <Typography variant="h4" fontWeight="bold">{employees.filter(e => e.status === 'on leave').length}</Typography>
                </Card>
              </Grid>
              <Grid item size={{ xs: 6, sm:6, md: 3,lg:3 }}>
                <Card elevation={3} sx={{ bgcolor: '#5d4037', color: 'white', py: 2, textAlign: 'center' }}>
                  <Typography variant="h6">Departments</Typography>
                  <Typography variant="h4" fontWeight="bold">{new Set(employees.map(e => e.department)).size}</Typography>
                </Card>
              </Grid>
            </Grid>

            {/* Advanced Search */}
            <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
              <Typography variant="h6" gutterBottom> Search Employees</Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={3}>
                  <TextField
                    label="Name"
                    variant="outlined"
                    size="small"
                    fullWidth
                    name="name"
                    value={searches.employees.name}
                    onChange={e => setSearches(prev => ({ ...prev, employees: { ...prev.employees, name: e.target.value } }))}
                  />
                </Grid>
                <Grid item size={{ xs: 6, sm:6, md: 3,lg:3 }}>
                  <TextField
                    label="Role"
                    variant="outlined"
                    size="small"
                    fullWidth
                    name="role"
                    value={searches.employees.role}
                    onChange={e => setSearches(prev => ({ ...prev, employees: { ...prev.employees, role: e.target.value } }))}
                  />
                </Grid>
                <Grid item size={{ xs: 6, sm:6, md: 3,lg:3 }}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Department</InputLabel>
                    <Select
                      label="Department"
                      name="department"
                      value={searches.employees.department}
                      onChange={e => setSearches(prev => ({ ...prev, employees: { ...prev.employees, department: e.target.value } }))}
                    >
                      <MenuItem value="">All</MenuItem>
                      {[...new Set(employees.map(e => e.department))].map(dept => (
                        <MenuItem key={dept} value={dept}>{dept}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item size={{ xs: 6, sm:6, md: 3,lg:3 }}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Status</InputLabel>
                    <Select
                      label="Status"
                      name="status"
                      value={searches.employees.status}
                      onChange={e => setSearches(prev => ({ ...prev, employees: { ...prev.employees, status: e.target.value } }))}
                    >
                      <MenuItem value="">All</MenuItem>
                      <MenuItem value="active">Active</MenuItem>
                      <MenuItem value="on leave">On Leave</MenuItem>
                      <MenuItem value="resigned">Resigned</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Paper>

            {/* Employee Actions */}
            <Box mb={1} display="flex" justifyContent="space-between" flexWrap="wrap" gap={1}>
              <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={() => openAddDialog('employee')}>
                Add Employee
              </Button>
              <Button variant="outlined" startIcon={<ImportExportIcon />} onClick={() => handleImport('employee')}>
                Import Employees
              </Button>
            </Box>

            {/* Employees Table */}
            <TableContainer component={Paper} elevation={3}>
              <Table size="small" stickyHeader>
                <TableHead sx={{ bgcolor: theme.palette.grey[200] }}>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Department</TableCell>
                    <TableCell>Role</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Contact</TableCell>
                    <TableCell align="center" sx={{ minWidth: 130 }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredEmployees.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} align="center" sx={{ py: 4, fontStyle: 'italic', color: '#999' }}>
                        No employees found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredEmployees.map(emp => (
                      <TableRow key={emp.id} hover>
                        <TableCell>{emp.name}</TableCell>
                        <TableCell>{emp.department}</TableCell>
                        <TableCell>{emp.role}</TableCell>
                        <TableCell><StatusChip status={emp.status} /></TableCell>
                        <TableCell>{emp.contact}</TableCell>
                        <TableCell align="center">
                          <Tooltip title="Edit">
                            <IconButton size="small" onClick={() => openEditDialog('employee', emp)}><EditIcon fontSize="small" /></IconButton>
                          </Tooltip>
                          <Tooltip title="Delete">
                            <IconButton size="small" onClick={() => handleDelete('employee', emp.id)}><DeleteIcon fontSize="small" /></IconButton>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}

        {/* Departments Panel */}
        {tabValue === 1 && (
          <Box>
            {/* Advanced Search */}
            <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
              <Typography variant="h6" gutterBottom> Search Departments</Typography>
              <Grid container spacing={2}>
                <Grid item size={{ xs: 6, sm:6, md: 6,lg:6 }}>
                  <TextField
                    label="Name"
                    variant="outlined"
                    size="small"
                    fullWidth
                    name="name"
                    value={searches.departments.name}
                    onChange={e => setSearches(prev => ({ ...prev, departments: { ...prev.departments, name: e.target.value } }))}
                  />
                </Grid>
                <Grid item size={{ xs: 6, sm:6, md: 6,lg:6 }}>
                  <TextField
                    label="Description"
                    variant="outlined"
                    size="small"
                    fullWidth
                    name="description"
                    value={searches.departments.description}
                    onChange={e => setSearches(prev => ({ ...prev, departments: { ...prev.departments, description: e.target.value } }))}
                  />
                </Grid>
              </Grid>
            </Paper>

            {/* Department Actions */}
            <Box mb={1} display="flex" justifyContent="space-between" flexWrap="wrap" gap={1}>
              <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={() => openAddDialog('department')}>
                Add Department
              </Button>
              <Button variant="outlined" startIcon={<ImportExportIcon />} onClick={() => handleImport('department')}>
                Import Departments
              </Button>
            </Box>

            {/* Departments Table */}
            <TableContainer component={Paper} elevation={3}>
              <Table size="small" stickyHeader>
                <TableHead sx={{ bgcolor: theme.palette.grey[200] }}>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell align="center" sx={{ minWidth: 120 }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredDepartments.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={3} align="center" sx={{ py: 4, fontStyle: 'italic', color: '#999' }}>
                        No departments found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredDepartments.map(dep => (
                      <TableRow key={dep.id} hover>
                        <TableCell>{dep.name}</TableCell>
                        <TableCell>{dep.description}</TableCell>
                        <TableCell align="center">
                          <Tooltip title="Edit">
                            <IconButton size="small" onClick={() => openEditDialog('department', dep)}><EditIcon fontSize="small" /></IconButton>
                          </Tooltip>
                          <Tooltip title="Delete">
                            <IconButton size="small" onClick={() => handleDelete('department', dep.id)}><DeleteIcon fontSize="small" /></IconButton>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}

        {/* Leave Tab */}
        {tabValue === 2 && (
          <Box>
            {/* Advanced Search for Leave */}
            <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
              <Typography variant="h6" gutterBottom> Search Leave / Off Days</Typography>
              <Grid container spacing={2}>
                <Grid item size={{ xs: 6, sm:6, md: 4,lg:4 }}>
                  <TextField
                    label="Employee Name"
                    variant="outlined"
                    size="small"
                    fullWidth
                    name="employeeName"
                    value={searches.leaves.employeeName}
                    onChange={e => setSearches(prev => ({ ...prev, leaves: { ...prev.leaves, employeeName: e.target.value } }))}
                  />
                </Grid>
                <Grid item size={{ xs: 6, sm:6, md: 4,lg:4 }}>
                  <TextField
                    label="From Date"
                    variant="outlined"
                    size="small"
                    type="date"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    name="fromDate"
                    value={searches.leaves.fromDate}
                    onChange={e => setSearches(prev => ({ ...prev, leaves: { ...prev.leaves, fromDate: e.target.value } }))}
                  />
                </Grid>
                <Grid item size={{ xs: 6, sm:6, md: 4,lg:4 }}>
                  <TextField
                    label="To Date"
                    variant="outlined"
                    size="small"
                    type="date"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    name="toDate"
                    value={searches.leaves.toDate}
                    onChange={e => setSearches(prev => ({ ...prev, leaves: { ...prev.leaves, toDate: e.target.value } }))}
                  />
                </Grid>
              </Grid>
            </Paper>

            {/* Leave Actions */}
            <Box mb={1} display="flex" justifyContent="space-between" flexWrap="wrap" gap={1}>
              <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={() => openAddDialog('leave')}>
                Add Leave / Off Day
              </Button>
              <Button variant="outlined" startIcon={<ImportExportIcon />} onClick={() => handleImport('leave')}>
                Import Leaves
              </Button>
            </Box>

            {/* Leave Table */}
            <TableContainer component={Paper} elevation={3}>
              <Table size="small" stickyHeader>
                <TableHead sx={{ bgcolor: theme.palette.grey[200] }}>
                  <TableRow>
                    <TableCell>Employee Name</TableCell>
                    <TableCell>From Date</TableCell>
                    <TableCell>To Date</TableCell>
                    <TableCell>Reason</TableCell>
                    <TableCell align="center" sx={{ minWidth: 120 }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredLeaves.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} align="center" sx={{ py: 4, fontStyle: 'italic', color: '#999' }}>
                        No leave records found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredLeaves.map(leave => (
                      <TableRow key={leave.id} hover>
                        <TableCell>{leave.employeeName}</TableCell>
                        <TableCell>{leave.fromDate}</TableCell>
                        <TableCell>{leave.toDate}</TableCell>
                        <TableCell>{leave.reason}</TableCell>
                        <TableCell align="center">
                          <Tooltip title="Edit">
                            <IconButton size="small" onClick={() => openEditDialog('leave', leave)}><EditIcon fontSize="small" /></IconButton>
                          </Tooltip>
                          <Tooltip title="Delete">
                            <IconButton size="small" onClick={() => handleDelete('leave', leave.id)}><DeleteIcon fontSize="small" /></IconButton>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}

        {/* Add / Edit Dialog */}
        <Dialog open={dialogOpen} onClose={handleDialogClose} maxWidth="sm" fullWidth>
          <DialogTitle sx={{ m: 0, p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', bgcolor: theme.palette.primary.main, color: 'white' }}>
            {isEdit ? 'Edit' : 'Add'}{' '}
            {dialogType === 'employee' ? 'Employee' : dialogType === 'department' ? 'Department' : 'Leave / Off Day'}
            <IconButton
              aria-label="close"
              onClick={handleDialogClose}
              sx={{ color: 'white' }}
              size="large"
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent dividers>
            {dialogType === 'employee' && (
              <Box component="form" noValidate autoComplete="off" sx={{ mt: 1 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Full Name"
                      name="name"
                      value={formData.name || ''}
                      onChange={handleInputChange}
                      fullWidth
                      required
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth size="small" required>
                      <InputLabel>Department</InputLabel>
                      <Select
                        name="department"
                        value={formData.department || ''}
                        label="Department"
                        onChange={handleInputChange}
                      >
                        {departments.map(d => (
                          <MenuItem key={d.id} value={d.name}>{d.name}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Role"
                      name="role"
                      value={formData.role || ''}
                      onChange={handleInputChange}
                      fullWidth
                      required
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth size="small" required>
                      <InputLabel>Status</InputLabel>
                      <Select
                        name="status"
                        value={formData.status || ''}
                        label="Status"
                        onChange={handleInputChange}
                      >
                        <MenuItem value="active">Active</MenuItem>
                        <MenuItem value="on leave">On Leave</MenuItem>
                        <MenuItem value="resigned">Resigned</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      label="Contact Email"
                      name="contact"
                      value={formData.contact || ''}
                      onChange={handleInputChange}
                      fullWidth
                      required
                      size="small"
                      type="email"
                    />
                  </Grid>
                </Grid>
              </Box>
            )}

            {dialogType === 'department' && (
              <Box component="form" noValidate autoComplete="off" sx={{ mt: 1 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      label="Department Name"
                      name="name"
                      value={formData.name || ''}
                      onChange={handleInputChange}
                      fullWidth
                      required
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Description"
                      name="description"
                      value={formData.description || ''}
                      onChange={handleInputChange}
                      fullWidth
                      size="small"
                      multiline
                      rows={3}
                    />
                  </Grid>
                </Grid>
              </Box>
            )}

            {dialogType === 'leave' && (
              <Box component="form" noValidate autoComplete="off" sx={{ mt: 1 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <FormControl fullWidth size="small" required>
                      <InputLabel>Employee Name</InputLabel>
                      <Select
                        name="employeeName"
                        value={formData.employeeName || ''}
                        label="Employee Name"
                        onChange={handleInputChange}
                      >
                        {employees.map(e => (
                          <MenuItem key={e.id} value={e.name}>{e.name}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="From Date"
                      type="date"
                      name="fromDate"
                      value={formData.fromDate || ''}
                      onChange={handleInputChange}
                      fullWidth
                      required
                      size="small"
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="To Date"
                      type="date"
                      name="toDate"
                      value={formData.toDate || ''}
                      onChange={handleInputChange}
                      fullWidth
                      required
                      size="small"
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Reason"
                      name="reason"
                      value={formData.reason || ''}
                      onChange={handleInputChange}
                      fullWidth
                      size="small"
                      multiline
                      rows={2}
                    />
                  </Grid>
                </Grid>
              </Box>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose} color="inherit" startIcon={<CloseIcon />}>
              Cancel
            </Button>
            <Button onClick={handleSave} variant="contained" color="primary">
              {isEdit ? 'Update' : 'Save'}
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Layout>
  );
}

