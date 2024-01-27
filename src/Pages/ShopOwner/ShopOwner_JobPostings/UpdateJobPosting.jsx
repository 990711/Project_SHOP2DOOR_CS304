import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ShopOwner_JobPostingsService from '../../../Services/ShopOwner/ShopOwner_JobPostingsService'; // Import your job service
import "../../../styles/ShopOwner.css";
import { useParams } from "react-router-dom";
import { useLocation } from 'react-router-dom';

const UpdateJobPosting = () => {
  const location = useLocation();
  const user = location.state?.user;
  const navigate = useNavigate();
  const { id } = useParams();
  const [jobPosting, setJobPosting] = useState({
    jobTitle: "",
    description: "",
    applicationDeadline: "",
    applicationStatus: "",
  });

  useEffect(() => {
    ShopOwner_JobPostingsService.getJobPostingsById(id).then((res) => {
      let jobPostingData = res.data;
      setJobPosting((prevJobPosting) => ({
        ...prevJobPosting,
        jobTitle: jobPostingData.jobTitle || "",
        description: jobPostingData.description || "",
        applicationDeadline: jobPostingData.applicationDeadline || "",
        applicationStatus: jobPostingData.applicationStatus || "",
      }));
    });
  }, [id]);

  const formatDateForDisplay = (date) => {
    if (!date) {
      return '';
    }
    const offset = new Date(date).getTimezoneOffset(); // Get the time zone offset in minutes
  const adjustedDate = new Date(date);
  adjustedDate.setMinutes(adjustedDate.getMinutes() - offset); // Adjust for time zone

  return adjustedDate.toISOString().split('T')[0]; // Format as "yyyy-MM-dd"
  };

  const formatDateForServer = (formattedDate) => {
    if (!formattedDate) {
      return null;
    }
  
    const offset = new Date().getTimezoneOffset();
    const adjustedDate = new Date(`${formattedDate}T00:00:00.000Z`);
    adjustedDate.setMinutes(adjustedDate.getMinutes() + offset);
  
    return adjustedDate.toISOString();
  };

  
  const closeJobPostings = (job) => {
    // Call the endpoint to close job postings
    return ShopOwner_JobPostingsService.closeJobPostings(job);
  };

  const reopenJobPostings = (job) => {
    // Call the endpoint to reopen job postings
    return ShopOwner_JobPostingsService.reopenJobPostings(job);
  };

  const updateJobPostingsDetails = (job) => {
    // Call the endpoint to update job postings details
    return ShopOwner_JobPostingsService.updateJobPostings(job);
  };
  
  

  const updateJobPosting = async (e) => {
    e.preventDefault();

    const formattedDate = new Date(jobPosting.applicationDeadline).toISOString().split('T')[0];
    const adjustedDateForServer = formatDateForServer(formattedDate);

    // Set the formatted date in your jobPosting object
    setJobPosting({ ...jobPosting, applicationDeadline: formattedDate });


    let updatedJobPosting = {
      id: id,
      jobTitle: jobPosting.jobTitle,
      description: jobPosting.description,
      applicationDeadline: jobPosting.applicationDeadline,
      applicationStatus: jobPosting.applicationStatus,
    };

    console.log("updatedJobPosting =>" + JSON.stringify(updatedJobPosting));

    ShopOwner_JobPostingsService.updateJobPostings(updatedJobPosting)
      .then((res) => {
        console.log("Server response:", res);
        navigate("/joblisting",{ state: { user } });
      })
      .catch((error) => {
        console.error("Error from server:", error);
      });
      /*
      try {
        if (jobPosting.applicationStatus === "close") {
          await closeJobPostings(updatedJobPosting);
        } else if (jobPosting.applicationStatus === "reopen") {
          await reopenJobPostings(updatedJobPosting);
        }
  
        // Update other details regardless of the status
        await updateJobPostingsDetails(updatedJobPosting);
  
        console.log("Job postings updated successfully.");
        navigate("/joblisting", { state: { user } });
      } catch (error) {
        console.error("Error updating job postings:", error);
      }
      */
      
  };

  const changeJobTitleHandler = (event) => {
    setJobPosting({ ...jobPosting, jobTitle: event.target.value });
  };

  const changeDescriptionHandler = (event) => {
    setJobPosting({ ...jobPosting, description: event.target.value });
  };

  const changeApplicationDeadlineHandler = (event) => {
    setJobPosting({
      ...jobPosting,
      applicationDeadline: event.target.value,
    });
  };

  const changeApplicationStatusHandler = (event) => {
    setJobPosting({
      ...jobPosting,
      applicationStatus: event.target.value,
    });
  };

  return (
    <div>
      <br />
      <div className="container">
        <div className="title">Update Job Posting</div>
        <form action="">
          <label>Job Title</label>
          <input
            placeholder="Job Title"
            name="jobTitle"
            value={jobPosting.jobTitle}
            onChange={changeJobTitleHandler}
          />

          <label>Description</label>
          <input
            placeholder="Description"
            name="description"
            value={jobPosting.description}
            onChange={changeDescriptionHandler}
          />

          <label>Application Deadline</label>
          <input
            type="date"
            placeholder="Application Deadline"
            name="applicationDeadline"
            
            value={formatDateForDisplay(jobPosting.applicationDeadline)}

            onChange={changeApplicationDeadlineHandler}
          />

          <label>Application Status</label>
          <select
            name="applicationStatus"
            value={jobPosting.applicationStatus}
            onChange={changeApplicationStatusHandler}
            style={{ height: '40px' }}
          >
            <option value="">Select Application Status</option>
            <option value="close">Close</option>
            <option value="reopen">Reopen</option>
          </select>

          <div>
            <div className="button-container">
              <button
                style={{ marginRight: "10px" }}
                onClick={updateJobPosting}
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateJobPosting;
