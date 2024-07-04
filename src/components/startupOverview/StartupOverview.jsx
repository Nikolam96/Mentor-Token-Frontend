import PropTypes from "prop-types";
import styles from "./startupOverview.module.css";

const StartupOverview = ({ mentors, AssignedJobs, finishedJobs }) => {
  return (
    <div className={styles.startupOverview}>
      <h1>Quick Overview</h1>
      <p>In the last month</p>
      <div>
        <h3>Total Mentors</h3>
        <h2>{mentors}</h2>
      </div>
      <div>
        <h3>Total Assigned Jobs</h3>
        <h2>{AssignedJobs}</h2>
      </div>
      <div className={styles.special}>
        <h3>Finished Jobs</h3>
        <h2>{finishedJobs}</h2>
      </div>
    </div>
  );
};
export default StartupOverview;

StartupOverview.propTypes = {
  mentors: PropTypes.number,
  AssignedJobs: PropTypes.number,
  finishedJobs: PropTypes.number,
};
