//import React, { useState, useEffect } from 'react';
//import { useNavigate } from 'react-router-dom';




//import ShopOwner_ProductService from '../../../Services/ShopOwner/ShopOwner_JobPostingsService';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const createData = (jobTitle, description, applicationDeadline, applicationStatus) => ({
  jobTitle,
  description,
  applicationDeadline,
  applicationStatus,
});

const rows = [
  createData('Job 1', 'Description for Job 1', new Date('2023-08-01'), 'Open'),
  createData('Job 2', 'Description for Job 2', new Date('2023-08-15'), 'Closed'),
  createData('Job 3', 'Description for Job 3', new Date('2023-09-01'), 'Open'),
  // Add more rows as needed
];

const JobListing = () => (
  <TableContainer component={Paper}>
    <Table aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell>Job Title</TableCell>
          <TableCell>Description</TableCell>
          <TableCell>Application Deadline</TableCell>
          <TableCell>Application Status</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={row.jobTitle}>
            <TableCell>{row.jobTitle}</TableCell>
            <TableCell>{row.description}</TableCell>
            <TableCell>{row.applicationDeadline.toDateString()}</TableCell>
            <TableCell>{row.applicationStatus}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

export default JobListing;
