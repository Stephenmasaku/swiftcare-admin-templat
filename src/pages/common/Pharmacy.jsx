import React, { useState, useMemo } from 'react';
import Layout from '../../components/layout/Layout';
import {
  Box,
  Typography,
  Grid,
  Card,
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
  Modal,
  Divider,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  useTheme,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

// Sample medicine data
const initialMedicineData = [
  { id: 1, name: 'Paracetamol', category: 'Analgesic', stock: 120, price: 0.5, expiry: '2025-08-12' },
  { id: 2, name: 'Amoxicillin', category: 'Antibiotic', stock: 25, price: 1.2, expiry: '2023-12-01' },
  { id: 3, name: 'Metformin', category: 'Antidiabetic', stock: 50, price: 0.8, expiry: '2024-05-30' },
  { id: 4, name: 'Aspirin', category: 'Analgesic', stock: 15, price: 0.3, expiry: '2023-04-20' },
  { id: 5, name: 'Atorvastatin', category: 'Cholesterol', stock: 40, price: 1.5, expiry: '2025-11-15' },
  { id: 6, name: 'Lisinopril', category: 'Antihypertensive', stock: 0, price: 1.1, expiry: '2024-09-10' },
  { id: 7, name: 'Omeprazole', category: 'Antacid', stock: 70, price: 0.7, expiry: '2024-07-22' },
  { id: 8, name: 'Cetirizine', category: 'Antihistamine', stock: 80, price: 0.4, expiry: '2023-10-05' },
  { id: 9, name: 'Ibuprofen', category: 'Analgesic', stock: 52, price: 0.6, expiry: '2023-03-15' },
  { id: 10, name: 'Simvastatin', category: 'Cholesterol', stock: 28, price: 1.4, expiry: '2024-01-01' },
];

// Helper to calculate days difference from today to expiry date
const daysToExpiry = (expiryDateStr) => {
  const today = new Date();
  const expiryDate = new Date(expiryDateStr);
  const diffTime = expiryDate - today;
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

// Chip color depending on expiry status
const ExpiryChip = ({ expiry }) => {
  const days = daysToExpiry(expiry);
  if (days < 0) {
    return <Chip label="Expired" color="error" size="small" />;
  }
  if (days <= 90) {
    return <Chip label="Expiring Soon" color="warning" size="small" />;
  }
  return <Chip label="Valid" color="success" size="small" />;
};

const styleModal = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  maxWidth: 500,
  width: '90%',
  maxHeight: '80vh',
  overflowY: 'auto',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: 2,
  p: 4,
};

export default function DashboardMain() {
  const theme = useTheme();

  const [medicines, setMedicines] = useState(initialMedicineData);

  // Filters state
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [stockFilter, setStockFilter] = useState('');

  // Modals controls
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);

  // Selected medicine for view/edit
  const [selectedMedicine, setSelectedMedicine] = useState(null);

  // New medicine form state
  const [newMedicine, setNewMedicine] = useState({
    name: '',
    category: '',
    stock: '',
    price: '',
    expiry: '',
  });

  // Edit medicine form state (start null)
  const [editMedicine, setEditMedicine] = useState(null);

  // Filter medicines according to filters
  const filteredMedicines = useMemo(() => {
    return medicines.filter((med) => {
      const matchesName = med.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = categoryFilter ? med.category === categoryFilter : true;
      let matchesStock = true;
      if (stockFilter === 'low') matchesStock = med.stock > 0 && med.stock <= 20;
      else if (stockFilter === 'out') matchesStock = med.stock === 0;
      return matchesName && matchesCategory && matchesStock;
    });
  }, [medicines, searchQuery, categoryFilter, stockFilter]);

  // Handle input change for create form
  const handleNewMedicineChange = (field, value) => {
    setNewMedicine((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Handle input change for edit form
  const handleEditMedicineChange = (field, value) => {
    setEditMedicine((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Open modals
  const openCreateModal = () => {
    setNewMedicine({ name: '', category: '', stock: '', price: '', expiry: '' });
    setCreateModalOpen(true);
  };

  const openEditModal = (medicine) => {
    setEditMedicine({ ...medicine });
    setEditModalOpen(true);
  };

  const openViewModal = (medicine) => {
    setSelectedMedicine(medicine);
    setViewModalOpen(true);
  };

  // Close modals
  const closeCreateModal = () => setCreateModalOpen(false);
  const closeEditModal = () => setEditModalOpen(false);
  const closeViewModal = () => setViewModalOpen(false);

  // Handle creating new medicine
  const handleCreateSave = () => {
    if (
      !newMedicine.name ||
      !newMedicine.category ||
      newMedicine.stock === '' ||
      newMedicine.price === '' ||
      !newMedicine.expiry
    ) {
      alert('Please fill all fields');
      return;
    }
    const newMed = {
      id: medicines.length > 0 ? medicines[medicines.length - 1].id + 1 : 1,
      name: newMedicine.name,
      category: newMedicine.category,
      stock: Number(newMedicine.stock),
      price: Number(newMedicine.price),
      expiry: newMedicine.expiry,
    };
    setMedicines((prev) => [...prev, newMed]);
    setCreateModalOpen(false);
  };

  // Handle saving edits
  const handleEditSave = () => {
    if (
      !editMedicine.name ||
      !editMedicine.category ||
      editMedicine.stock === '' ||
      editMedicine.price === '' ||
      !editMedicine.expiry
    ) {
      alert('Please fill all fields');
      return;
    }
    setMedicines((prev) =>
      prev.map((med) => (med.id === editMedicine.id ? { ...editMedicine, stock: Number(editMedicine.stock), price: Number(editMedicine.price) } : med))
    );
    setEditModalOpen(false);
  };

  // Handle delete medicine with confirmation
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this medicine?')) {
      setMedicines((prev) => prev.filter((med) => med.id !== id));
    }
  };

  // Categories for filter dropdown (unique from medicines)
  const categories = [...new Set(medicines.map((m) => m.category))].sort();

  return (
    <Layout>
      <Box sx={{ p: 3, maxWidth: 1100, mx: 'auto', fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif' }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ color: '#2c387e' }}>
          Pharmacy Management
        </Typography>
        <Typography variant="subtitle1" gutterBottom sx={{ color: '#555', mb: 4 }}>
          Manage medicines inventory, track stock and expiry details efficiently.
        </Typography>

        {/* Filters and Add Button */}
        <Grid container spacing={2} alignItems="center" sx={{
  mb: 4,
  bgcolor: 'white',
  borderRadius: 1, 
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center', 
  p: 1, 
  height: '100%', 
}}
>
          <Grid item size="{{xs:12, sm=12 , md:3, lg:3}}">
            <TextField
              label="Search by Name"
              variant="outlined"
              size="small"
              fullWidth
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </Grid>
          <Grid item size="{{xs:12, sm=12 , md:3, lg:3}}">
            <FormControl fullWidth size="small" sx={{ m: 1, minWidth: 225 }} size="small">
              <InputLabel id="demo-simple-select-label">Category</InputLabel>
              <Select
              labelId="demo-simple-select-label"
               id="demo-simple-select"
                value={categoryFilter}
                label="Category"
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                <MenuItem value="">All</MenuItem>
                {categories.map((cat) => (
                  <MenuItem key={cat} value={cat}>
                    {cat}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid itemsize="{{xs:12, sm=12 , md:3, lg:3}}">
            <FormControl fullWidth sx={{ m: 1, minWidth: 225 }} size="small" size="small">
              <InputLabel id="demo-simple-select-label">Stock Status</InputLabel>
              <Select
              labelId="demo-simple-select-label"
               id="demo-simple-select"
                value={stockFilter}
                label="Stock Status"
                onChange={(e) => setStockFilter(e.target.value)}
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="low">Low (1-20)</MenuItem>
                <MenuItem value="out">Out of Stock</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item size="{{xs:12, sm=12 , md:3, lg:3}}" textAlign={{ xs: 'left', md: 'right' }}>
            <Button variant="contained" onClick={openCreateModal}>
              Add New Medicine
            </Button>
          </Grid>
        </Grid>

        {/* Medicines Table */}
        <TableContainer component={Paper} elevation={3}>
          <Table>
            <TableHead sx={{ bgcolor: theme.palette.grey[200] }}>
              <TableRow>
                <TableCell><strong>Name</strong></TableCell>
                <TableCell><strong>Category</strong></TableCell>
                <TableCell align="right"><strong>Stock</strong></TableCell>
                <TableCell align="right"><strong>Price ($)</strong></TableCell>
                <TableCell align="center"><strong>Expiry</strong></TableCell>
                <TableCell align="center"><strong>Status</strong></TableCell>
                <TableCell align="center"><strong>Actions</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredMedicines.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} align="center" sx={{ py: 4, fontStyle: 'italic', color: '#999' }}>
                    No medicines found.
                  </TableCell>
                </TableRow>
              ) : (
                filteredMedicines.map((med) => (
                  <TableRow key={med.id} hover>
                    <TableCell>{med.name}</TableCell>
                    <TableCell>{med.category}</TableCell>
                    <TableCell align="right" sx={{ color: med.stock === 0 ? '#d32f2f' : undefined }}>
                      {med.stock}
                    </TableCell>
                    <TableCell align="right">{med.price.toFixed(2)}</TableCell>
                    <TableCell align="center">{med.expiry}</TableCell>
                    <TableCell align="center"><ExpiryChip expiry={med.expiry} /></TableCell>
                    <TableCell align="center" sx={{ whiteSpace: 'nowrap', gap: 1, display: 'flex', justifyContent: 'center' }}>
                      <Button size="small" variant="outlined" onClick={() => openViewModal(med)}>
                        View
                      </Button>
                      <Button size="small" variant="outlined" color="primary" onClick={() => openEditModal(med)}>
                        Edit
                      </Button>
                      <Button size="small" variant="outlined" color="error" onClick={() => handleDelete(med.id)}>
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Create Modal */}
        <Modal open={createModalOpen} onClose={closeCreateModal} aria-labelledby="create-medicine-modal" closeAfterTransition>
          <Box sx={styleModal}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
              <Typography id="create-medicine-modal" variant="h6" component="h2">
                Add New Medicine
              </Typography>
              <IconButton onClick={closeCreateModal} size="small" aria-label="close">
                <CloseIcon />
              </IconButton>
            </Box>
            <Divider sx={{ mb: 2 }} />
            <Grid container spacing={2}>
              <Grid item size="{{xs:12, sm=12 , md:12, lg:12}}">
                <TextField
                  label="Name"
                  fullWidth
                  value={newMedicine.name}
                  onChange={(e) => handleNewMedicineChange('name', e.target.value)}
                />
              </Grid>
              <Grid item size="{{xs:12, sm=12 , md:12, lg:12}}">
                <TextField
                  label="Category"
                  fullWidth
                  value={newMedicine.category}
                  onChange={(e) => handleNewMedicineChange('category', e.target.value)}
                />
              </Grid>
              <Grid item size="{{xs:12, sm=12 , md:6, lg:6}}">
                <TextField
                  label="Stock"
                  type="number"
                  inputProps={{ min: 0 }}
                  fullWidth
                  value={newMedicine.stock}
                  onChange={(e) => handleNewMedicineChange('stock', e.target.value)}
                />
              </Grid>
              <Grid item size="{{xs:12, sm=12 , md:6, lg:6}}">
                <TextField
                  label="Price ($)"
                  type="number"
                  inputProps={{ min: 0, step: 0.01 }}
                  fullWidth
                  value={newMedicine.price}
                  onChange={(e) => handleNewMedicineChange('price', e.target.value)}
                />
              </Grid>
              <Grid item size="{{xs:12, sm=12 , md:12, lg:12}}">
                <TextField
                  label="Expiry Date"
                  type="date"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  value={newMedicine.expiry}
                  onChange={(e) => handleNewMedicineChange('expiry', e.target.value)}
                />
              </Grid>
            </Grid>
            <Box mt={3} textAlign="right">
              <Button variant="outlined" onClick={closeCreateModal} sx={{ mr: 2 }}>
                Cancel
              </Button>
              <Button variant="contained" onClick={handleCreateSave}>
                Save
              </Button>
            </Box>
          </Box>
        </Modal>

        {/* Edit Modal */}
        <Modal open={editModalOpen} onClose={closeEditModal} aria-labelledby="edit-medicine-modal" closeAfterTransition>
          <Box sx={styleModal}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
              <Typography id="edit-medicine-modal" variant="h6" component="h2">
                Edit Medicine
              </Typography>
              <IconButton onClick={closeEditModal} size="small" aria-label="close">
                <CloseIcon />
              </IconButton>
            </Box>
            <Divider sx={{ mb: 2 }} />
            {editMedicine && (
              <Grid container spacing={2}>
                <Grid item size="{{xs:12, sm=12 , md:12, lg:12}}">
                  <TextField
                    label="Name"
                    fullWidth
                    value={editMedicine.name}
                    onChange={(e) => handleEditMedicineChange('name', e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Category"
                    fullWidth
                    value={editMedicine.category}
                    onChange={(e) => handleEditMedicineChange('category', e.target.value)}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Stock"
                    type="number"
                    inputProps={{ min: 0 }}
                    fullWidth
                    value={editMedicine.stock}
                    onChange={(e) => handleEditMedicineChange('stock', e.target.value)}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Price ($)"
                    type="number"
                    inputProps={{ min: 0, step: 0.01 }}
                    fullWidth
                    value={editMedicine.price}
                    onChange={(e) => handleEditMedicineChange('price', e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Expiry Date"
                    type="date"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    value={editMedicine.expiry}
                    onChange={(e) => handleEditMedicineChange('expiry', e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} textAlign="right">
                  <Button variant="outlined" onClick={closeEditModal} sx={{ mr: 2 }}>
                    Cancel
                  </Button>
                  <Button variant="contained" onClick={handleEditSave}>
                    Save
                  </Button>
                </Grid>
              </Grid>
            )}
          </Box>
        </Modal>

        {/* View Modal */}
        <Modal open={viewModalOpen} onClose={closeViewModal} aria-labelledby="view-medicine-modal" closeAfterTransition>
          <Box sx={{ ...styleModal, maxWidth: 400 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
              <Typography id="view-medicine-modal" variant="h6" component="h2">
                Medicine Details
              </Typography>
              <IconButton onClick={closeViewModal} size="small" aria-label="close">
                <CloseIcon />
              </IconButton>
            </Box>
            <Divider sx={{ mb: 2 }} />
            {selectedMedicine && (
              <Box>
                <Typography variant="subtitle1"><strong>Name:</strong> {selectedMedicine.name}</Typography>
                <Typography variant="subtitle1"><strong>Category:</strong> {selectedMedicine.category}</Typography>
                <Typography variant="subtitle1"><strong>Stock:</strong> {selectedMedicine.stock}</Typography>
                <Typography variant="subtitle1"><strong>Price:</strong> ${selectedMedicine.price.toFixed(2)}</Typography>
                <Typography variant="subtitle1"><strong>Expiry Date:</strong> {selectedMedicine.expiry}</Typography>
                <Box mt={2}>
                  <ExpiryChip expiry={selectedMedicine.expiry} />
                </Box>
              </Box>
            )}
          </Box>
        </Modal>
      </Box>
    </Layout>
  );
}