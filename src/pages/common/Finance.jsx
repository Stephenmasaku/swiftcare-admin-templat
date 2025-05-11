import React, { useState, useMemo } from 'react';
import Layout from '../../components/layout/Layout';
import {
  Box,
  Typography,
  Grid,
  Card,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  TextField,
  useTheme,
} from '@mui/material';
import {
  Bar,
  Pie,
} from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

// Sample recent financial transactions data
const transactionsData = [
  { id: 1, date: '2025-05-01', description: 'Patient Payments', type: 'income', amount: 5000 },
  { id: 2, date: '2025-05-02', description: 'Medical Supplies Purchase', type: 'expense', amount: 1200 },
  { id: 3, date: '2025-05-03', description: 'Lab Service Income', type: 'income', amount: 3200 },
  { id: 4, date: '2025-05-04', description: 'Staff Salaries', type: 'expense', amount: 4500 },
  { id: 5, date: '2025-05-05', description: 'Pharmacy Sales', type: 'income', amount: 2700 },
  { id: 6, date: '2025-05-06', description: 'Utility Bills', type: 'expense', amount: 800 },
  { id: 7, date: '2025-05-07', description: 'Insurance Claims Income', type: 'income', amount: 2200 },
  { id: 8, date: '2025-05-08', description: 'Maintenance Expense', type: 'expense', amount: 600 },
];

// Generate totals for summary cards
const totalIncome = transactionsData
  .filter((t) => t.type === 'income')
  .reduce((sum, t) => sum + t.amount, 0);

const totalExpense = transactionsData
  .filter((t) => t.type === 'expense')
  .reduce((sum, t) => sum + t.amount, 0);

const netProfit = totalIncome - totalExpense;

// Chart data for income vs expense (Pie)
const incomeExpensePieData = {
  labels: ['Income', 'Expense'],
  datasets: [
    {
      data: [totalIncome, totalExpense],
      backgroundColor: ['#4caf50', '#f44336'],
      hoverOffset: 10,
    },
  ],
};

// Chart data for daily income and expenses (Bar chart for last 8 days example)
const barChartLabels = transactionsData.map(t => t.date);
const incomeBarData = transactionsData.map(t => (t.type === 'income' ? t.amount : 0));
const expenseBarData = transactionsData.map(t => (t.type === 'expense' ? t.amount : 0));

const incomeExpenseBarData = {
  labels: barChartLabels,
  datasets: [
    {
      label: 'Income',
      data: incomeBarData,
      backgroundColor: '#4caf50',
    },
    {
      label: 'Expense',
      data: expenseBarData,
      backgroundColor: '#f44336',
    },
  ],
};

export default function DashboardMain({ children }) {
  const theme = useTheme();


  const [searchQuery, setSearchQuery] = useState('');

  // Filter transactions by description
  const filteredTransactions = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return transactionsData;
    return transactionsData.filter(({ description }) =>
      description.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  return (
   <Layout>
    <Box sx={{ p: 3, maxWidth: 1100, mx: 'auto', fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif' }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ color: '#1b5e20' }}>
        Finance Dashboard
      </Typography>
      <Typography variant="subtitle1" gutterBottom sx={{ color: '#555', mb: 4 }}>
        Review hospital financials, track incomes and expenses, and analyze trends.
      </Typography>

      {/* Summary Cards */}
      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid item size={{ xs: 6, sm :6, md: 4 , lg:4}}>
          <Card elevation={3} sx={{ bgcolor: '#4caf50', color: 'white', py: 3, textAlign: 'center' }}>
            <Typography variant="h6">Total Income</Typography>
            <Typography variant="h4" fontWeight="bold">${totalIncome.toLocaleString()}</Typography>
          </Card>
        </Grid>
        <Grid item size={{ xs: 6, sm :6, md: 4 , lg:4}}>
          <Card elevation={3} sx={{ bgcolor: '#f44336', color: 'white', py: 3, textAlign: 'center' }}>
            <Typography variant="h6">Total Expenses</Typography>
            <Typography variant="h4" fontWeight="bold">${totalExpense.toLocaleString()}</Typography>
          </Card>
        </Grid>
        <Grid item size={{ xs: 6, sm :6, md: 4 , lg:4}}>
          <Card elevation={3} sx={{ bgcolor: '#1b5e20', color: 'white', py: 3, textAlign: 'center' }}>
            <Typography variant="h6">Net Profit</Typography>
            <Typography variant="h4" fontWeight="bold">${netProfit.toLocaleString()}</Typography>
          </Card>
        </Grid>
      </Grid>

      {/* Search input */}
      <Box sx={{ mb: 3, maxWidth: 500 }}>
        <TextField
          variant="outlined"
          size="small"
          label="Search transactions by description"
          fullWidth
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Enter description"
        />
      </Box>

      {/* Transactions Table */}
      <TableContainer component={Paper} elevation={3} sx={{ mb: 5 }}>
        <Table>
          <TableHead sx={{ bgcolor: theme.palette.grey[200] }}>
            <TableRow>
              <TableCell><strong>Date</strong></TableCell>
              <TableCell><strong>Description</strong></TableCell>
              <TableCell><strong>Type</strong></TableCell>
              <TableCell align="right"><strong>Amount ($)</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredTransactions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} align="center" sx={{ py: 4, fontStyle: 'italic', color: '#999' }}>
                  No transactions found.
                </TableCell>
              </TableRow>
            ) : (
              filteredTransactions.map(({ id, date, description, type, amount }) => (
                <TableRow key={id} hover>
                  <TableCell>{date}</TableCell>
                  <TableCell>{description}</TableCell>
                  <TableCell sx={{ color: type === 'income' ? '#4caf50' : '#f44336', fontWeight: 'bold' }}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </TableCell>
                  <TableCell align="right">${amount.toLocaleString()}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Charts */}
      <Grid container spacing={4}>
        <Grid item size={{ xs: 6, sm :6, md: 8 , lg:8}}>
          <Card elevation={4} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Income vs Expense (Last 8 Days)
            </Typography>
            <Bar
              data={incomeExpenseBarData}
              options={{
                responsive: true,
                plugins: {
                  legend: { position: 'top' },
                  tooltip: { mode: 'index', intersect: false },
                },
                scales: {
                  x: { grid: { display: false } },
                  y: { beginAtZero: true },
                },
              }}
            />
          </Card>
        </Grid>

        <Grid item size={{ xs: 6, sm :6, md: 4 , lg:4}}>
          <Card elevation={4} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Income vs Expense Ratio
            </Typography>
            <Pie
              data={incomeExpensePieData}
              options={{
                responsive: true,
                plugins: {
                  legend: { position: 'bottom' },
                  tooltip: { enabled: true },
                },
              }}
            />
            <br/>
          </Card>
        </Grid>
      </Grid>
    </Box>
     </Layout>
  );
}
