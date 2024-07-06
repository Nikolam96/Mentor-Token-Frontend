import AssignedJobs from "../assignedJobs/AssignedJobs";
import data from "../../data/Assigned_Jobs";
import styles from "./startUpDashboard.module.css";
import TopMentorSection from "../topMentorsSection/TopMentorSection";
import mentorData from "../../data/TopTearMentors";
import LineChart from "../lineChart/LineChart";
import tableData from "../../data/TableData";

const StartupDashboard = () => {
  return (
    <div className={styles.startUpDashboard}>
      <div>
        <AssignedJobs data={data} />
      </div>
      <div>
        <div className={styles.mentor}>
          <h1>Best Performing Mentors</h1>
          <TopMentorSection data={mentorData} />
        </div>
        <div className={styles.lineChart}>
          <h1>Statistics</h1>
          <LineChart aggregation={tableData} />
        </div>
      </div>
    </div>
  );
};
export default StartupDashboard;
