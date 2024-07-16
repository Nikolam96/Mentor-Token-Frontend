import styles from "./mentorStats.module.css";
import LineChart from "../lineChart/LineChart";
import StartupOverview from "../startupOverview/StartupOverview";
import PersonalInfo from "../PersonalInfo";
import AboutSection from "../AboutSection";
import { getId } from "../../config/StorageFunctions";
import { useState, useEffect } from "react";
import useJobsApi from "../../api/JobsApi";
import falseTable from "../../data/TableData";
import axios from "axios";

const MentorStats = () => {
  const [tableData, setTableData] = useState(falseTable);
  const [stats, setStats] = useState([]);
  const [userPage, setUserPage] = useState({
    page: "?page=1",
    url: `/getUser/${getId()}`,
  });

  const fetchTable = async () => {
    try {
      const response = await axios.get(
        `http://localhost:10000/api/v1/getApplicationsByMonth/${getId()}`
      );
      setTableData(response?.data?.data);
    } catch (error) {
      console.error("Error fetching table data:", error);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await axios.get(
        `http://localhost:10000/api/v1/mentorStats/${getId()}`
      );
      setStats(response?.data?.data);
    } catch (error) {
      console.error("Error fetching table data:", error);
    }
  };

  useEffect(() => {
    fetchTable();
    fetchStats();
  }, []);

  console.log(stats);
  const {
    data: usersData,
    isLoading,
    isError,
    error,
  } = useJobsApi(userPage.page, userPage.url);
  const user = usersData?.user || [];

  return (
    <div className={styles.mentorStats}>
      {!isLoading && !isError && user && <PersonalInfo {...user} />}

      <div className={styles.about}>
        {!isLoading && !isError && user && <AboutSection {...user} />}
      </div>
      <div className={styles.lineChart}>
        <h1>Statistics</h1>
        <LineChart aggregation={tableData} />
      </div>
      <div className={styles.overview}>
        <StartupOverview
          mentors={stats?.totalJobs || 12}
          assignedJobs={stats?.assignedJobs || 6}
          finishedJobs={stats?.finishedJobs || 14}
          appliedJobs={stats?.appliedJobs || 12}
        />
      </div>
    </div>
  );
};

export default MentorStats;
