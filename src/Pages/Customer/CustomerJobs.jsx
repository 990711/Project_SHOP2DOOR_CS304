import {
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
  } from "@mui/material";
  import React, { useEffect, useState } from "react";
  import { useUser } from "./UserContext";
  import ShopOwner_JobPostingsService from "../../Services/ShopOwner/ShopOwner_JobPostingsService";
  import { format } from "date-fns";
  
  export default function CustomerJobs() {
    const [jobs, setJobs] = useState([]);
    const { state } = useUser();
    const [AppliedJobs, setAppliedJobs] = useState([]);
    const [notapplied, setNotapplied] = useState([]);
  
    useEffect(() => {
      const fetchjobs = async () => {
        try {
          const response =
            await ShopOwner_JobPostingsService.getcustomerViewOpenJobs();
          setJobs(response.data);
          // console.log(response.data);
        } catch (error) {
          console.error("fetching for jobs error", error);
        }
      };
      fetchjobs();
    }, [state, jobs]);
    // console.log(state.username);
  
    useEffect(() => {
      const fetchappliedjobs = async () => {
        try {
          const response =
            await ShopOwner_JobPostingsService.getcustomerAppliedJobs(
              state.username
            );
          setAppliedJobs(response.data);
          // console.log(AppliedJobs);
          var array = jobs.filter(function (item) {
            return !AppliedJobs.includes(item);
          });
          setNotapplied(array);
          // console.log(array);
        } catch (error) {
          console.error("error fetching applied job list", error);
        }
      };
      fetchappliedjobs();
    }, [state]);
  
    const handelDisable = (job) => {
      if (AppliedJobs.find(({ id }) => id === job.id) === undefined) {
        //check wheather the job is already applied by the user
        return false;
      } else {
        // console.log(job);
        return true;
      }
    };
    const handelClickApply = async (job) => {
      console.log(job.id);
      try {
        ShopOwner_JobPostingsService.postcustomerApplyJob(state.username, job.id);
        // fetchappliedjobs();
        // setAppliedJobs(...AppliedJobs, job);
        setAppliedJobs([...AppliedJobs, job]);
        // handelDisable(job);
      } catch (error) {
        console.error("error applying job ", error);
      }
    };
    const handelClickRemove = async (job) => {
      console.log(job.id);
      try {
        ShopOwner_JobPostingsService.postcustomerRemoveApplication(
          state.username,
          job.id
        );
        // fetchappliedjobs();
        // AppliedJobs.filter((a) => a.id !== job.id);
        setAppliedJobs(
          AppliedJobs.filter((appliedJob) => appliedJob.id !== job.id)
        );
        // handelDisable(job);
      } catch (error) {
        console.error("error removing job ", error);
      }
    };
    const formatDate = (date) => {
      if (!date) {
        return "";
      }
      return format(new Date(date), "dd-MM-yyyy");
    };
  
    return (
      <>
        <TableContainer component={Paper} className="TableContainer">
          <Table aria-label="simple table" className="Table">
            <TableHead className="TableHead">
              <TableRow>
                <TableCell style={{ fontWeight: "bold" }}>Job ID</TableCell>
                <TableCell style={{ fontWeight: "bold" }}>Job Title</TableCell>
                <TableCell style={{ fontWeight: "bold" }}>Description</TableCell>
                <TableCell style={{ fontWeight: "bold" }}>
                  Application Deadline
                </TableCell>
                <TableCell style={{ fontWeight: "bold" }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {jobs.map((job) => (
                <TableRow key={job.id}>
                  <TableCell>{job.id}</TableCell>
                  <TableCell>{job.jobTitle}</TableCell>
                  <TableCell>{job.description}</TableCell>
                  <TableCell>{formatDate(job.applicationDeadline)}</TableCell>
                  <TableCell>
                    <Button
                      onClick={() => handelClickApply(job)}
                      disabled={handelDisable(job)}
                      job={job}
                    >
                      Apply
                    </Button>
                    <Button
                      onClick={() => handelClickRemove(job)}
                      disabled={!handelDisable(job)}
                      job={job}
                    >
                      Remove
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </>
    );
  }
  