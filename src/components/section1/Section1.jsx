import styles from "./section1.module.css";
import "../../App.css";

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
            <a href="/login" className={`${styles.btn}`} data-type="gap">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#fff"
              >
                <path d="m560-240-56-58 142-142H160v-80h486L504-662l56-58 240 240-240 240Z" />
              </svg>
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
