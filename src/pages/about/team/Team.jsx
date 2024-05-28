import styles from "./team.module.css";
import { FaLinkedin, FaFacebook, FaGithub } from "react-icons/fa";

const Team = ({
  id,
  name,
  position,
  description,
  img,
  alt,
  github,
  linkedin,
  facebook,
}) => {
  return (
    <div className={styles.team} key={id}>
      <img src={img} alt={alt} />
      <div className={styles.container}>
        <h2>{name}</h2>
        <span>{position}</span>
      </div>
      <p>{description}</p>
      <div className={styles.icon_container}>
        <a href={facebook} target="_blank">
          <FaFacebook className={styles.icon} />
        </a>
        <a href={github} target="_blank">
          <FaGithub className={styles.icon} />
        </a>
        <a href={linkedin} target="_blank">
          <FaLinkedin className={styles.icon} />
        </a>
      </div>
    </div>
  );
};
export default Team;
