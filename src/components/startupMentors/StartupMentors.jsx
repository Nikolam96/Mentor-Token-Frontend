import AddMentorComponent from "../AddMentorComponent";
import { useState } from "react";
import styles from "./startupMentors.module.css";
import MentorsDataComponent from "../MentorsDataComponent";
import StartupOverview from "../startupOverview/StartupOverview";
import useJobsApi from "../../api/JobsApi";
import SpinnerSvg from "../SpinnerSvg";

const StartupMentors = () => {
  const [currentPage, setCurrentPage] = useState(1);
  let page = `?page=${currentPage}`;
  let url = `/getUsers`;

  const { data: usersData, isLoading, error } = useJobsApi(page, url);
  const users = usersData?.users.docs || [];
  const stats = usersData || {};
  const pagination = usersData?.users || {};

  console.log(pagination);

  const handleNextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => prev - 1);
  };

  return (
    <div className={styles.startupMentor}>
      <AddMentorComponent />
      <SpinnerSvg spinner={isLoading} width={50} />
      {error && <p>{error.message}</p>}
      <div className={styles.grid}>
        <div>
          {!isLoading &&
            users &&
            users.map((mentor) => {
              return <MentorsDataComponent key={mentor._id} mentor={mentor} />;
            })}
          {pagination.totalDocs > 5 && (
            <div className={styles.pagination}>
              <button
                onClick={handlePrevPage}
                disabled={!pagination?.hasPreviousPage}
                className={!pagination?.hasPreviousPage ? styles.red : ""}
              >
                Previous Page
              </button>
              <button
                onClick={handleNextPage}
                disabled={!pagination?.hasNextPage}
                className={!pagination?.hasNextPage ? styles.red : ""}
              >
                Next Page
              </button>
            </div>
          )}
        </div>
        <StartupOverview
          mentors={stats.totalUsers}
          AssignedJobs={stats.totalJobs}
          finishedJobs={stats.finishedJobs}
          startup={true}
        />
      </div>
    </div>
  );
};
export default StartupMentors;
