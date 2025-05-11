import * as React from 'react';
import {
  Box,
  Paper,
  Grid,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function DataTable({ rows }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [filters, setFilters] = React.useState({ date: '', name: '', phone: '', email: '' });

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const filteredRows = rows.filter((row) => {
    return (
      (!filters.name || row.name.toLowerCase().includes(filters.name.toLowerCase())) &&
      (!filters.phone || row.phone.includes(filters.phone)) &&
      (!filters.email || row.email.toLowerCase().includes(filters.email.toLowerCase()))
    );
  });

  return (
    <>
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item size={{ xs: 6, md: 2 }} offset={{ xs: 3, md: 0 }}>
          <TextField label="Filter by Name" name="name" fullWidth onChange={handleFilterChange} />
        </Grid>
        <Grid item size={{ xs: 4, md: 2 }} offset={{ md: 'auto' }}>
          <TextField label="Filter by Phone" name="phone" fullWidth onChange={handleFilterChange} />
        </Grid>
        <Grid item size={{ xs: 4, md: 2 }} offset={{ xs: 4, md: 0 }}>
          <TextField label="Filter by Email" name="email" fullWidth onChange={handleFilterChange} />
        </Grid>
      </Grid>
      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Photo</TableCell>
              <TableCell>Patient Name</TableCell>
              <TableCell>Patient ID</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Blood Group</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Assigned Doctor Name</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
              <TableRow key={index}>
                <TableCell><img src={row.photo} alt="" width={40} /></TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.phone}</TableCell>
                <TableCell>{row.bloodGroup}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.doctor}</TableCell>
                <TableCell><Button variant="outlined" size="small">View</Button></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={filteredRows.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </>
  );
}

export default function OPD() {
  const [open, setOpen] = React.useState(false);
  const [rows, setRows] = React.useState([
    { id: 'P001', name: 'John Doe', phone: '1234567890', bloodGroup: 'A+', email: 'john@example.com', doctor: 'Dr. Smith', photo: 'https://via.placeholder.com/40' },
    { id: 'P002', name: 'Jane Smith', phone: '2345678901', bloodGroup: 'B-', email: 'jane@example.com', doctor: 'Dr. Adams', photo: 'https://via.placeholder.com/40' },
    { id: 'P003', name: 'James Bond', phone: '3456789012', bloodGroup: 'O+', email: 'james@example.com', doctor: 'Dr. No', photo: 'https://via.placeholder.com/40' },
  ]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box sx={{ width: '100%', p: 2 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h5">Patients List (OPD)</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={handleOpen}>Add Patient</Button>
      </Box>

      <Grid container spacing={3} sx={{ flexGrow: 1 }}>
        <Grid item size={{ xs: 6, md: 2 }} offset={{ xs: 3, md: 0 }}><Item>1</Item></Grid>
        <Grid item size={{ xs: 4, md: 2 }} offset={{ md: 'auto' }}><Item>2</Item></Grid>
        <Grid item size={{ xs: 4, md: 2 }} offset={{ xs: 4, md: 0 }}><Item>3</Item></Grid>
        <Grid item size={{ xs: 'grow', md: 6 }} offset={{ md: 2 }}><Item>4</Item></Grid>
      </Grid>

      <DataTable rows={rows} />

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Add Patient</DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2} mt={1}>
            <Grid item size={{ xs: 12, md: 6 }}><TextField label="Full Name" fullWidth /></Grid>
            <Grid item size={{ xs: 12, md: 6 }}><TextField label="Phone" fullWidth /></Grid>
            <Grid item size={{ xs: 12, md: 6 }}><TextField label="Blood Group" fullWidth /></Grid>
            <Grid item size={{ xs: 12, md: 6 }}><TextField label="Doctor" fullWidth /></Grid>
            <Grid item size={{ xs: 12 }}><TextField label="Email" fullWidth /></Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" onClick={handleClose}>Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
