import styles from "./section1.module.css";
import "../../App.css";
import ButtonSvg from "../ButtonSvg";

const Section1 = () => {
  return (
    <section className={styles.section}>
      <div className={styles.section1}>
        <div className={`${styles.w_max}`}>
          <h1>Grow your StartUp! Monitoring and Evaluating now is easy!</h1>
          <p>
            Welcome to Mentor Token, where we redefine the dynamics of start-up
            success. Our innovative platform offers a transformative approach to
            mentorship, ensuring that mentors are not just engaged but motivated
            to drive the success of the ventures they support.
          </p>
          <div className={styles.btn_align}>
            <a href="/register" className={`${styles.btn}`} data-type="gap">
              <ButtonSvg width={24} fill={"#fff"} />
              Get Started
            </a>
            <a
              href="/contact"
              className={`${styles.btn} ${styles.btn_modifier}`}
            >
              Get in Touch
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Section1;
