import { useInView } from "react-intersection-observer";
import PropTypes from "prop-types";
import styles from "./applicationSend.module.css";
import { useState } from "react";
import ViewJob from "../viewJob/ViewJob";
import useJobsApi from "../../api/useJobsApi";

const ApplicationSend = ({ jobId, pending, _id }) => {
  const { ref: myRef, inView: visible } = useInView({
    threshold: 1,
    triggerOnce: true,
  });
  const [portal, setPortal] = useState(false);
  const [error, setError] = useState(null);

  const updateJobApi = useJobsApi(setError);

  const handleDivClick = (e) => {
    e.stopPropagation();
    setPortal(true);
  };

  const handleAcceptClick = (e) => {
    e.stopPropagation();
    let headers = "multipart/form-data";
    let url = `updateApplication/${_id}`;
    let fetchMethod = "patch";
    const data = { acceptedStatus: "in progress", status: "direct" };
    updateJobApi.mutate({ data, url, headers, fetchMethod });
  };

  const handleRejectClick = (e) => {
    e.stopPropagation();
    let headers = "multipart/form-data";
    let url = `updateApplication/${_id}`;
    let fetchMethod = "patch";
    const data = { acceptedStatus: "rejected", status: "direct" };
    updateJobApi.mutate({ data, url, headers, fetchMethod });
  };

  return (
    <>
      <div
        ref={myRef}
        className={`${styles.applicationSend} ${visible && styles.show}`}
        onClick={handleDivClick}
      >
        <h3>{jobId.title}</h3>
        {error && <p className={styles.error}>{error}</p>}

        {!pending ? (
          <div className={styles.btnContainer}>
            <button className={styles.accept} onClick={handleAcceptClick}>
              Accept
            </button>
            <button className={styles.reject} onClick={handleRejectClick}>
              Reject
            </button>
          </div>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="27px"
            viewBox="0 -960 960 960"
            width="27px"
            fill="rgba(238, 234, 252, 1)"
          >
            <path d="m612-292 56-56-148-148v-184h-80v216l172 172ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-400Zm0 320q133 0 226.5-93.5T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160Z" />
          </svg>
        )}
      </div>
      {portal && (
        <ViewJob setPortal={setPortal} portal={portal} jobId={jobId._id} />
      )}
    </>
  );
};

ApplicationSend.propTypes = {
  jobName: PropTypes.string,
  pending: PropTypes.bool,
};

export default ApplicationSend;
