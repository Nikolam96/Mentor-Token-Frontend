import styles from "./jobComponent.module.css";
import PropTypes, { arrayOf } from "prop-types";
import ViewMentor from "../viewMentor/ViewMentor";
import { useState } from "react";
import { useInView } from "react-intersection-observer";

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

  const { ref: myRef, inView: visible } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });
  return (
    <div
      className={`${styles.jobComponent} ${visible && styles.show}`}
      ref={myRef}
    >
      <div className={styles.cardHeader}>
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
