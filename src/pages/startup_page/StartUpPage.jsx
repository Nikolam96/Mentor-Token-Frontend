import { Outlet } from "react-router-dom";
import TokenPage_navbar from "../../components/tokenPage_navbar/TokenPage_navbar";
import StartupData from "../../data/StartupData";
import styles from "./startup.module.css";
import StartupInput from "../../components/startupInput/StartupInput";

const StartUpPage = () => {
  return (
    <div className={styles.startUp}>
      <div className={styles.wrapper}>
        <div className={styles.navbar}>
          <TokenPage_navbar items={StartupData} />
        </div>
        <div className={styles.input}>
          <StartupInput
            placeholder={"Search Mentor"}
            name={"Nikola Mitic"}
            role={"Startup"}
            img={"../../../public/id4.png"}
          />
        </div>
        <Outlet />
      </div>
    </div>
  );
};
export default StartUpPage;
