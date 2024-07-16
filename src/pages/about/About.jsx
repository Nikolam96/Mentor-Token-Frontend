import Team from "../../components/team/Team";
import styles from "./about.module.css";
import data from "../../components/team/data";
import ButtonSvg from "../../components/ButtonSvg";

const About = () => {
  return (
    <div className={styles.about}>
      <div className={styles.team_bg}>
        <div className={styles.wrapper}>
          <h1>Meet our team members</h1>
          <div>
            <p>
              We Focus on the details of everything we do. All to help
              businesses around the world Focus on what's most important to
              them.
            </p>
            <a href="/register" className={`${styles.btn}`} data-type="gap">
              <ButtonSvg width={24} />
              Get Started
            </a>
          </div>
        </div>
      </div>

      <div className={styles.wrapper}>
        <div className={styles.row}>
          {data.map((person) => (
            <Team key={person.id} {...person} />
          ))}
        </div>
      </div>
    </div>
  );
};
export default About;
