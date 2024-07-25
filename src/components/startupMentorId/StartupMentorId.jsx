import { useParams } from "react-router-dom";
import styles from "./startupMentorId.module.css";
import PersonalInfo from "../PersonalInfo";
import AboutSection from "../AboutSection";
import PendingJob from "../PendingJob";
import useJobsApi from "../../api/JobsApi";
import SpinnerSvg from "../SpinnerSvg";
import { useState } from "react";
import AssignedJob from "../assignedJobs/AssignedJobs";

const StartupMentorId = () => {
  const { id } = useParams();
  const [active, setActive] = useState("all");

  const [userPage, setUserPage] = useState({
    page: "?page=1",
    url: `/getUser/${id}`,
  });
  const [pendingPage, setPendingPage] = useState({
    page: "?page=1&applicationType=companyToMentor",
    url: `/getUserPendingApplication/${id}`,
  });
  const [jobsPage, setJobsPage] = useState({
    page: "?page=1",
    url: `/getUserApplication/${id}`,
  });

  const {
    data: usersData,
    isLoading,
    isError,
    error,
  } = useJobsApi(userPage.page, userPage.url);
  const user = usersData?.user || [];

  const {
    data: pendingData,
    isLoading: isPending,
    isError: pendingError,
    error: pendingMessage,
  } = useJobsApi(pendingPage.page, pendingPage.url);
  const pendingJobs = pendingData?.pending?.docs || [];
  const pendingDocs = pendingData?.pending || {};

  const {
    data: jobsData,
    isLoading: isJobsLoading,
    isError: jobsError,
    error: jobsMessage,
  } = useJobsApi(jobsPage.page, jobsPage.url);
  const jobs = jobsData?.jobs?.docs || [];
  const jobsDocs = jobsData?.jobs || {};

  const handleFilter = (status) => {
    setJobsPage({
      ...jobsPage,
      page: `?page=1&limit=10&acceptedStatus=${status}`,
      url: `/getUserApplication/${id}`,
    });
  };

  return (
    <div className={styles.startupMentorId}>
      <SpinnerSvg spinner={isLoading} width={50} />
      {isError && <p className={styles.error}>Error: {error.message}</p>}
      {pendingError && (
        <p className={styles.error}>Error: {pendingMessage.message}</p>
      )}
      {jobsError && (
        <p className={styles.error}>Error: {jobsMessage.message}</p>
      )}
      {!isLoading && !isError && user && (
        <>
          <PersonalInfo {...user} />
          <AboutSection {...user} mentor={true} />
          <div className={styles.col_2}>
            {!isJobsLoading && !jobsError && jobs && (
              <>
                <h1>Assigned Jobs</h1>
                <ul className={styles.jobsList}>
                  <li
                    onClick={() => {
                      setActive("all");
                      handleFilter("");
                    }}
                    className={active == "all" ? styles.active : ""}
                  >
                    All
                  </li>
                  <li
                    onClick={() => {
                      setActive("done");
                      handleFilter("done");
                    }}
                    className={active == "done" ? styles.active : ""}
                  >
                    Done
                  </li>
                  <li
                    onClick={() => {
                      setActive("rejected");
                      handleFilter("rejected");
                    }}
                    className={active == "rejected" ? styles.active : ""}
                  >
                    Rejected
                  </li>
                  <li
                    onClick={() => {
                      setActive("in progress");
                      handleFilter("in progress");
                    }}
                    className={active == "in progress" ? styles.active : ""}
                  >
                    In Progress
                  </li>
                </ul>

                {jobs.length === 0 && (
                  <h2>There are currently no assigned jobs!</h2>
                )}
                {jobs.map((job) => (
                  <AssignedJob {...job} key={job._id} />
                ))}
              </>
            )}
            {jobsDocs.totalDocs > jobsDocs.limit && (
              <div className={styles.pagination}>
                <button
                  onClick={() => {
                    active == "all"
                      ? setJobsPage({
                          ...jobsPage,
                          page: `?page=${jobsDocs.page - 1}&limit=8`,
                        })
                      : setJobsPage({
                          ...jobsPage,
                          page: `?page=${
                            jobsDocs.page - 1
                          }&limit=8&acceptedStatus=${active}`,
                        });
                  }}
                  disabled={!jobsDocs?.hasPrevPage}
                  className={!jobsDocs?.hasPrevPage ? styles.red : ""}
                >
                  Previous Page
                </button>
                <button
                  onClick={() => {
                    active == "all"
                      ? setJobsPage({
                          ...jobsPage,
                          page: `?page=${jobsDocs.page + 1}&limit=8`,
                        })
                      : setJobsPage({
                          ...jobsPage,
                          page: `?page=${
                            jobsDocs.page + 1
                          }&limit=8&acceptedStatus=${active}`,
                        });
                  }}
                  disabled={!jobsDocs?.hasNextPage}
                  className={!jobsDocs?.hasNextPage ? styles.red : ""}
                >
                  Next Page
                </button>
              </div>
            )}
          </div>
        </>
      )}
      <div className={styles.col_2}>
        {!isPending && !pendingError && pendingJobs && (
          <>
            <h1 className={styles.special}>Pending Job Offers </h1>
            {pendingJobs?.length === 0 && (
              <h2>There are currently no assigned jobs!</h2>
            )}

            {pendingJobs.map((job) => (
              <PendingJob {...job} key={job._id} />
            ))}
            {pendingDocs?.totalDocs > pendingDocs?.limit && (
              <div className={styles.pagination}>
                <button
                  onClick={() =>
                    setPendingPage({
                      ...pendingPage,
                      page: `?page=${pendingDocs.page - 1}`,
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
                      page: `?page=${pendingDocs.page + 1}`,
                    })
                  }
                  disabled={!pendingDocs?.hasNextPage}
                  className={!pendingDocs?.hasNextPage ? styles.red : ""}
                >
                  Next Page
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
export default StartupMentorId;
