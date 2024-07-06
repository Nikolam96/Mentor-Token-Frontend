import TopMentorElement from "../TopMentorElement";
import PropTypes from "prop-types";
import styles from "./topMentorSection.module.css";
import { useState } from "react";

const TopMentorSection = ({ data }) => {
  const [click, setClick] = useState(false);

  return (
    <div className={styles.topMentorSection}>
      {data.map((person, index) => {
        const { picture, name, achievedJobs } = person;

        return (
          <TopMentorElement
            key={index}
            picture={picture}
            name={name}
            achievedJobs={achievedJobs}
            index={index}
            click={click}
            setClick={setClick}
          />
        );
      })}
    </div>
  );
};
export default TopMentorSection;

TopMentorSection.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
};
