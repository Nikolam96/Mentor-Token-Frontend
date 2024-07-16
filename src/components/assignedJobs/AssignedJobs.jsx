import styles from "./assignedJobs.module.css";
import { useInView } from "react-intersection-observer";
import ViewJob from "../viewJob/ViewJob";
import { useState } from "react";

const AssignedJob = ({ acceptedStatus, jobId }) => {
  const { ref: myRef, inView: visible } = useInView({
    threshold: 0.8,
    triggerOnce: true,
  });
  const status = acceptedStatus.toLowerCase();
  const [portal, setPortal] = useState(false);

  return (
    <div className={styles.assignedJob} onClick={() => setPortal(true)}>
      <h3 className={styles.desc}>{jobId?.title}</h3>
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
      {portal && (
        <ViewJob
          setPortal={setPortal}
          portal={portal}
          jobId={jobId._id}
          status={status}
        />
      )}
    </div>
  );
};
export default AssignedJob;
