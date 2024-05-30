import styles from "./login.module.css";

const Login = () => {
  return (
    <div className={styles.login}>
      <img src="../../../public/Vector.png" alt="" />
      <h2>Log in to mentor token</h2>
      <p>Enter your email and pass to login.</p>
      <div className={styles.form}>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" />
        <input type="password" name="password" />
        <input type="submit" value="Log in" />
      </div>
      <div>
        <p>
          Don’t have account? <a href="#">Register.</a>
        </p>
      </div>
    </div>
  );
};
export default Login;
