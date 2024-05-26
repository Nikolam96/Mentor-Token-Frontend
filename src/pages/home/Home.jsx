import { Section1, Section2, Section3, Section4 } from "./main";
import styles from "./home.module.css";

const Home = () => {
  return (
    <div className={styles.home}>
      <Section1 />
      <Section2 />
      <Section3 />
      <div className={styles.h1_wrapper}>
        <h1 className={styles.h1_success}>
          Every <span>success</span> is rewarded!
        </h1>
      </div>
      <Section4 />
    </div>
  );
};
export default Home;
