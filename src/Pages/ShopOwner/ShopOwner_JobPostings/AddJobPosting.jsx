import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ShopOwner_JobPostingsService from '../../../Services/ShopOwner/ShopOwner_JobPostingsService'; // Import your job service
import "../../../styles/ShopOwner.css";

const AddJobPosting = () => {
  const navigate = useNavigate();
  const [jobPosting, setJobPosting] = useState({
    jobTitle: "",
    description: "",
    applicationDeadline: "",
    applicationStatus: "",
  });

  const saveJobPosting = (e) => {
    e.preventDefault();

    ShopOwner_JobPostingsService.createJobPostings(jobPosting).then((res) => {
      navigate('/jobListing');
    });
  };





  const cancel = () => {
    navigate("/jobpostings");
  };

  const changeJobTitleHandler = (event) => {
    setJobPosting({ ...jobPosting, jobTitle: event.target.value });
  };

  const changeDescriptionHandler = (event) => {
    setJobPosting({ ...jobPosting, description: event.target.value });
  };

  const changeApplicationDeadlineHandler = (event) => {
    setJobPosting({ ...jobPosting, applicationDeadline: event.target.value });
  };

  const changeApplicationStatusHandler = (event) => {
    setJobPosting({ ...jobPosting, applicationStatus: event.target.value });
  };

  return (
    <div>
      <br />
      <div className="container">
        <div className="title">Add Job Posting</div>
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
            value={jobPosting.applicationDeadline}
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
            <option value="open">Open</option>
            <option value="closed">Closed</option>
          </select>

          <div>
            <div className="button-container">
              <button style={{ marginRight: "10px" }} onClick={saveJobPosting}>
                Save
              </button>
              <button onClick={cancel}>Cancel</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddJobPosting;
