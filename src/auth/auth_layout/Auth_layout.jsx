import Login from "../login/Login";
import styles from "./Auth_layout.module.css";

const Auth_layout = () => {
  return (
    <div className={styles.layout}>
      <div className={styles.auth}>
        <h1>Grow your startup!</h1>
      </div>
      <Login className={styles.login} />
    </div>
  );
};
export default Auth_layout;
