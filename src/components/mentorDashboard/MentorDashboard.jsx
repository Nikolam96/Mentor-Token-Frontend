import styles from "./mentorDashboard.module.css";
import useJobsApi from "../../api/JobsApi";
import { getId } from "../../config/StorageFunctions";
import AssignedJob from "../assignedJobs/AssignedJobs";
import { useState } from "react";
import ApplicationSend from "../appSend/ApplicationSend";
import SpinnerSvg from "../SpinnerSvg";

const MentorDashboard = () => {
  const [jobsPage, setJobsPage] = useState({
    page: "?page=1&limit=10",
    url: `/getUserApplication/${getId()}`,
  });

  const [pendingPage, setPendingPage] = useState({
    page: "?page=1&applicationType=mentorToCompany&limit=3",
    url: `/getUserPendingApplication/${getId()}`,
  });

  const [companyPage, setCompanyPage] = useState({
    page: "?page=1&applicationType=companyToMentor&limit=3",
    url: `/getUserPendingApplication/${getId()}`,
  });

  const {
    data: jobsData,
    isLoading: isJobsLoading,
    isError: jobsError,
    error: jobsMessage,
  } = useJobsApi(jobsPage.page, jobsPage.url);
  const jobs = jobsData?.jobs?.docs || [];
  const jobsDocs = jobsData?.jobs || {};

  const {
    data: companyData,
    isLoading: isCompanyLoading,
    isError: companyError,
    error: companyMessage,
  } = useJobsApi(companyPage.page, companyPage.url);
  const company = companyData?.pending?.docs || [];
  const companyDocs = companyData?.pending || {};

  console.log(company);
  const {
    data: pendingData,
    isLoading: isPendingLoading,
    isError: pendingError,
    error: pendingMessage,
  } = useJobsApi(pendingPage.page, pendingPage.url);
  const pending = pendingData?.pending?.docs || [];
  const pendingDocs = pendingData?.pending || {};

  return (
    <div className={styles.mentorDashboard}>
      <div className={styles.assignedJobs}>
        <h1>Assigned Jobs</h1>
        {jobsError && (
          <p className={styles.error}>Error: {jobsMessage.message}</p>
        )}
        <SpinnerSvg spinner={isJobsLoading} width={50} />
        <h3>&nbsp;</h3>
        {!isJobsLoading &&
          !jobsError &&
          jobs &&
          jobs.map((job) => <AssignedJob {...job} key={job._id} />)}
        {jobsDocs.totalDocs > jobsDocs.limit && (
          <div className={styles.pagination}>
            <button
              onClick={() =>
                setJobsPage({
                  ...jobsPage,
                  page: `?page=${jobsDocs.page - 1}&limit=10`,
                })
              }
              disabled={!jobsDocs?.hasPrevPage}
              className={!jobsDocs?.hasPrevPage ? styles.red : ""}
            >
              Previous Page
            </button>
            <button
              onClick={() =>
                setJobsPage({
                  ...jobsPage,
                  page: `?page=${jobsDocs.page + 1}&limit=10`,
                })
              }
              disabled={!jobsDocs?.hasNextPage}
              className={!jobsDocs?.hasNextPage ? styles.red : ""}
            >
              Next Page
            </button>
          </div>
        )}
      </div>

      <div className={styles.applicationContainer}>
        <h1>Pending Jobs</h1>
        <h3>Jobs offered from your startup</h3>
        {jobsError && (
          <p className={styles.error}>Error: {companyMessage.message}</p>
        )}
        <SpinnerSvg spinner={isCompanyLoading} width={50} />
        {!isCompanyLoading &&
          !companyError &&
          company &&
          company.map((job) => <ApplicationSend {...job} key={job._id} />)}
        {companyDocs.totalDocs > companyDocs.limit && (
          <div className={styles.pagination}>
            <button
              onClick={() =>
                setCompanyPage({
                  ...companyPage,
                  page: `?page=${
                    companyDocs.page - 1
                  }&applicationType=companyToMentor&limit=3`,
                })
              }
              disabled={!companyDocs?.hasPrevPage}
              className={!companyDocs?.hasPrevPage ? styles.red : ""}
            >
              Previous Page
            </button>
            <button
              onClick={() =>
                setCompanyPage({
                  ...companyPage,
                  page: `?page=${
                    companyDocs.page + 1
                  }&applicationType=companyToMentor&limit=3`,
                })
              }
              disabled={!companyDocs?.hasNextPage}
              className={!companyDocs?.hasNextPage ? styles.red : ""}
            >
              Next Page
            </button>
          </div>
        )}
      </div>

      <div className={styles.applicationContainer}>
        <h1>Applications sent </h1>
        <h3>Jobs you have applied to</h3>
        {pendingError && (
          <p className={styles.error}>Error: {pendingMessage.message}</p>
        )}
        <SpinnerSvg spinner={isPendingLoading} width={50} />
        {!isPendingLoading &&
          !pendingError &&
          pending &&
          pending.map((job) => (
            <ApplicationSend {...job} key={job._id} pending={true} />
          ))}
        {pendingDocs.totalDocs > pendingDocs.limit && (
          <div className={styles.pagination}>
            <button
              onClick={() =>
                setPendingPage({
                  ...pendingPage,
                  page: `?page=${
                    pendingDocs.page - 1
                  }&applicationType=mentorToCompany&limit=3`,
                })
              }
              disabled={!pendingDocs?.hasPrevPage}
              className={!pendingDocs?.hasPrevPage ? styles.red : ""}
            >
              Previous Page
            </button>
            <button
              onClick={() =>
                setPendingPage({
                  ...pendingPage,
                  page: `?page=${
                    pendingDocs.page + 1
                  }&applicationType=mentorToCompany&limit=3`,
                })
              }
              disabled={!pendingDocs?.hasNextPage}
              className={!pendingDocs?.hasNextPage ? styles.red : ""}
            >
              Next Page
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
export default MentorDashboard;
