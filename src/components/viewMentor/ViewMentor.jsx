import { useState } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import AppliedMentor from "../appliedMentor/AppliedMentor";
import styles from "./viewMentor.module.css";
import moment from "moment";
import AddMentorPopUp from "../addMentorPopUp/AddMentorPopUp";
import DeleteComponent from "../DeleteComponent";
import useJobsApi from "../../api/JobsApi";
import SpinnerSvg from "../SpinnerSvg";

const ViewMentor = ({
  setPortalUse,
  portalUse,
  name,
  jobPicture,
  title,
  description,
  id,
  mentors,
  createdAt,
}) => {
  const [fadeOut, setFadeOut] = useState(portalUse);
  const [updateJob, setUpdateJob] = useState(false);
  const [deleteJob, setDeleteJob] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const formattedDate = moment(createdAt).format("Do MMMM YYYY");

  let page = `?page=${currentPage}`;
  let url = `/applications/${id}`;
  const deleteUrl = `deleteJob/${id}`;

  const { data: jobsData, isLoading, error } = useJobsApi(page, url);
  const jobs = jobsData?.jobs || [];
  const pagination = jobsData?.pagination || {};

  const handleNextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => prev - 1);
  };

  return ReactDOM.createPortal(
    <div
      className={`${styles.viewMentor} ${fadeOut ? styles.show : styles.hide}`}
    >
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <img
            src={
              jobPicture !== "default.img"
                ? `http://127.0.0.1:10000/images/${jobPicture}`
                : "../../../public/JobsRandomPicture.jpg"
            }
            alt={title}
            className={styles.jobPicture}
          />
          <h2>{name}</h2>
        </div>
        <div className={styles.body}>
          <h2>{title}</h2>
          <p>{description}</p>
          <p>Created At: {formattedDate}</p>

          {mentors && (
            <div className={styles.btnContainer}>
              <button
                className={styles.assign}
                onClick={() => setUpdateJob(true)}
              >
                Update
              </button>
              <button
                className={styles.reject}
                onClick={() => setDeleteJob(true)}
              >
                Delete
              </button>
            </div>
          )}
        </div>

        {mentors ? (
          <div className={styles.mentor}>
            <h2 className={styles.h3}>Mentors that applied to the job</h2>
            <div className={styles.mentorContainer}>
              {jobs.length === 0 && (
                <h2 className={styles.error}>
                  No one has applied for this job yet!
                </h2>
              )}
              <SpinnerSvg spinner={isLoading} width={50} />
              {error && <p>{error.message}</p>}
              {jobs.map((mentor) => (
                <AppliedMentor
                  {...mentor}
                  key={mentor._id}
                  job={false}
                  setFadeOut={setFadeOut}
                />
              ))}
            </div>
            {pagination.totalJobs > 2 && (
              <div className={styles.pagination}>
                <button
                  onClick={handlePrevPage}
                  disabled={pagination.currentPage === 1}
                  className={pagination.currentPage === 1 ? styles.red : ""}
                >
                  Previous Page
                </button>
                <button
                  onClick={handleNextPage}
                  disabled={currentPage === pagination.totalPages}
                  className={
                    currentPage === pagination.totalPages ? styles.red : ""
                  }
                >
                  Next Page
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className={styles.applyContainer}>
            <button className={styles.apply}>Apply</button>
          </div>
        )}
        <button
          onClick={() => {
            setFadeOut(false);
            setTimeout(() => {
              setPortalUse(!portalUse);
            }, 500);
          }}
          className={styles.exit}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="26px"
            viewBox="0 -960 960 960"
            width="26px"
          >
            <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
          </svg>
        </button>
      </div>
      {updateJob && (
        <AddMentorPopUp
          setPortalUse={setUpdateJob}
          portalUse={updateJob}
          header={"Update Job"}
          add={"job"}
          jobOpen={true}
          update={true}
          id={id}
          title={title}
          description={description}
        />
      )}

      {deleteJob && (
        <DeleteComponent
          setPortalUse={setDeleteJob}
          portalUse={deleteJob}
          header={"Are you sure you want to delete this job? "}
          url={deleteUrl}
        />
      )}
    </div>,
    document.body
  );
};

export default ViewMentor;

ViewMentor.propTypes = {
  setPortalUse: PropTypes.func,
  portalUse: PropTypes.bool,
  name: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  jobPicture: PropTypes.string,
  id: PropTypes.string,
  createdAt: PropTypes.string,
  mentors: PropTypes.bool,
};
