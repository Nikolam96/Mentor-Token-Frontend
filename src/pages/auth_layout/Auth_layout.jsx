import styles from "./Auth_layout.module.css";
import { Outlet } from "react-router-dom";

const Auth_layout = () => {
  return (
    <div className={styles.layout}>
      <div className={styles.auth}>
        <div>
          <h1>Grow your startup!</h1>
          <p datatype="uppercase">Monitoring and evaluating now is easy!</p>
        </div>
        <div>
          <div className={styles.d_flex}>
            <img
              src="../../../White_vector.png"
              alt=""
              className={styles.vector}
            />
            <div>
              <h2>Mentor Token</h2>
              <p className={styles.hide_p}>mentortoken.com</p>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.login}>
        <img src="../../../Rocket.png" className={styles.rocket} alt="" />
        <Outlet />
      </div>
    </div>
  );
};
export default Auth_layout;
