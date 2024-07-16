import { useState } from "react";
import PropTypes from "prop-types";
import styles from "./starRating.module.css";

const StarRating = ({ totalStars = 5 }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  return (
    <div className={styles.starRating}>
      {[...Array(totalStars)].map((star, index) => {
        index += 1;
        return (
          <button
            type="button"
            key={index}
            className={index <= (hover || rating) ? styles.on : styles.off}
            onClick={() => setRating(index)}
            onMouseEnter={() => setHover(index)}
            onMouseLeave={() => setHover(rating)}
          >
            <span className={styles.star}>&#9733;</span>
          </button>
        );
      })}
    </div>
  );
};

StarRating.propTypes = {
  totalStars: PropTypes.number,
};

export default StarRating;
