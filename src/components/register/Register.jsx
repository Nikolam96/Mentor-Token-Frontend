import { useEffect, useState } from "react";
import styles from "./register.module.css";
import { Link } from "react-router-dom";
import SpinnerSvg from "../SpinnerSvg";
// import RegisterApi from "../../api/RegisterApi";
import PostApi from "../../api/PostApi";
import CheckSvg from "../CheckSvg";

const Register = () => {
  const [user, setUser] = useState({
    password: "",
    email: "",
    role: "startup",
  });
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [error, setError] = useState(null);
  const [spinner, setSpinner] = useState(false);

  const isDisabled =
    !/[a-z]/.test(user.password) ||
    !/[A-Z]/.test(user.password) ||
    user.password.length <= 8 ||
    !/[0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(user.password);

  useEffect(() => {
    setIsButtonDisabled(isDisabled);
  }, [user.password]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleClick = (event) => {
    event.preventDefault();
    apiCall();
  };

  let url = "checkEmail";
  let navigateUrl =
    user.role === "mentor" ? "/register-mentor" : "/register-start-up";

  const apiCall = PostApi({ user, setSpinner, setError, url, navigateUrl });

  return (
    <div className={styles.register}>
      <div className={styles.wrapper}>
        <img src="../../../Vector.png" alt="" />
        <h2>Choose Account type</h2>
      </div>

      <div className={styles.btn_container}>
        <button
          className={`${styles.btn} ${
            user.role === "startup" && styles.active
          }`}
          onClick={() => {
            setUser({ ...user, role: "startup" });
          }}
        >
          Startup
        </button>
        <button
          className={`${styles.btn} ${user.role === "mentor" && styles.active}`}
          onClick={() => {
            setUser({ ...user, role: "mentor" });
          }}
        >
          Mentor
        </button>
      </div>
      {error && <p className={styles.red}>{error}</p>}
      <SpinnerSvg spinner={spinner} />

      <form action="" className={styles.form}>
        <div className={styles.input_container}>
          <label htmlFor="email" className={styles.label}>
            Email
          </label>
          <input
            value={user.email}
            type="email"
            name="email"
            id="email"
            onChange={(e) => {
              handleChange(e);
              setError("");
            }}
            placeholder="mentortoken@mail.com"
            autoComplete="off"
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            value={user.password}
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            onChange={handleChange}
            autoComplete="off"
          />
        </div>
        <div>
          <div className={styles.check_container}>
            <p
              className={`${
                /[a-z]/.test(user.password) &&
                /[A-Z]/.test(user.password) &&
                styles.opacity
              }`}
            >
              <CheckSvg />
              Password Strength : Weak
            </p>
            <p className={`${user.email !== user.password && styles.opacity}`}>
              <CheckSvg />
              Cannot contain your name or email address
            </p>
            <p className={`${user.password.length > 8 && styles.opacity}`}>
              <CheckSvg />
              At least 8 characters
            </p>
            <p
              className={`${
                user.password.match(
                  /[0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/
                ) && styles.opacity
              }`}
            >
              <CheckSvg />
              Contains a number or symbol
            </p>
          </div>
          <input
            className={isButtonDisabled ? styles.low_opacity : ""}
            type="button"
            value="Continue"
            disabled={isButtonDisabled}
            onClick={handleClick}
          />
        </div>
        <p className={styles.special_p}>
          Already have account?
          <Link href="#" className={styles.violet} to={"/login"}>
            Login.
          </Link>
        </p>
      </form>
    </div>
  );
};
export default Register;
