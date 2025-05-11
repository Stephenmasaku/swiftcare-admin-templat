import React, { useState } from 'react';
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Paper,
  Grid,
  Divider
} from '@mui/material';

function TabPanel({ children, value, index }) {
  return (
    <div role="tabpanel" hidden={value !== index} id={`tabpanel-${index}`}>
      {value === index && <Box sx={{ p: 2 }}>{children}</Box>}
    </div>
  );
}

const PatientInformation = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const handleTabChange = (event, newIndex) => setTabIndex(newIndex);

  return (
    <Box sx={{ width: '100%', p: 2 }}>
      <Paper elevation={3} sx={{ p: 2 }}>
        <Tabs
          value={tabIndex}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="Patient Info Tabs"
        >
          <Tab label="Contact Info" />
          <Tab label="Patient Info" />
          <Tab label="Guardian Info" />
          <Tab label="Patient History" />
          <Tab label="Social History" />
          <Tab label="Medical History" />
          <Tab label="Allergies" />
        </Tabs>

        {/* Tab 0: Contact Info */}
        <TabPanel value={tabIndex} index={0}>
          <Typography variant="h6">Address:</Typography>
          <Typography>
            A 206, Shapath Hexa, Opp. Sola High Court, S G Road, Ahmedabad, Gujarat 380054
          </Typography>
          <Divider sx={{ my: 1 }} />
          <Typography><strong>Email:</strong> maulik.patel@dasinfomedia.com</Typography>
          <Typography><strong>Phone:</strong> 9999999999</Typography>
          <Typography><strong>ID:</strong> P3301022</Typography>
          <Typography><strong>Name:</strong> David Smith</Typography>
        </TabPanel>

        {/* Tab 1: Patient Info */}
        <TabPanel value={tabIndex} index={1}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography><strong>Patient Name:</strong> David Smith</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography><strong>Date Of Birth:</strong> 1999-11-01</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography><strong>Gender:</strong> Male</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography><strong>Blood Group:</strong> B+</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography><strong>Address:</strong> P.O. Box 132 1599 Curabitur</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography><strong>City:</strong> NC Charlotte</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography><strong>State:</strong> NC Charlotte</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography><strong>Zip Code:</strong> 359562</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography><strong>Mobile Number:</strong> 9519519585</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography><strong>Email:</strong> devid.Smith022@gmail.com</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography><strong>Admit Date:</strong> 2022-10-01</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography><strong>Admit Time:</strong> 15:01:00</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography><strong>Symptoms:</strong> mathabetha</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography><strong>Patient Status:</strong> Under Treatment</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography><strong>Assign Doctor:</strong> Carolina Doctor</Typography>
            </Grid>
          </Grid>
        </TabPanel>

        {/* Tab 2: Guardian Info */}
        <TabPanel value={tabIndex} index={2}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography><strong>Guardian Name:</strong> Alex</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography><strong>Relation with Patient:</strong> Father</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography><strong>Gender:</strong> Male</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography><strong>Mobile Number:</strong> 9519519585</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography><strong>Address:</strong> P.O. Box 132 1599 Curabitur</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography><strong>City:</strong> Melvin Porter</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography><strong>State:</strong> Gusau</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography><strong>Zip Code:</strong> 385265</Typography>
            </Grid>
          </Grid>
        </TabPanel>

        {/* Tab 3: Patient History */}
        <TabPanel value={tabIndex} index={3}>
          <Typography><strong>Previous Visits:</strong> 5</Typography>
          <Typography><strong>Conditions Treated:</strong> High blood pressure, Diabetes</Typography>
          <Typography><strong>Past Surgeries:</strong> Appendectomy (2017)</Typography>
          <Typography><strong>Vaccination Status:</strong> Up-to-date</Typography>
        </TabPanel>

        {/* Tab 4: Social History */}
        <TabPanel value={tabIndex} index={4}>
          <Typography><strong>Occupation:</strong> Software Developer</Typography>
          <Typography><strong>Marital Status:</strong> Married</Typography>
          <Typography><strong>Alcohol Use:</strong> Occasionally</Typography>
          <Typography><strong>Smoking:</strong> No</Typography>
          <Typography><strong>Living Situation:</strong> Lives with spouse and two children</Typography>
        </TabPanel>

        {/* Tab 5: Medical History */}
        <TabPanel value={tabIndex} index={5}>
          <Typography><strong>Chronic Illnesses:</strong> Type 2 Diabetes, Hypertension</Typography>
          <Typography><strong>Medications:</strong> Metformin, Lisinopril</Typography>
          <Typography><strong>Surgeries:</strong> Appendectomy (2017)</Typography>
          <Typography><strong>Immunizations:</strong> COVID-19 (Pfizer), Flu Vaccine (Yearly)</Typography>
        </TabPanel>

        {/* Tab 6: Allergies */}
        <TabPanel value={tabIndex} index={6}>
          <Typography><strong>Drug Allergies:</strong> Penicillin</Typography>
          <Typography><strong>Food Allergies:</strong> Peanuts</Typography>
          <Typography><strong>Other Allergies:</strong> Latex</Typography>
        </TabPanel>
      </Paper>
    </Box>
  );
};

export default PatientInformation;
