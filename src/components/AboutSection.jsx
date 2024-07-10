import styles from "./startupMentorId/startupMentorId.module.css";
import AddMentorPopUp from "./addMentorPopUp/AddMentorPopUp";
import { useState } from "react";

const AboutSection = ({
  name,
  picture,
  email,
  password,
  skills,
  description,
  phone,
  mentor,
}) => {
  const [portalUse, setPortalUse] = useState(false);

  return (
    <div className={styles.aboutSection}>
      <h2>About Mentor</h2>
      <ul>
        <h4>Skills:</h4>
        {skills.map((skill, index) => {
          return <li key={index}>{skill}</li>;
        })}
      </ul>
      <p>{description}</p>
      {mentor && (
        <button
          onClick={() => {
            setPortalUse(!portalUse);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
          >
            <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
          </svg>
          Offer New Job
        </button>
      )}
      {portalUse && (
        <AddMentorPopUp
          setPortalUse={setPortalUse}
          portalUse={portalUse}
          header={"Offer Job"}
          subHeader={"Create and offer job to a mentor"}
          add={"job"}
        />
      )}
    </div>
  );
};
export default AboutSection;
