import PropTypes from "prop-types";
import styles from "./startupMentors/startupMentors.module.css";
import StarRating from "./startRating/StarRating";

const MentorsDataComponent = ({ mentor }) => {
  const { name, picture, skills, id, desc, email } = mentor;
  const newDesc = desc?.substring(0, 60);

  return (
    <div className={styles.mentorsData} key={id}>
      <div className={styles.card}>
        <img src="../../public/id1.png" alt={name} />
        <div>
          <h2>{name}</h2>
          <StarRating totalStars={5} />
          <ul>
            <h4>Skills :</h4>
            {skills.map((skill, index) => (
              <li key={index}>{skill} </li>
            ))}
          </ul>
          <span className={styles.span}>{newDesc} ...</span>
        </div>
      </div>
      <a href="#">
        <button className={styles.button}>View Mentor</button>
      </a>
    </div>
  );
};

MentorsDataComponent.propTypes = {
  name: PropTypes.string.isRequired,
  picture: PropTypes.string.isRequired,
  skills: PropTypes.arrayOf(PropTypes.string).isRequired,
  id: PropTypes.number.isRequired,
  email: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
};

export default MentorsDataComponent;
