import styles from "../startupJobs/StartupJobs.module.css";
import data from "../../data/StartUpJobs";
import JobComponent from "../jobComponent/JobComponent";
import { useState } from "react";
import AddMentorPopUp from "../addMentorPopUp/AddMentorPopUp";

const MentorJobs = () => {
  const [portalUse, setPortalUse] = useState(false);

  return (
    <div className={styles.startupJobs}>
      <h1>Your Startup Jobs</h1>
      {portalUse && (
        <AddMentorPopUp
          setPortalUse={setPortalUse}
          portalUse={portalUse}
          header={"Create New Job"}
          subHeader={"Create and offer job to everyone"}
          add={"job"}
          jobOpen={false}
        />
      )}

      <div className={styles.jobsContainer}>
        {data.map((job) => (
          <JobComponent {...job} key={job.id} mentors={false} />
        ))}
      </div>
    </div>
  );
};
export default MentorJobs;
