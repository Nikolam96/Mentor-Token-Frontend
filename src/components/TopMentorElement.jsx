import { useState } from "react";
import styles from "./topMentorsSection/topMentorSection.module.css";
import PropTypes from "prop-types";

const TopMentorElement = ({
  picture,
  name,
  achievedJobs,
  index,
  click,
  setClick,
}) => {
  const [hover, setHover] = useState(false);

  return (
    <div
      className={`${styles.topMentorElement} ${
        index === 0 && styles.favorite
      } ${hover && styles.hover} ${click === index && styles.active}`}
      onMouseEnter={() => {
        setHover(true);
      }}
      onMouseLeave={() => {
        setHover(false);
      }}
      onClick={() => setClick(index)}
    >
      <div className={styles.card}>
        <img src="../../public/id4.png" alt={name} />
        <span>{name}</span>
      </div>
      <div>
        <div className={styles.achievedJobs}>{achievedJobs}</div>
        <div> Achieved Jobs</div>
      </div>
    </div>
  );
};
export default TopMentorElement;

TopMentorElement.propTypes = {
  picture: PropTypes.string,
  name: PropTypes.string,
  achievedJobs: PropTypes.number,
  index: PropTypes.number,
};
