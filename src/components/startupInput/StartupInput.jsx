import { useEffect, useState } from "react";
import styles from "./startupInput.module.css";

const StartupInput = ({ placeholder, img, name, role }) => {
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  useEffect(() => {
    console.log(query);
  }, [query]);

  return (
    <div className={styles.inputContainer}>
      <div className={styles.inputWrapper}>
        <input
          className={styles.input}
          type="text"
          placeholder={placeholder}
          onChange={handleChange}
          value={query}
        />
      </div>
      <div className={styles.smallProfile}>
        <img src={img || "../../../public/avater_picture.png"} alt="avatar" />
        <div>
          <p>{name || "user"}</p>
          <p className={styles.role}>{role || "role"}</p>
        </div>
      </div>
    </div>
  );
};

export default StartupInput;
