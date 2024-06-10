import styles from "./section4.module.css";
import { useInView } from "react-intersection-observer";

const Section4 = () => {
  const { ref: myRef, inView: visible } = useInView({
    threshold: 0.5,
    // triggerOnce: true,
  });

  return (
    <div className={`${styles.section4} ${visible && styles.show}`} ref={myRef}>
      <img
        src="../../../../../public/Group 1000002313.png"
        alt="Mentors"
        className={styles.group}
      />
      <img src="../../../../../public/Mentors.png" alt="Mentors" />
    </div>
  );
};
export default Section4;
