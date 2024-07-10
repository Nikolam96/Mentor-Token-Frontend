import { useState } from "react";
import styles from "./StartupJobs.module.css";
import JobComponent from "../jobComponent/JobComponent";
import AddMentorPopUp from "../addMentorPopUp/AddMentorPopUp";
import useJobsApi from "../../api/JobsApi";
import SpinnerSvg from "../SpinnerSvg";
import { getId } from "../../config/StorageFunctions";

const StartupJobs = () => {
  const [portalUse, setPortalUse] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  let page = `?page=${currentPage}`;
  let url = `/jobs/${getId()}`;

  const { data: jobsData, isLoading, error } = useJobsApi(page, url);
  const jobs = jobsData?.jobs || [];
  const pagination = jobsData?.pagination || {};

  const handleNextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => prev - 1);
  };

  return (
    <div className={styles.startupJobs}>
      <h1>Your Startup Jobs</h1>
      <div className={styles.buttonContainer}>
        <button onClick={() => setPortalUse(!portalUse)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
          >
            <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
          </svg>
          Create New Job
        </button>
        {portalUse && (
          <AddMentorPopUp
            setPortalUse={setPortalUse}
            portalUse={portalUse}
            header={"Create New Job"}
            subHeader={"Create and offer job to everyone"}
            add={"job"}
            jobOpen={true}
          />
        )}
      </div>

      <SpinnerSvg spinner={isLoading} width={50} />
      {error && <p>{error.message}</p>}
      {!isLoading && jobs.length === 0 && (
        <div>
          <h1>No Jobs Available</h1>
          <p>It looks like you don’t have any jobs listed at the moment.</p>
          <p>
            Get started by creating a new job post or exploring other options!
          </p>
        </div>
      )}

      {!isLoading && jobs && (
        <div className={styles.jobsContainer}>
          {jobs.map((job) => (
            <JobComponent
              key={job._id}
              companyId={job.companyId}
              jobPicture={job.jobPicture}
              description={job.description}
              title={job.title}
              id={job._id}
              mentors={true}
              createdAt={job.createdAt}
            />
          ))}
        </div>
      )}

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
          className={currentPage === pagination.totalPages ? styles.red : ""}
        >
          Next Page
        </button>
      </div>
    </div>
  );
};

export default StartupJobs;
