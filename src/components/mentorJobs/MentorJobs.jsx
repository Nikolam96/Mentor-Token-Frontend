import styles from "../startupJobs/StartupJobs.module.css";
import JobComponent from "../jobComponent/JobComponent";
import { useState } from "react";
import AddMentorPopUp from "../addMentorPopUp/AddMentorPopUp";
import useJobsApi from "../../api/JobsApi";
import SpinnerSvg from "../SpinnerSvg";

const MentorJobs = () => {
  const [portalUse, setPortalUse] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  let page = `?page=${currentPage}&limit=6`;
  let url = `/getAll`;

  const { data: jobsData, isLoading, error } = useJobsApi(page, url);
  const jobs = jobsData?.jobs?.docs || [];
  const pagination = jobsData?.jobs || {};

  const handleNextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => prev - 1);
  };

  return (
    <div className={styles.startupJobs}>
      <h1>Startup Jobs</h1>
      <h2 className={styles.h2}> Total : {pagination.totalDocs}</h2>
      <div className={styles.buttonContainer}>
        {portalUse && (
          <AddMentorPopUp
            setPortalUse={setPortalUse}
            portalUse={portalUse}
            header={"Create New Job"}
            subHeader={"Create and offer job to everyone"}
            add={"job"}
            role={"mentor"}
          />
        )}
      </div>

      <SpinnerSvg spinner={isLoading} width={50} />
      {error && <p>{error.message}</p>}
      {!isLoading && jobs.length === 0 && (
        <div>
          <h1>No Jobs Available</h1>
          <p>It looks like you don’t have any jobs listed at the moment.</p>
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
              createdAt={job.createdAt}
            />
          ))}
        </div>
      )}

      {pagination.totalDocs > pagination.limit && (
        <div className={styles.pagination}>
          <button
            onClick={handlePrevPage}
            disabled={pagination.page === 1}
            className={pagination.page === 1 ? styles.red : ""}
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
      )}
    </div>
  );
};
export default MentorJobs;
