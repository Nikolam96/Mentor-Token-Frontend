import styles from "./assignedJobs/assignedJobs.module.css";
import { useInView } from "react-intersection-observer";
import PropTypes from "prop-types";
import useJobsApi from "../api/useJobsApi";
import { useState } from "react";
import SpinnerSvg from "./SpinnerSvg";
import DeleteComponent from "./DeleteComponent";
import ViewJob from "./viewJob/ViewJob";

const PendingJob = ({ jobId, _id }) => {
  const { ref: myRef, inView: visible } = useInView({
    threshold: 1,
    triggerOnce: true,
  });

  const [portal, setPortal] = useState(false);
  const [viewJobPortal, setViewJobPortal] = useState(false);
  const [error, setError] = useState(null);
  const deleteApi = useJobsApi(setError);

  const deleteUrl = `deleteOffer/${_id}`;

  const handleCancelClick = (event) => {
    event.stopPropagation();
    setPortal(true);
  };

  const handleViewJobClick = (event) => {
    event.stopPropagation();
    setViewJobPortal(true);
  };

  return (
    <>
      <div
        className={`${styles.assignedJob} ${styles.offer}`}
        onClick={handleViewJobClick}
      >
        <SpinnerSvg width={50} spinner={deleteApi.isPending} />
        {error && <p className={styles.error}>{error}</p>}
        <h3>{jobId?.title}</h3>
        <button
          className={` ${visible && styles.pendingShow}`}
          ref={myRef}
          onClick={handleCancelClick}
        >
          Cancel Offer
        </button>
        {viewJobPortal && (
          <ViewJob
            setPortal={setViewJobPortal}
            portal={viewJobPortal}
            jobId={jobId._id}
          />
        )}
      </div>
      {portal && (
        <DeleteComponent
          setPortalUse={setPortal}
          portalUse={portal}
          header={"Are you sure you want to delete this job?"}
          url={deleteUrl}
        />
      )}
    </>
  );
};

PendingJob.propTypes = {
  _id: PropTypes.string.isRequired,
  jobId: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default PendingJob;
