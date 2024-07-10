import AddMentorComponent from "../AddMentorComponent";
import styles from "./startupMentors.module.css";
import data from "../../data/MentorsData";
import MentorsDataComponent from "../MentorsDataComponent";
import StartupOverview from "../startupOverview/StartupOverview";

const StartupMentors = () => {
  return (
    <div className={styles.startupMentor}>
      <AddMentorComponent />
      <div className={styles.grid}>
        <div>
          {data.map((mentor) => {
            return <MentorsDataComponent key={mentor.id} mentor={mentor} />;
          })}
        </div>
        <StartupOverview
          mentors={12}
          AssignedJobs={25}
          finishedJobs={252}
          startup={true}
        />
      </div>
    </div>
  );
};
export default StartupMentors;
