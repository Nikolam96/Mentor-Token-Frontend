import Team from "../../components/team/Team";
import styles from "./about.module.css";
import data from "../../components/team/data";

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
            <a href="/login" className={`${styles.btn}`} data-type="gap">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                className="btn"
              >
                <path d="m560-240-56-58 142-142H160v-80h486L504-662l56-58 240 240-240 240Z" />
              </svg>
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
