import styles from "./section3.module.css";
import Box from "../box/Box";

const Section3 = () => {
  return (
    <div className={styles.section3}>
      <div className={styles.wrapper}>
        <div className={styles.rocket}>
          <img src="../../../../../Rocket.png" alt="Rocket" />
        </div>
        <p className={styles.features}>FEATURES</p>
        <h2 className={styles.big_header}>
          Boost Your Startup's Journey: Discover Mentor Token's Robust Features
        </h2>
        <div className={`${styles.row} `}>
          <Box
            image={"../../../../../Small_rocket.png"}
            header={"Goal Setting"}
            text={"Set clear and achievable goals for your startup's success."}
          />
          <Box
            image={"../../../../../clarity_analytics-line.png"}
            header={"Performance Tracking"}
            text={"Monitor mentor performance in real-time and track progress."}
          />
          <Box
            image={"../../../../../fluent_reward-20-regular.png"}
            header={"Reward System"}
            text={
              "Motivate mentors with a secure and rewarding token-based reward system."
            }
          />
          <Box
            image={"../../../../../fluent_library-20-regular.png"}
            header={"Knowledge Library"}
            text={
              "Access a comprehensive knowledge library to equip mentors with the skills, and motivation."
            }
          />
        </div>
      </div>
    </div>
  );
};
export default Section3;
