import { getId, getRole } from "../../config/StorageFunctions";
import styles from "./personal.module.css";
import { useEffect, useState, useRef } from "react";
import SpinnerSvg from "../SpinnerSvg";
import updateUserApi from "../../api/useJobsApi";
import axios from "axios";
import api from "../../config/properties";

const PersonalData = () => {
  const [userData, setUserData] = useState({});
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fileInputRef = useRef(null);
  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${api.url_base}/getUser/${getId()}`);
      setUserData(response?.data?.data?.user);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log(userData);

  const handleClose = () => {
    window.location.reload();
  };

  const updateUser = updateUserApi(setError, handleClose);

  const updateUserData = () => {
    let headers = "multipart/form-data";
    let url = `updateUser`;
    let fetchMethod = "patch";
    let data = userData;

    updateUser.mutate({ data, url, headers, fetchMethod });
  };

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleChangePicture = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type.startsWith("image/")) {
        setUserData({ ...userData, picture: file });
      } else {
        setError("Please select a valid image file.");
      }
    }
  };

  if (getRole() === "startup") {
    return (
      <div className={styles.personalData}>
        <SpinnerSvg spinner={isLoading} width={50} />
        {error && <p className={styles.error}>Error: {error}</p>}
        {!isLoading && !error && userData && (
          <>
            <label className={styles.label} htmlFor="name">
              Name
            </label>
            <input
              type="text"
              value={userData?.name || ""}
              name="name"
              id="name"
              onChange={handleChange}
              className={styles.input}
            />

            <label className={styles.label} htmlFor="businessAddress">
              Business Address
            </label>
            <input
              type="text"
              value={userData?.businessAddress || ""}
              name="businessAddress"
              id="businessAddress"
              onChange={handleChange}
              className={styles.input}
            />

            <label className={styles.label} htmlFor="email">
              Email
            </label>
            <input
              type="text"
              value={userData?.email || ""}
              name="email"
              id="email"
              onChange={handleChange}
              className={styles.input}
            />

            <label className={styles.label} htmlFor="startUpName">
              Startup Name
            </label>
            <input
              type="text"
              value={userData?.startUpName || ""}
              name="startUpName"
              id="startUpName"
              onChange={handleChange}
              className={styles.input}
            />

            <label className={styles.label} htmlFor="phone">
              Phone
            </label>
            <input
              type="text"
              value={userData?.phone || ""}
              name="phone"
              id="phone"
              onChange={handleChange}
              className={styles.input}
            />

            <label className={styles.label} htmlFor="picture">
              Profile Picture
            </label>
            <input
              type="file"
              name="picture"
              id="picture"
              ref={fileInputRef}
              onChange={handleChangePicture}
              className={styles.input}
            />

            <button className={styles.button} onClick={updateUserData}>
              Save
            </button>
            {success && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="30px"
                viewBox="0 -960 960 960"
                width="30px"
                fill="green"
              >
                <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
              </svg>
            )}
          </>
        )}
      </div>
    );
  }
  if (getRole() === "mentor") {
    return (
      <div className={styles.personalData}>
        <SpinnerSvg spinner={isLoading} width={50} />
        {error && <p className={styles.error}>Error: {error}</p>}
        {!isLoading && !error && userData && (
          <>
            <label className={styles.label} htmlFor="name">
              Name
            </label>
            <input
              type="text"
              value={userData?.name || ""}
              name="name"
              id="name"
              onChange={handleChange}
              className={styles.input}
            />

            <label className={styles.label} htmlFor="description">
              Description
            </label>
            <textarea
              value={userData?.description || ""}
              name="description"
              id="description"
              onChange={handleChange}
              className={styles.input}
              rows={8}
            ></textarea>

            <label className={styles.label} htmlFor="email">
              Email
            </label>
            <input
              type="text"
              value={userData?.email || ""}
              name="email"
              id="email"
              onChange={handleChange}
              className={styles.input}
            />
            <label className={styles.label} htmlFor="skills">
              Skills
            </label>
            {[...Array(3)].map((skill, index) => (
              <input
                key={index}
                type="text"
                value={userData?.skills?.[index] || ""}
                name={`skills[${index}]`}
                id={`skills${index}`}
                onChange={(e) => {
                  const newSkills = [...userData.skills];
                  newSkills[index] = e.target.value;
                  setUserData({ ...userData, skills: newSkills });
                }}
                className={styles.input}
              />
            ))}
            <label className={styles.label} htmlFor="phone">
              Phone
            </label>
            <input
              type="text"
              value={userData?.phone || ""}
              name="phone"
              id="phone"
              onChange={handleChange}
              className={styles.input}
            />

            <label className={styles.label} htmlFor="picture">
              Profile Picture
            </label>
            <input
              type="file"
              name="picture"
              id="picture"
              ref={fileInputRef}
              onChange={handleChangePicture}
              className={styles.input}
            />

            <button className={styles.button} onClick={updateUserData}>
              Save
            </button>
            {success && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="30px"
                viewBox="0 -960 960 960"
                width="30px"
                fill="green"
              >
                <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
              </svg>
            )}
          </>
        )}
      </div>
    );
  }
};

export default PersonalData;
