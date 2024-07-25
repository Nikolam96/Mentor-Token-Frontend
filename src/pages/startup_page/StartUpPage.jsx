import { Outlet, useNavigate } from "react-router-dom";
import TokenPage_navbar from "../../components/tokenPage_navbar/TokenPage_navbar";
import StartupData from "../../data/StartupData";
import styles from "./startup.module.css";
import StartupInput from "../../components/startupInput/StartupInput";
import { useEffect, useState } from "react";
import { getRole, getId } from "../../config/StorageFunctions";
import properties from "../../config/properties";
import axios from "axios";
import SpinnerSvg from "../../components/SpinnerSvg";

const StartUpPage = () => {
  const navigate = useNavigate();
  const role = getRole();

  const [userData, setUserData] = useState({});
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${properties.url_base}/getUser/${getId()}`
      );
      setUserData(response?.data?.data?.user);
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (role === "mentor") {
      navigate("/mentor/dashboard");
    }
  }, []);

  return (
    <div className={styles.startUp}>
      <div className={styles.wrapper}>
        <div className={styles.navbar}>
          <TokenPage_navbar items={StartupData} />
        </div>
        <div className={styles.input}>
          {error && <p className={styles.error}>Error: {error}</p>}
          <StartupInput
            placeholder={"Search Mentor"}
            name={userData?.startUpName || "user"}
            role={userData?.role || "undefined"}
            img={
              userData.picture
                ? `${properties.img_base}/${userData.picture}`
                : "../../../public/avater_picture.png"
            }
          />
        </div>
        <Outlet />
      </div>
    </div>
  );
};
export default StartUpPage;
