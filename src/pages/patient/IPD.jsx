import * as React from 'react';
import {
  Box,
  Paper,
  Grid,
  Typography,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Button
} from '@mui/material';
import { styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function IPDTable({ rows }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [filters, setFilters] = React.useState({ name: '', phone: '', status: '', doctor: '' });

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const filteredRows = rows.filter((row) =>
    (!filters.name || row.name.toLowerCase().includes(filters.name.toLowerCase())) &&
    (!filters.phone || row.phone.includes(filters.phone)) &&
    (!filters.status || row.status.toLowerCase().includes(filters.status.toLowerCase())) &&
    (!filters.doctor || row.doctor.toLowerCase().includes(filters.doctor.toLowerCase()))
  );

  return (
    <>
      <Grid container spacing={3} sx={{ flexGrow: 1, mb: 2 }}>
        <Grid item size={{ xs: 6, md: 2 }} offset={{ xs: 3, md: 0 }}>
          <TextField label="Filter by Name" name="name" fullWidth onChange={handleFilterChange} />
        </Grid>
        <Grid item size={{ xs: 6, md: 2 }} offset={{ md: 0 }}>
          <TextField label="Filter by Phone" name="phone" fullWidth onChange={handleFilterChange} />
        </Grid>
        <Grid item size={{ xs: 6, md: 2 }}>
          <TextField label="Filter by Status" name="status" fullWidth onChange={handleFilterChange} />
        </Grid>
        <Grid item size={{ xs: 6, md: 2 }}>
          <TextField label="Filter by Doctor" name="doctor" fullWidth onChange={handleFilterChange} />
        </Grid>
      </Grid>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Photo</TableCell>
              <TableCell>Patient Name</TableCell>
              <TableCell>Patient ID</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Blood Group</TableCell>
              <TableCell>Assigned Doctor Name</TableCell>
              <TableCell>Admitted Date</TableCell>
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
                <TableCell>{row.status}</TableCell>
                <TableCell>{row.bloodGroup}</TableCell>
                <TableCell>{row.doctor}</TableCell>
                <TableCell>{row.admittedDate}</TableCell>
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

export default function IPD() {
  const [rows] = React.useState([
    {
      id: 'IP001',
      name: 'Alice Johnson',
      phone: '1234567890',
      status: 'Admitted',
      bloodGroup: 'A+',
      email: 'alice@example.com',
      doctor: 'Dr. Brown',
      admittedDate: '2025-05-01',
      photo: 'https://via.placeholder.com/40'
    },
    {
      id: 'IP002',
      name: 'Robert Smith',
      phone: '2345678901',
      status: 'Discharged',
      bloodGroup: 'B+',
      email: 'robert@example.com',
      doctor: 'Dr. Clark',
      admittedDate: '2025-04-25',
      photo: 'https://via.placeholder.com/40'
    },
    {
      id: 'IP003',
      name: 'Emma Davis',
      phone: '3456789012',
      status: 'Admitted',
      bloodGroup: 'O-',
      email: 'emma@example.com',
      doctor: 'Dr. Evans',
      admittedDate: '2025-05-03',
      photo: 'https://via.placeholder.com/40'
    }
  ]);

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" gutterBottom>In-Patient Department (IPD) List</Typography>
      <IPDTable rows={rows} />
    </Box>
  );
}
