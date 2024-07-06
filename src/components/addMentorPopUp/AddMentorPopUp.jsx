import React, { useState } from "react";
import ReactDOM from "react-dom";
import styles from "./addMentorPopUp.module.css";
import PropTypes from "prop-types";

const AddMentorPopUp = ({
  setPortalUse,
  portalUse,
  header,
  subHeader,
  add,
}) => {
  const [fadeOut, setFadeOut] = useState(portalUse);
  const [data, setData] = useState({
    email: "",
    name: "",
    surname: "",
    jobName: "",
    description: "",
  });

  const handleData = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return ReactDOM.createPortal(
    <div
      className={`${styles.addMentor} ${fadeOut ? styles.show : styles.hide}`}
    >
      <div className={`${styles.container} `}>
        <h1>{header}</h1>
        <p>{subHeader}</p>
        <div className={`${add === "mentor" ? styles.block : styles.none}`}>
          <div className={styles.inputCont}>
            <label htmlFor="email" className={styles.label}>
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={data.email}
              onChange={handleData}
              required={true}
              placeholder="newmentor@mail.com"
              autoComplete="off"
            />
          </div>
          <div className={styles.flexContainer}>
            <div>
              <label htmlFor="name" className={styles.label}>
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={data.name}
                onChange={handleData}
                placeholder="Mira"
                required={true}
                autoComplete="off"
              />
            </div>
            <div>
              <label htmlFor="surname" className={styles.label}>
                Surname
              </label>
              <input
                type="text"
                id="surname"
                value={data.surname}
                onChange={handleData}
                name="surname"
                placeholder="Gedit"
                required={true}
                autoComplete="off"
              />
            </div>
          </div>
          <button className={styles.createMentor}>Create new Mentor</button>
        </div>
        <div className={`${add === "job" ? styles.block : styles.none}`}>
          <label htmlFor="JobName" className={styles.label}>
            Job Name
          </label>
          <input
            type="text"
            id="JobName"
            name="jobName"
            value={data.jobName}
            onChange={handleData}
            placeholder="Write job name"
            required={true}
            autoComplete="off"
          />
          <label htmlFor="description" className={styles.label}>
            Short Description
          </label>
          <textarea
            name="description"
            id="description"
            value={data.description}
            onChange={handleData}
            rows={8}
            placeholder="Write short description about job offering"
          ></textarea>
          <button className={styles.createMentor}>Send Job Offer</button>
        </div>
        <button
          className={styles.exit}
          onClick={() => {
            setFadeOut(false);
            setTimeout(() => {
              setPortalUse(!portalUse);
            }, 500);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="26px"
            viewBox="0 -960 960 960"
            width="26px"
          >
            <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
          </svg>
        </button>
      </div>
    </div>,
    document.body
  );
};

export default AddMentorPopUp;

AddMentorPopUp.propTypes = {
  setPortalUse: PropTypes.func,
  portalUse: PropTypes.bool,
  header: PropTypes.string,
  subHeader: PropTypes.string,
  add: PropTypes.string,
};
