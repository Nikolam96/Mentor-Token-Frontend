import styles from "./mentorStats.module.css";
import LineChart from "../lineChart/LineChart";
import StartupOverview from "../startupOverview/StartupOverview";
import data from "../../data/MentorsData";
import tableData from "../../data/TableData";
import PersonalInfo from "../PersonalInfo";
import AboutSection from "../AboutSection";

const MentorStats = () => {
  const newData = data.filter((user) => user.id == 1);
  const user = newData[0];
  return (
    <div className={styles.mentorStats}>
      <PersonalInfo {...user} />
      <div className={styles.about}>
        <AboutSection {...user} />
      </div>

      <div className={styles.lineChart}>
        <h1>Statistics</h1>
        <LineChart aggregation={tableData} />
      </div>
      <div className={styles.overview}>
        <StartupOverview
          mentors={12}
          AssignedJobs={25}
          finishedJobs={252}
          appliedJobs={12}
        />
      </div>
    </div>
  );
};

export default MentorStats;
