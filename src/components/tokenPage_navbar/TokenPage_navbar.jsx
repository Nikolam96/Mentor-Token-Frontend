import { useState } from "react";
import styles from "./tokenPage_navbar.module.css";
import TokenPage_navbar_button from "../TokenPage_navbar_button";
import PropTypes from "prop-types";

const TokenPage_navbar = ({ items }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <div className={styles.navigation}>
      <div className={styles.icon} onClick={handleOpen}>
        <img src="../../../Vector.png" alt="Vector" className={styles.img} />
        <h3>Mentor Token</h3>
      </div>
      <div className={`${styles.navContainer} ${open && styles.open}`}>
        {items.map((item, index) => (
          <TokenPage_navbar_button
            key={index}
            text={item.text}
            to={item.to}
            img={item.img}
          />
        ))}
      </div>
    </div>
  );
};

export default TokenPage_navbar;

TokenPage_navbar.propTypes = {
  items: PropTypes.array.isRequired,
};
