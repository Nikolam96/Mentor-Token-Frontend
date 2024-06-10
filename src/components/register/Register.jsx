import { useEffect, useState } from "react";
import styles from "./register.module.css";
import { Link } from "react-router-dom";
import SpinnerSvg from "../SpinnerSvg";
import RegisterApi from "../../api/RegisterApi";
import CheckSvg from "../CheckSvg";

const Register = () => {
  const [form, setForm] = useState({
    password: "",
    email: "",
    role: "startup",
  });
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [error, setError] = useState(null);
  const [spinner, setSpinner] = useState(false);

  const isDisabled =
    !/[a-z]/.test(form.password) ||
    !/[A-Z]/.test(form.password) ||
    form.password.length <= 8 ||
    !/[0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(form.password);

  useEffect(() => {
    setIsButtonDisabled(isDisabled);
  }, [form.password]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleClick = (event) => {
    event.preventDefault();
    apiCall();
  };

  const apiCall = RegisterApi({ form, setSpinner, setError });

  return (
    <div className={styles.register}>
      <div className={styles.wrapper}>
        <img src="../../../Vector.png" alt="" />
        <h2>Choose Account type</h2>
      </div>

      <div className={styles.btn_container}>
        <button
          className={`${styles.btn} ${
            form.role === "startup" && styles.active
          }`}
          onClick={() => {
            setForm({ ...form, role: "startup" });
          }}
        >
          Startup
        </button>
        <button
          className={`${styles.btn} ${form.role === "mentor" && styles.active}`}
          onClick={() => {
            setForm({ ...form, role: "mentor" });
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
            value={form.email}
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
            value={form.password}
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
                /[a-z]/.test(form.password) &&
                /[A-Z]/.test(form.password) &&
                styles.opacity
              }`}
            >
              <CheckSvg />
              Password Strength : Weak
            </p>
            <p className={`${form.email !== form.password && styles.opacity}`}>
              <CheckSvg />
              Cannot contain your name or email address
            </p>
            <p className={`${form.password.length > 8 && styles.opacity}`}>
              <CheckSvg />
              At least 8 characters
            </p>
            <p
              className={`${
                form.password.match(
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
