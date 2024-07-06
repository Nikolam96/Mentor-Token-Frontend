import { useParams } from "react-router-dom";
import styles from "./startupMentorId.module.css";
import data from "../../data/MentorsData";
import PersonalInfo from "../PersonalInfo";
import AboutSection from "../AboutSection";
import AssignedJobs from "../assignedJobs/AssignedJobs";
import jobs from "../../data/Assigned_Jobs";
import PendingJob from "../PendingJob";
import pendingData from "../../data/PendingData";

const StartupMentorId = () => {
  const { id } = useParams();

  const newData = data.filter((user) => user.id == id);
  const user = newData[0];

  return (
    <div className={styles.startupMentorId}>
      <PersonalInfo {...user} />
      <AboutSection {...user} />
      <div className={styles.col_2}>
        <AssignedJobs data={jobs} />
      </div>
      <div className={styles.col_2}>
        <h1 className={styles.special}>Pending Job Offers </h1>
        {pendingData.map((comp) => (
          <PendingJob {...comp} key={comp.id} />
        ))}
      </div>
    </div>
  );
};
export default StartupMentorId;
