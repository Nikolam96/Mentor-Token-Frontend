import styles from "./appliedMentor.module.css";
import moment from "moment";
import { useInView } from "react-intersection-observer";
import useJobsApi from "../../api/useJobsApi";
import { useState } from "react";
import SpinnerSvg from "../SpinnerSvg";

const AppliedMentor = ({ mentorId, createdAt }) => {
  const [error, setError] = useState(null);
  const { name, picture, _id } = mentorId;

  const formattedDate = moment(createdAt).format("Do MMMM YYYY");
  const { ref: myRef, inView: visible } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  const updateApplicationApi = useJobsApi(setError);

  const applicationAccept = (event) => {
    event.stopPropagation();
    const headers = "application/json";
    const url = `updateApplication/${_id}`;
    const fetchMethod = "patch";
    const data = { status: "accepted", acceptedStatus: "in progress" };
    updateApplicationApi.mutate({ data, url, headers, fetchMethod });
  };

  const applicationReject = (event) => {
    event.stopPropagation();
    const headers = "application/json";
    const url = `updateApplication/${_id}`;
    const fetchMethod = "patch";
    const data = { status: "rejected", acceptedStatus: "rejected" };
    updateApplicationApi.mutate({ data, url, headers, fetchMethod });
  };

  if (error) {
    return (
      <h2
        className={`${styles.appliedMentor} ${styles.mentorError} ${
          visible && styles.show
        }`}
        ref={myRef}
      >
        {error}
      </h2>
    );
  }

  if (updateApplicationApi.isPending) {
    return (
      <div
        className={`${styles.appliedMentor} ${visible && styles.show}`}
        ref={myRef}
      >
        <SpinnerSvg width={30} spinner={true} />
      </div>
    );
  }

  return (
    <div
      className={`${styles.appliedMentor} ${visible && styles.show}`}
      ref={myRef}
      onClick={() => {
        window.open(`/startup/mentors/${_id}`, "_blank");
      }}
    >
      <img src={`http://127.0.0.1:10000/images/${picture}`} alt={name} />
      <div className={styles.bodyContainer}>
        <h2>{name}</h2>
        <p>Applied at: {formattedDate}</p>
      </div>
      <div className={styles.btnContainer}>
        <button
          className={styles.assign}
          onClick={applicationAccept}
          disabled={updateApplicationApi.isPending}
        >
          Assign
        </button>
        <button
          className={styles.reject}
          onClick={applicationReject}
          disabled={updateApplicationApi.isPending}
        >
          Reject
        </button>
      </div>
    </div>
  );
};

export default AppliedMentor;
