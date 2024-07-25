import styles from "./jobComponent.module.css";
import PropTypes, { arrayOf } from "prop-types";
import ViewMentor from "../viewMentor/ViewMentor";
import { useState } from "react";
import { useInView } from "react-intersection-observer";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import api from "../../config/properties";
import { getRole } from "../../config/StorageFunctions";

const JobComponent = ({
  companyId,
  jobPicture,
  title,
  description,
  id,
  mentors,
  createdAt,
}) => {
  const [portal, setPortal] = useState(false);
  const newDesc = description.substring(0, 100);

  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["Application", id],
    queryFn: async () => {
      const response = await axios.get(`${api.url_base}/getCustomApp/${id}`);
      return response?.data;
    },
  });

  const { ref: myRef, inView: visible } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });
  return (
    <div
      className={`${styles.jobComponent} ${visible && styles.show} ${
        !isLoading &&
        data.fondedApplication &&
        getRole() === "startup" &&
        styles.foundApplication
      }`}
      ref={myRef}
    >
      <div className={styles.cardHeader}>
        {!isLoading && data?.fondedApplication && getRole() === "startup" && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#696cff"
          >
            <path d="M80-560q0-100 44.5-183.5T244-882l47 64q-60 44-95.5 111T160-560H80Zm720 0q0-80-35.5-147T669-818l47-64q75 55 119.5 138.5T880-560h-80ZM160-200v-80h80v-280q0-83 50-147.5T420-792v-28q0-25 17.5-42.5T480-880q25 0 42.5 17.5T540-820v28q80 20 130 84.5T720-560v280h80v80H160Zm320-300Zm0 420q-33 0-56.5-23.5T400-160h160q0 33-23.5 56.5T480-80ZM320-280h320v-280q0-66-47-113t-113-47q-66 0-113 47t-47 113v280Z" />
          </svg>
        )}
        <div>
          <img
            src={
              jobPicture !== "default.img"
                ? `http://127.0.0.1:10000/images/${jobPicture}`
                : "../../../public/JobsRandomPicture.jpg"
            }
            alt={title}
          />
        </div>
        <h2>{companyId.startUpName}</h2>
      </div>
      <div className={styles.cardBody}>
        <h2>{title}</h2>
        <p>{newDesc}...</p>
        {getRole() === "startup" && (
          <div className={styles.ApplicationStyle}>
            {data?.limitedApplications &&
              !isLoading &&
              !isError &&
              getRole() === "startup" &&
              data?.limitedApplications.map((image) => (
                <img
                  src={`http://127.0.0.1:10000/images/${image?.mentorId?.picture}`}
                  alt={image?.mentorId?.name}
                  key={image._id}
                />
              ))}
            <p>+ {data?.fondedApplication.length || 0} Applicants</p>
          </div>
        )}
      </div>
      <button onClick={() => setPortal(!portal)} className={styles.flexEnd}>
        View more
      </button>
      {portal && (
        <ViewMentor
          portalUse={portal}
          setPortalUse={setPortal}
          name={companyId.startUpName}
          title={title}
          description={description}
          jobPicture={jobPicture}
          id={id}
          mentors={mentors}
          createdAt={createdAt}
          companyId={companyId}
          isLoading={isLoading}
          data={data}
        />
      )}
    </div>
  );
};
export default JobComponent;

JobComponent.propTypes = {
  name: PropTypes.string,
  jobPicture: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  skillsRequired: arrayOf(PropTypes.string),
  mentors: PropTypes.bool,
};
