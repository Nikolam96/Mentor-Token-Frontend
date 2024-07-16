import { Outlet, useNavigate } from "react-router-dom";
import TokenPage_navbar from "../../components/tokenPage_navbar/TokenPage_navbar";
import StartupData from "../../data/StartupData";
import styles from "./startup.module.css";
import StartupInput from "../../components/startupInput/StartupInput";
import { useEffect } from "react";
import {
  getRole,
  getStartUpName,
  getPicture,
} from "../../config/StorageFunctions";
import properties from "../../config/properties";

const StartUpPage = () => {
  const navigate = useNavigate();
  const role = getRole();
  const startUpName = getStartUpName();
  const picture = getPicture();

  useEffect(() => {
    if (role === "mentor") {
      navigate("/mentor/dashboard");
    }
  }, []);

  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <div className={styles.startUp}>
      <div className={styles.wrapper}>
        <div className={styles.navbar}>
          <TokenPage_navbar items={StartupData} />
        </div>
        <div className={styles.input}>
          <StartupInput
            placeholder={"Search Mentor"}
            name={startUpName}
            role={role}
            img={
              picture
                ? `${properties.img_base}/${picture}`
                : "../../../public/avatar_picture.png"
            }
          />
        </div>
        <Outlet />
      </div>
    </div>
  );
};
export default StartUpPage;
