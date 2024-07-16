import PropTypes from "prop-types";
import styles from "./startupMentors/startupMentors.module.css";
import StarRating from "./startRating/StarRating";
import { NavLink } from "react-router-dom";
import { useInView } from "react-intersection-observer";

const MentorsDataComponent = ({ mentor }) => {
  const { name, picture, skills, _id, description, email } = mentor;
  console.log();

  const { ref: myRef, inView: visible } = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });

  const newDescription = description?.substring(0, 45);

  return (
    <div
      className={`${styles.mentorsData} ${visible && styles.show}`}
      ref={myRef}
    >
      <div className={styles.card}>
        <img src="../../public/id1.png" alt={name} />
        <div>
          <h2>{name}</h2>
          {/* <StarRating totalStars={5} /> */}
          <ul>
            <h4>Skills :</h4>
            {skills.map((skill, index) => (
              <li key={index}>{skill} </li>
            ))}
          </ul>
          <span className={styles.span}>{newDescription} ...</span>
        </div>
      </div>
      <NavLink to={`/startup/mentors/${_id}`}>
        <button className={styles.button}>View Mentor</button>
      </NavLink>
    </div>
  );
};

MentorsDataComponent.propTypes = {
  name: PropTypes.string,
  picture: PropTypes.string,
  skills: PropTypes.arrayOf(PropTypes.string),
  id: PropTypes.number,
  email: PropTypes.string,
  description: PropTypes.string,
};

export default MentorsDataComponent;
