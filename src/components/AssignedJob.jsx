import styles from "./assignedJobs/assignedJobs.module.css";

const AssignedJob = ({ description, acceptedStatus, id }) => {
  const status = acceptedStatus.toLowerCase();
  return (
    <div className={styles.assignedJob}>
      <p className={styles.desc}>{description}</p>
      <div>
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
