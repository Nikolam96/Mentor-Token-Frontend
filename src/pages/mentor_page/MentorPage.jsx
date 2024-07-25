import { Outlet, useNavigate } from "react-router-dom";
import TokenPage_navbar from "../../components/tokenPage_navbar/TokenPage_navbar";
import MentorData from "../../data/MentorNavbarData";
import styles from "./mentorPage.module.css";
import StartupInput from "../../components/startupInput/StartupInput";
import { useEffect, useMemo, useState } from "react";
import { getRole, getId } from "../../config/StorageFunctions";
import properties from "../../config/properties";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import api from "../../config/properties";
import SpinnerSvg from "../../components/SpinnerSvg";

const MentorPage = () => {
  const [passwrd, setPass] = useState(false);

  const navigate = useNavigate();
  const role = getRole();
  const { state } = useLocation();

  const [userData, setUserData] = useState({});
  const [error, setError] = useState(false);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${properties.url_base}/getUser/${getId()}`
      );
      setUserData(response?.data?.data?.user);
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (role === "startup") {
      navigate("/startup/dashboard");
    }
  }, []);

  const { mutate, isPending, isSuccess, isError } = useMutation({
    mutationFn: async () => {
      return await axios.post(`${api.url_base}/reset`, {
        email: userData.email,
      });
    },

    onError: (error) => {
      setError(error?.response?.data?.error?.message);
    },
  });

  const handleClick = () => {
    mutate();
  };
  useEffect(() => {
    if (state?.user?.password === "newMentor") {
      setPass(true);
    }

    if (!isPending && !isError && isSuccess) {
      const timeoutId = setTimeout(() => {
        setPass(false);
      }, 3000);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [isSuccess]);

  return (
    <div className={styles.mentor}>
      <div className={styles.wrapper}>
        <div className={styles.navbar}>
          <TokenPage_navbar items={MentorData} />
        </div>
        {passwrd && (
          <div className={styles.inputWrapper}>
            <SpinnerSvg spinner={isPending} width={30} />
            <h3>You didn't receive email for Updating Password?</h3>
            <button
              datatype="submit"
              onClick={handleClick}
              disabled={isSuccess}
              style={
                isSuccess ? { backgroundColor: "rgba(120, 122, 130, 1)" } : {}
              }
            >
              Send Again
            </button>
            {isSuccess && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="35px"
                viewBox="0 -960 960 960"
                width="35px"
                fill="green"
              >
                <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
              </svg>
            )}
          </div>
        )}
        <div className={styles.input}>
          {error && !isSuccess && !isPending && (
            <p className={styles.error}>Error: {error}</p>
          )}
          <StartupInput
            placeholder={"Search"}
            name={userData ? userData.name : "user"}
            role={userData ? userData.role : "undefined"}
            img={
              userData.picture !== "default.img"
                ? `${properties.img_base}/${userData.picture}`
                : "../../../public/avater_picture.png"
            }
          />
        </div>
        <Outlet />
      </div>
    </div>
  );
};
export default MentorPage;
