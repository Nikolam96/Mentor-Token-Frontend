import { useState } from "react";
import styles from "./login/login.module.css";
import SpinnerSvg from "./SpinnerSvg";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import api from "../config/properties";

const ForgotPassword = () => {
  const [user, setUser] = useState({ email: "" });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: async () => {
      return await axios.post(`${api.url_base}/reset`, user);
    },
    onError: (error) => {
      setError(error?.response?.data?.error?.message);
    },
  });

  const handleClick = (event) => {
    event.preventDefault();
    mutate();
  };

  return (
    <div className={styles.login}>
      <img src="../../../public/Vector.png" alt="" />
      <div className={styles.wrapper}>
        <h2>Enter your e-mail</h2>
      </div>

      {error && <p className={styles.red}>{error}</p>}
      <SpinnerSvg spinner={isPending} width={30} />

      <form action="" className={styles.form}>
        <div className={styles.input_container}>
          <label htmlFor="email" className={styles.label}>
            Email
          </label>
          <input
            onChange={(e) => {
              handleChange(e);
              setError("");
            }}
            value={user.email}
            type="email"
            name="email"
            id="email"
            placeholder="mentortoken@gmail.com"
          />
        </div>
        <input
          type="submit"
          value="Submit"
          onClick={handleClick}
          disabled={isSuccess}
          style={isSuccess ? { backgroundColor: "rgba(120, 122, 130, 1)" } : {}}
        />
        {isSuccess && (
          <div className={styles.forgotPass}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="35px"
              viewBox="0 -960 960 960"
              width="35px"
              fill="green"
            >
              <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
            </svg>
            <h3>A reset email has been sent.</h3>
          </div>
        )}
      </form>
      <div>
        <p>
          Go to login?
          <Link href="#" className={styles.violet} to={"/login"}>
            Login.
          </Link>
        </p>
      </div>
    </div>
  );
};
export default ForgotPassword;
