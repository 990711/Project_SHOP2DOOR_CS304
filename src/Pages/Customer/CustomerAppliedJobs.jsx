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

export default function CustomerAppliedJobs() {
  const [jobs, setJobs] = useState([]);
  const { state } = useUser();
  const [AppliedJobs, setAppliedJobs] = useState([]);
  const [applied, setApplied] = useState(true);

  useEffect(() => {
    ShopOwner_JobPostingsService.getcustomerAppliedJobs(state.username)
      .then((resp) => {
        setAppliedJobs(resp.data);
        console.log(resp.data);
      })
      .catch((error) => {
        console.error("error fetching applied jobs", error);
      });

    // fetchappliedjobs();
  }, [applied]);

  const handelClickRemove = async (job) => {
    console.log(job.id);
    try {
      await ShopOwner_JobPostingsService.postcustomerRemoveApplication(
        state.username,
        job.id
      );
      setApplied(!applied);
      setAppliedJobs(
        AppliedJobs.filter((appliedJob) => appliedJob.id !== job.id)
      );
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
            {AppliedJobs.map((job) => (
              <TableRow key={job.id}>
                <TableCell>{job.id}</TableCell>
                <TableCell>{job.jobTitle}</TableCell>
                <TableCell>{job.description}</TableCell>
                <TableCell>{formatDate(job.applicationDeadline)}</TableCell>
                <TableCell>
                  <Button onClick={() => handelClickRemove(job)} job={job}>
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
