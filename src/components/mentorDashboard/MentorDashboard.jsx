import data from "../../data/Assigned_Jobs";
import ApplicationSend from "../appSend/ApplicationSend";
import AssignedJobs from "../assignedJobs/AssignedJobs";
import jobs from "../../data/PendingData";
import styles from "./mentorDashboard.module.css";

const MentorDashboard = ({ user }) => {
  return (
    <div className={styles.mentorDashboard}>
      <div className={styles.assignedJobs}>
        <AssignedJobs data={data} />
      </div>
      <div className={styles.applicationContainer}>
        <h1>Pending Jobs</h1>
        <h3>Jobs offered from your startup</h3>
        {jobs.map((job) => (
          <ApplicationSend pending={true} {...job} key={job.id} />
        ))}
      </div>
      <div className={styles.applicationContainer}>
        <h1>Applications sent </h1>
        <h3>Jobs you have applied to</h3>
        {jobs.map((job) => (
          <ApplicationSend {...job} key={job.id} />
        ))}
      </div>
    </div>
  );
};
export default MentorDashboard;
