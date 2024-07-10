import { useState } from "react";
import ReactDOM from "react-dom";
import styles from "./addMentorPopUp/addMentorPopUp.module.css";
import PropTypes from "prop-types";
import SpinnerSvg from "./SpinnerSvg";
import useJobsApi from "../api/useJobsApi";

const DeleteComponent = ({ setPortalUse, portalUse, header, id }) => {
  const [fadeOut, setFadeOut] = useState(portalUse);
  const [error, setError] = useState(null);
  const deleteApi = useJobsApi(setError);

  const handleDelete = () => {
    const headers = "multipart/form-data";
    const url = `deleteJob/${id}`;
    const fetchMethod = "delete";
    const data = {};
    deleteApi.mutate({ data, url, headers, fetchMethod });
  };

  return ReactDOM.createPortal(
    <div
      className={`${styles.addMentor} ${fadeOut ? styles.show : styles.hide}`}
    >
      <div className={`${styles.container} `}>
        <h1>{header}</h1>
        <SpinnerSvg width={50} spinner={deleteApi.isPending} />
        {error && <p>{error}</p>}
        <button
          className={styles.createMentor}
          onClick={handleDelete}
          disabled={deleteApi.isPending}
        >
          Yes
        </button>
        <button
          className={styles.createMentor}
          onClick={() => {
            setFadeOut(false);
            setTimeout(() => {
              setPortalUse(!portalUse);
            }, 500);
          }}
          disabled={deleteApi.isPending}
        >
          No
        </button>
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

DeleteComponent.propTypes = {
  setPortalUse: PropTypes.func.isRequired,
  portalUse: PropTypes.bool.isRequired,
  header: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default DeleteComponent;
