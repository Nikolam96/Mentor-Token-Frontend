import { useState, useRef } from "react";
import ReactDOM from "react-dom";
import styles from "./addMentorPopUp.module.css";
import PropTypes from "prop-types";
import SpinnerSvg from "../SpinnerSvg";
import { getId } from "../../config/StorageFunctions";
import useJobsApi from "../../api/useJobsApi";

const AddMentorPopUp = ({
  setPortalUse,
  portalUse,
  header,
  title,
  description,
  subHeader,
  add,
  jobOpen,
  update,
  id,
  role,
}) => {
  const [fadeOut, setFadeOut] = useState(portalUse);
  const [error, setError] = useState(null);
  const [data, setData] = useState({
    email: "",
    name: "",
    surname: "",
    title: title || "",
    description: description || "",
    status: "open",
    picture: null,
  });

  const handleClose = () => {
    setFadeOut(false);
    setTimeout(() => {
      setPortalUse(!portalUse);
    }, 500);
  };

  const updateJobApi = useJobsApi(setError, handleClose);

  const updateJob = () => {
    let headers = "multipart/form-data";
    let url = `updateJob/${id}`;
    let fetchMethod = "patch";

    updateJobApi.mutate({ data, url, headers, fetchMethod });
  };

  const offerJob = () => {
    data.companyId = getId();
    data.applicationType = "companyToMentor";
    data.mentorId = id;
    data.status = "direct";
    let headers = "multipart/form-data";
    let url = `offerJob`;
    let fetchMethod = "post";

    updateJobApi.mutate({ data, url, headers, fetchMethod });
  };

  const createNewJob = () => {
    data.companyId = getId();
    let headers = "multipart/form-data";
    let url = `createJob`;
    let fetchMethod = "post";

    updateJobApi.mutate({ data, url, headers, fetchMethod });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.type.startsWith("image/")) {
        setData({ ...data, picture: file });
      } else {
        setError("Please select a valid image file.");
      }
    }
  };

  const photoRef = useRef(null);

  const handleData = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  if (role === "mentor") {
    return ReactDOM.createPortal();
  }
  return ReactDOM.createPortal(
    <div
      className={`${styles.addMentor} ${fadeOut ? styles.show : styles.hide}`}
    >
      <div className={`${styles.container} `}>
        <h1>{header}</h1>
        <p>{subHeader}</p>
        <SpinnerSvg width={50} spinner={updateJobApi.isPending} />
        {error && <p className={styles.error}>{error}</p>}
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
          <input
            ref={photoRef}
            type="file"
            name="picture"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />

          <label htmlFor="JobName" className={styles.label}>
            Job Name
          </label>
          <input
            type="text"
            id="JobName"
            name="title"
            value={data.title}
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
          <button
            onClick={() => photoRef.current.click()}
            className={styles.createMentor}
          >
            Add Picture
          </button>
          {update ? (
            <button
              className={styles.createMentor}
              onClick={updateJob}
              disabled={updateJobApi.isPending}
            >
              Update Job
            </button>
          ) : (
            <>
              {jobOpen ? (
                <button className={styles.createMentor} onClick={createNewJob}>
                  Create New Job
                </button>
              ) : (
                <button className={styles.createMentor} onClick={offerJob}>
                  Send Job Offer
                </button>
              )}
            </>
          )}
        </div>
        <div>
          <button className={styles.exit} onClick={handleClose}>
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
  jobOpen: PropTypes.bool,
  update: PropTypes.bool,
  id: PropTypes.string,
};
