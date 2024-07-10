import { Outlet, useNavigate } from "react-router-dom";
import TokenPage_navbar from "../../components/tokenPage_navbar/TokenPage_navbar";
import MentorData from "../../data/MentorNavbarData";
import styles from "./mentorPage.module.css";
import StartupInput from "../../components/startupInput/StartupInput";
import { useEffect } from "react";
import { getRole, getName, getPicture } from "../../config/StorageFunctions";
import properties from "../../config/properties";

const MentorPage = () => {
  const navigate = useNavigate();
  const role = getRole();
  const name = getName();
  const picture = getPicture();

  useEffect(() => {
    if (role === "startup") {
      navigate("/startup/dashboard");
    }
  }, []);

  return (
    <div className={styles.mentor}>
      <div className={styles.wrapper}>
        <div className={styles.navbar}>
          <TokenPage_navbar items={MentorData} />
        </div>
        <div className={styles.input}>
          <StartupInput
            placeholder={"Search"}
            name={name ? name : "user"}
            role={role ? role : "undefined"}
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
export default MentorPage;
