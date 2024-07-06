import styles from "./assignedJobs/assignedJobs.module.css";
import { useInView } from "react-intersection-observer";

const AssignedJob = ({ description, acceptedStatus, id }) => {
  const { ref: myRef, inView: visible } = useInView({
    threshold: 0.8,
    triggerOnce: true,
  });

  const status = acceptedStatus.toLowerCase();
  return (
    <div className={styles.assignedJob}>
      <p className={styles.desc}>{description}</p>
      <div
        ref={myRef}
        className={`${styles.observer} ${visible && styles.show}`}
      >
        {status === "done" && <p className={styles.done}>{acceptedStatus}</p>}
        {status === "rejected" && (
          <p className={styles.rejected}>{acceptedStatus}</p>
        )}
        {status === "in progress" && (
          <p className={styles.progress}>{acceptedStatus}</p>
        )}
      </div>
    </div>
  );
};
export default AssignedJob;
