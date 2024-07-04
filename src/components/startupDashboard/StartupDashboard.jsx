import AssignedJobs from "../assignedJobs/AssignedJobs";
import data from "../../data/Assigned_Jobs";
import styles from "../../pages/startup_page/startup.module.css";
import TopMentorSection from "../topMentorsSection/TopMentorSection";
import mentorData from "../../data/TopTearMentors";
import Table from "../table/Table";
import tableData from "../../data/TableData";

const StartupDashboard = () => {
  return (
    <div className={styles.grid}>
      <div className={styles.jobs}>
        <AssignedJobs data={data} />
      </div>
      <div className={styles.topMentorSection}>
        <h1>Best Performing Mentors</h1>
        <TopMentorSection data={mentorData} />
        <div>
          <h1>Statistics</h1>
          <Table agregation={tableData} />
        </div>
      </div>
    </div>
  );
};
export default StartupDashboard;
