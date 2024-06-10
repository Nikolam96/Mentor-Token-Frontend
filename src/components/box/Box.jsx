import styles from "./box.module.css";
import { useState } from "react";
import { useInView } from "react-intersection-observer";

const Box = ({ image, header, text }) => {
  const [isHovered, setIsHovered] = useState(false);

  const { ref: myRef, inView: visible } = useInView({
    threshold: 0.4,
  });

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  return (
    <div
      className={
        isHovered
          ? ` ${styles.box}  ${styles.hover}`
          : `${styles.active} ${styles.box} ${visible && styles.show}`
      }
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      ref={myRef}
    >
      <img src={image} alt="" />
      <h3>{header}</h3>
      <p>{text}</p>
    </div>
  );
};
export default Box;
