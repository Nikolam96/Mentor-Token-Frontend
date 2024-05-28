import { Link } from "react-router-dom";
import { FaTwitter, FaLinkedin, FaFacebook } from "react-icons/fa";
import styles from "./footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.mentor_section}>
            <h2 className={styles.logo}>
              <img src="../../../public/Vector.png" alt="" />
              Mentor Token
            </h2>
            <p>
              With Mentor Token, every failure transforms into an opportunity
              for growth
            </p>
          </div>
          <div className={styles.links}>
            <h3>Pages</h3>
            <ul>
              <a href="#">Home</a>
              <Link to="/contact">Contact US</Link>
            </ul>
          </div>
          <div className={styles.contact}>
            <h3>Contact</h3>
            <p>info@mentortoken.com</p>
            <p>+(389) 123 456 789</p>
          </div>
          <div className={styles.icons}>
            <h3>Follow Us</h3>
            <div className={styles.icon_container}>
              {/* /////////////////////////////////////////////////////////////////////////////////////// */}
              {/* SET LINKS */}
              {/* /////////////////////////////////////////////////////////////////////////////////////// */}
              <a href="#">
                <FaLinkedin className={styles.icon} />
              </a>
              <a href="#">
                <FaTwitter className={styles.icon} />
              </a>
              <a href="#">
                <FaFacebook className={styles.icon} />
              </a>
            </div>
          </div>
        </div>
        <p className={styles.special_p}>
          ©{new Date().getFullYear()} Mentor Token. All right reserved.
        </p>
      </div>
    </footer>
  );
};
export default Footer;
