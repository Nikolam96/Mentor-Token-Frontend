import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import styles from "./viewJob.module.css";
import axios from "axios";
import moment from "moment";

const ViewJob = ({ setPortal, portal, jobId, status }) => {
  const [fadeOut, setFadeOut] = useState(portal);
  const [job, setJob] = useState({});
  const [error, setError] = useState("");

  const fetchJob = async () => {
    try {
      const response = await axios.get(
        `http://localhost:10000/api/v1/getJob/${jobId}`
      );
      setJob(response?.data?.data?.job);
    } catch (err) {
      setError("Failed to fetch job details. Please try again later.");
    }
  };

  useEffect(() => {
    fetchJob();
  }, []);

  const handleClose = (e) => {
    e.stopPropagation();
    setFadeOut(false);
    setTimeout(() => {
      setPortal(!portal);
    }, 500);
  };

  const formattedDate = (date) => {
    return moment(date).format("Do MMMM YYYY");
  };

  return ReactDOM.createPortal(
    <div className={`${styles.viewJob} ${fadeOut ? styles.show : styles.hide}`}>
      <div className={styles.container}>
        {error ? (
          <div className={styles.errorMessage}>{error}</div>
        ) : (
          <>
            <img
              src={
                job.jobPicture !== "default.img"
                  ? `http://127.0.0.1:10000/images/${job.jobPicture}`
                  : "../../../public/JobsRandomPicture.jpg"
              }
              alt={job.title}
              className={styles.jobImage}
            />
            <h2 className={styles.jobTitle}>Job Details</h2>
            <p className={styles.jobDetail}>
              <strong>Title:</strong> {job.title}
            </p>
            <p className={styles.jobDetail}>
              <strong>Description:</strong> {job.description}
            </p>
            <p className={styles.jobDetail}>
              <strong>Created At:</strong> {formattedDate(job.createdAt)}
            </p>
            {status === "done" && (
              <p className={styles.jobDetail}>
                <strong>Finished At:</strong> {formattedDate(job.updatedAt)}
              </p>
            )}
            <h2 className={styles.companyTitle}>Company:</h2>
            <div className={styles.companyDetails}>
              <img
                src={
                  job.companyId?.picture !== "default.img"
                    ? `http://127.0.0.1:10000/images/${job.companyId?.picture}`
                    : "../../../public/JobsRandomPicture.jpg"
                }
                alt={job.companyId?.startUpName}
                className={styles.companyLogo}
              />
              <div className={styles.companyContainer}>
                <h2 className={styles.companyName}>
                  {job.companyId?.startUpName}
                </h2>
                <p className={styles.companyEmail}>{job.companyId?.email}</p>
              </div>
            </div>
          </>
        )}
        <button onClick={handleClose} className={styles.closeButton}>
          Close
        </button>
      </div>
    </div>,
    document.body
  );
};

export default ViewJob;
