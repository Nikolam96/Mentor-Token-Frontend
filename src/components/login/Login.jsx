import { Link } from "react-router-dom";
import styles from "./login.module.css";
import { useState } from "react";
import LoginApi from "../../api/LoginApi";
import SpinnerSvg from "../SpinnerSvg";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [spinner, setSpinner] = useState(false);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const apiCall = LoginApi({ user, setSpinner, setError });

  const handleClick = (event) => {
    event.preventDefault();
    apiCall();
  };
  return (
    <div className={styles.login}>
      <img src="../../../public/Vector.png" alt="" />
      <div className={styles.wrapper}>
        <h2>Log in to mentor token</h2>
        <p className={styles.special}>Enter your email and pass to login.</p>
      </div>

      {error && <p className={styles.red}>{error}</p>}
      <SpinnerSvg spinner={spinner} />

      <form action="" className={styles.form}>
        <div className={styles.input_container}>
          <label htmlFor="email" className={styles.label}>
            Email
          </label>
          <input
            onChange={handleChange}
            value={user.email}
            type="email"
            name="email"
            id="email"
            placeholder="mentortoken@gmail.com"
            autoComplete="off"
          />
        </div>
        <input
          onChange={handleChange}
          value={user.password}
          type="password"
          name="password"
          placeholder="Password"
          autoComplete="off"
        />
        <input type="submit" value="Log in" onClick={handleClick} />
      </form>
      <div>
        <p>
          Don’t have account?
          <Link href="#" className={styles.violet} to={"/register"}>
            Register.
          </Link>
        </p>
      </div>
    </div>
  );
};
export default Login;
