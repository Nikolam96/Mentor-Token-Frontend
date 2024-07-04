import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import styles from "./tokenPage_navbar/tokenPage_navbar.module.css";

const TokenPage_navbar_button = ({ to, text, img }) => {
  return (
    <div>
      <NavLink
        to={to}
        className={({ isActive }) =>
          isActive
            ? `${styles.active} ${styles.navButton}`
            : `${styles.navButton}`
        }
      >
        {img}
        {text}
      </NavLink>
    </div>
  );
};

TokenPage_navbar_button.propTypes = {
  to: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  img: PropTypes.node.isRequired,
};

export default TokenPage_navbar_button;
