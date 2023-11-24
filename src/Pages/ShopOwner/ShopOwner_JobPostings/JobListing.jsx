// Import necessary modules and components
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ShopOwner_JobPostingsService from '../../../Services/ShopOwner/ShopOwner_JobPostingsService'; // Import your job service
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Modal from 'react-modal';
import "../../../styles/ShopOwner.css";


// Set the root element of your app for the modal
Modal.setAppElement('#root');

const JobListing = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Fetch job listings when the component mounts
    ShopOwner_JobPostingsService.getJobPostings().then((res) => {
      setJobs(res.data);
    });
  }, []);

  const deleteJob = (id) => {
    // Delete a job and update the state
    ShopOwner_JobPostingsService.deleteJobPostings(id).then((res) => {
      setJobs(jobs.filter((job) => job.id !== id));
    });
  };

  const createJob = () => {
    // Navigate to the create job page
    navigate('/addjobposting');
  };

  const filteredJobs = jobs.filter((job) =>
    job.jobTitle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRowClick = (job) => {
    // Set the selected job and open the modal
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    // Close the modal and reset the selected job
    setIsModalOpen(false);
    setSelectedJob(null);
  };

  const deleteModal = () => {
    // Display a confirmation dialog and delete the job if confirmed
    const userConfirmed = window.confirm('Are you sure you want to delete this job?');

    if (userConfirmed) {
      setIsModalOpen(false);
      setSelectedJob(null);
      deleteJob(selectedJob?.id);
    } else {
      // Close the modal if the user cancels the deletion
      setIsModalOpen(false);
      setSelectedJob(null);
    }
  };

  const handleUpdate = () => {
    // Navigate to the update job page with the selected job's id
    navigate(`/UpdateJobPosting/${selectedJob.id}`);
  };

  return (
    <div className="title">
      Job Postings
      <div style={{ display: 'flex', alignItems: 'center', marginLeft: '2px' }}>
        <button style={{ width: '250px' }} onClick={createJob}>
          Add Job
        </button>
        <div style={{ flexGrow: 1, margin: '20px' }}>
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: '75%' }}
          />
        </div>
      </div>

      <TableContainer component={Paper} className="TableContainer">
        <Table aria-label="simple table" className="Table">
          <TableHead>
            <TableRow>
              <TableCell className="TableCell" style={{ fontWeight: 'bold' }}>
                Job Title
              </TableCell>
              <TableCell className="TableCell" style={{ fontWeight: 'bold' }}>
                Description
              </TableCell>
              <TableCell className="TableCell" style={{ fontWeight: 'bold' }}>
                Application Deadline
              </TableCell>
              <TableCell className="TableCell" style={{ fontWeight: 'bold' }}>
                Application Status
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredJobs.map((job) => (
              <TableRow
                key={job.id}
                className="TableRow"
                onClick={() => handleRowClick(job)}
              >
                <TableCell>{job.jobTitle}</TableCell>
                <TableCell>{job.description}</TableCell>
                <TableCell>{job.applicationDeadline}</TableCell>
                <TableCell>{job.applicationStatus}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal for updating the job */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
          content: {
            width: '400px',
            margin: 'auto',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
          },
        }}
      >
        <div>
          {/* Display details of the selected job */}
          <p>Job Title: {selectedJob?.jobTitle}</p>
          <p>Description: {selectedJob?.description}</p>
          <p>Application Deadline: {selectedJob?.applicationDeadline}</p>
          <p>Application Status: {selectedJob?.applicationStatus}</p>

          <div className="button-container">
            <button style={{ marginRight: '10px' }} onClick={handleUpdate}>
              Update
            </button>
            <button onClick={deleteModal}>Delete</button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default JobListing;
