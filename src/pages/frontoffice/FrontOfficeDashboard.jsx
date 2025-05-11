import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActionArea,
  useTheme,
} from '@mui/material';
import {
  Bar,
  Pie,
} from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

ChartJS.register(BarElement, CategoryScale, LinearScale, ArcElement, Tooltip, Legend);

const frontOfficeItems = [
  { title: 'Patient Registration', icon: '📝' },
  { title: 'Appointment Booking', icon: '📅' },
  { title: 'Billing & Payments', icon: '💳' },
  { title: 'Enquiries', icon: '❓' },
  { title: 'Visitor Management', icon: '👥' },
  { title: 'Reception Desk', icon: '🏢' },
];

const calendarEvents = [
  { title: 'John Doe - General Checkup', date: '2025-05-06', color: '#1976d2' },
  { title: 'Jane Smith - Dental', date: '2025-05-06', color: '#388e3c' },
  { title: 'Sam Wilson - Pediatrics', date: '2025-05-07', color: '#f57c00' },
  { title: 'Anna Lee - Radiology', date: '2025-05-08', color: '#d32f2f' },
  { title: 'Paul Adams - Billing Query', date: '2025-05-09', color: '#512da8' },
];

// Sample data for charts
const dailyPatientsData = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [
    {
      label: 'Patients Registered',
      data: [18, 22, 20, 24, 30, 15, 10],
      backgroundColor: '#1976d2',
    },
  ],
};

const enquiryPieData = {
  labels: ['Billing', 'Appointments', 'General Info', 'Others'],
  datasets: [
    {
      data: [40, 30, 20, 10],
      backgroundColor: ['#388e3c', '#f57c00', '#1976d2', '#9e9e9e'],
      hoverOffset: 10,
    },
  ],
};

export default function FrontOfficeDashboard() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        p: 3,
        maxWidth: 1000,
        mx: 'auto',
        fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
      }}
    >
      <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ color: '#2e3b55' }}>
        Front Office - Hospital Management
      </Typography>

      <Typography variant="subtitle1" sx={{ mb: 3, color: '#555' }}>
        Manage patient registration, appointments, billing, and front office tasks.
      </Typography>

      {/* Quick Access Cards */}
      <Grid container spacing={2} sx={{ mb: 4 }}>
        {frontOfficeItems.map(({ title, icon }, idx) => (
          <Grid item xs={12} sm={6} md={4} key={idx}>
            <CardActionArea>
              <Card
                elevation={3}
                sx={{
                  height: 120,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  bgcolor: '#fff',
                  borderRadius: 2,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    bgcolor: '#1976d2',
                    color: '#fff',
                  },
                  cursor: 'pointer',
                }}
              >
                <Typography variant="h3" component="div" sx={{ mb: 1 }}>
                  {icon}
                </Typography>
                <Typography
                  variant="h6"
                  align="center"
                  sx={{ fontWeight: '600', userSelect: 'none' }}
                >
                  {title}
                </Typography>
              </Card>
            </CardActionArea>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        {/* Appointments Calendar */}
        <Grid item xs={12} md={6}>
          <Card elevation={4} sx={{ p: 2, height: '100%' }}>
            <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
              Today's Appointments
            </Typography>
            <FullCalendar
              plugins={[dayGridPlugin, interactionPlugin]}
              initialView="dayGridWeek"
              events={calendarEvents}
              height={400}
              headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridWeek,dayGridDay',
              }}
            />
          </Card>
        </Grid>

        {/* Charts */}
        <Grid item xs={12} md={6} container spacing={3} direction="column">
          <Grid item>
            <Card elevation={4} sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Patients Registered (Last 7 days)
              </Typography>
              <Bar
                data={dailyPatientsData}
                options={{
                  responsive: true,
                  plugins: {
                    legend: { display: false },
                    tooltip: { mode: 'index', intersect: false },
                  },
                  scales: {
                    x: { grid: { display: false } },
                    y: { beginAtZero: true, ticks: { stepSize: 5 } },
                  },
                }}
              />
            </Card>
          </Grid>

          <Grid item>
            <Card elevation={4} sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Enquiries Breakdown
              </Typography>
              <Pie
                data={enquiryPieData}
                options={{
                  responsive: true,
                  plugins: {
                    legend: { position: 'bottom' },
                    tooltip: { enabled: true },
                  },
                }}
              />
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
</content>
</create_file>
