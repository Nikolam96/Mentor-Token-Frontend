import PropTypes from "prop-types";
import styles from "./startupMentors/startupMentors.module.css";
import StarRating from "./startRating/StarRating";
import { NavLink } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import { Rating } from "react-simple-star-rating";
import { useEffect, useState } from "react";
import axios from "axios";
import { getId } from "../config/StorageFunctions";

const MentorsDataComponent = ({ mentor }) => {
  const { name, picture, skills, _id, description, email } = mentor;

  const { ref: myRef, inView: visible } = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });

  const newDescription = description?.substring(0, 45);

  const [rating, setRating] = useState(0);
  const [total, setTotal] = useState(0);

  const mentorRate = async () => {
    const response = await axios.post(
      "http://localhost:10000/api/v1/rateMentor",
      {
        mentorId: _id,
      }
    );
    setRating(response?.data?.avg);
    setTotal(response?.data?.total);
  };

  const setMentorRate = async (rate) => {
    const response = await axios.patch(
      "http://localhost:10000/api/v1/rateMentor",
      {
        mentorId: _id,
        companyId: getId(),
        rating: rate,
      }
    );

    setRating(response?.data?.avg);
    setTotal(response?.data?.total);
  };

  useEffect(() => {
    mentorRate();
  }, []);

  const handleRating = (rate) => {
    setMentorRate(rate);
  };

  return (
    <div
      className={`${styles.mentorsData} ${visible && styles.show}`}
      ref={myRef}
    >
      <div className={styles.card}>
        <img src="../../public/id1.png" alt={name} />
        <div>
          <h2>{name}</h2>
          <Rating
            size={25}
            fillColor="#696cff"
            onClick={handleRating}
            initialValue={rating}
            emptyColor="rgba(105 108 255 / 0.2)"
          />
          <span className={styles.ratingSpan}>
            {total} average based on KPI success rate.
          </span>

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
