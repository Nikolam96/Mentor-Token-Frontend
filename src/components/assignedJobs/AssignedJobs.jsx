import styles from "./assignedJobs.module.css";
import AssignedJob from "../AssignedJob";
import { useState } from "react";

const AssignedJobs = ({ data }) => {
  const [jobs, setJobs] = useState(data);

  const setFilter = (status) => {
    setJobs(data.filter((job) => job.acceptedStatus.toLowerCase() === status));
  };

  return (
    <div className={styles.assignedJobs}>
      <h1>Assigned Jobs</h1>
      <ul>
        <li onClick={() => setJobs(data)}>All</li>
        <li onClick={() => setFilter("done")}>Done</li>
        <li onClick={() => setFilter("rejected")}>Rejected</li>
        <li onClick={() => setFilter("in progress")}>In progress</li>
      </ul>
      {jobs.map((job) => {
        return <AssignedJob {...job} key={job.id} />;
      })}
    </div>
  );
};
export default AssignedJobs;
