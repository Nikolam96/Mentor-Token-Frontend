import { useEffect, useRef, useState } from "react";
import axios from "axios";
import SpinnerSvg from "../SpinnerSvg";
import AssignedJob from "../assignedJobs/AssignedJobs";
import TopMentorSection from "../topMentorsSection/TopMentorSection";
import LineChart from "../lineChart/LineChart";
import falseTable from "../../data/TableData";
import useJobsApi from "../../api/JobsApi";
import startUpApi from "../../api/startUpApi";
import styles from "./startUpDashboard.module.css";

const StartupDashboard = () => {
  const [click, setClick] = useState(false);
  const [tableData, setTableData] = useState(falseTable);
  const [mentorsPage, setMentorsPage] = useState({
    page: "?page=1",
    url: `/getTopMentors`,
  });
  const [jobsPage, setJobsPage] = useState({
    page: "?page=1",
    url: `/getUserApplication/`,
  });

  const {
    data: mentorsData,
    isLoading: isLoadingMentors,
    isError: isErrorMentors,
  } = useJobsApi(mentorsPage.page, mentorsPage.url);
  const mentors = mentorsData?.topMentors;

  const {
    data: jobsData,
    isLoading: isJobsLoading,
    isError: jobsError,
    error: jobsMessage,
    refetch: refetchJobs,
  } = startUpApi(jobsPage.page, jobsPage.url);
  const jobs = jobsData?.jobs?.docs || [];
  const jobsDocs = jobsData?.jobs || {};

  const fetchTable = async () => {
    try {
      const response = await axios.get(
        `http://localhost:10000/api/v1/getApplicationsByMonth/${click}`
      );
      setTableData(response?.data?.data);
    } catch (error) {
      console.error("Error fetching table data:", error);
    }
  };

  useEffect(() => {
    if (click) {
      fetchTable();
      refetchJobs();
    }
  }, [click, jobsPage]);

  return (
    <div className={styles.startUpDashboard}>
      <div>
        <h1>Assigned Jobs</h1>
        {jobs.length === 0 && !isJobsLoading && (
          <h2>Click on Mentor to get Data!</h2>
        )}
        {jobsError && (
          <p className={styles.error}>Error: {jobsMessage.message}</p>
        )}
        <SpinnerSvg spinner={isJobsLoading} width={50} />
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
                  page: `?page=${jobsDocs.page - 1}`,
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
                  page: `?page=${jobsDocs.page + 1}`,
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
      <div>
        <div className={styles.mentor}>
          <h1>Best Performing Mentors</h1>
          {!isLoadingMentors && !isErrorMentors && mentors && (
            <TopMentorSection
              data={mentors}
              click={click}
              setClick={setClick}
              setJobsPage={setJobsPage}
              jobsPage={jobsPage}
            />
          )}
        </div>
        <div className={styles.lineChart}>
          <h1>Statistics</h1>
          <LineChart aggregation={tableData} />
        </div>
      </div>
    </div>
  );
};

export default StartupDashboard;
