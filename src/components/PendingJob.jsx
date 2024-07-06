import styles from "./assignedJobs/assignedJobs.module.css";
import { useInView } from "react-intersection-observer";
import PropTypes from "prop-types";

const PendingJob = ({ jobName }) => {
  const { ref: myRef, inView: visible } = useInView({
    threshold: 1,
    triggerOnce: true,
  });

  return (
    <div
      ref={myRef}
      className={`${styles.assignedJob} ${styles.offer} ${
        styles.offerContainer
      } ${visible && styles.pendingShow}`}
    >
      <p>{jobName}</p>
      <button>Cancel Offer</button>
    </div>
  );
};
export default PendingJob;

PendingJob.propTypes = {
  name: PropTypes.string,
  id: PropTypes.number,
};
