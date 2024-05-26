import styles from "./section2.module.css";

const Section2 = () => {
  return (
    <div className={styles.section2}>
      <div className={styles.row}>
        <div className={`${styles.col} ${styles.col1}`}>
          <img src="../../../../../Adobe.png" alt="Adobe" />
        </div>
        <div className={`${styles.col} ${styles.col2}`}>
          <img src="../../../../../braze.png" alt="Braze" />
        </div>
        <div className={`${styles.col} ${styles.col3}`}>
          <img src="../../../../../Hellosign.png" alt="Hellosign" />
        </div>
        <div className={`${styles.col} ${styles.col4}`}>
          <img src="../../../../../maze.png" alt="Maze" />
        </div>
        <div className={`${styles.col} ${styles.col5}`}>
          <img src="../../../../../ghost.png" alt="Ghost" />
        </div>
        <div className={`${styles.col} ${styles.col6}`}>
          <img src="../../../../../Atlassian.png" alt="Atlassian" />
        </div>
        <div className={`${styles.col} ${styles.col7}`}>
          <img src="../../../../../TreeHouse.png" alt="TreeHouse" />
        </div>
        <div className={`${styles.col} ${styles.col8}`}>
          <img src="../../../../../intercom.png" alt="Intercom" />
        </div>
        <div className={`${styles.col} ${styles.col9}`}>
          <img src="../../../../../Opendoor.png" alt="OpenDoor" />
        </div>
        <div className={`${styles.col} ${styles.col10}`}>
          <img src="../../../../../HubSpot.png" alt="HubSpot" />
        </div>
      </div>
      <p className={styles.small_header}>
        More than 25+ Startups around the <br />
        world trusted Mentor Token.
      </p>
    </div>
  );
};
export default Section2;
