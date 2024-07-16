import { useEffect, useState } from "react";
import styles from "./startupInput.module.css";
import axios from "axios";

const StartupInput = ({ placeholder, img, name, role }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const fetchData = async () => {
    const response = await axios.get(
      `http://localhost:10000/api/v1/searchMentors?q=${query}`
    );
    setResults(response?.data);
    console.log(response.data);
  };

  useEffect(() => {
    if (query.length >= 1) {
      fetchData();
    }
    if (query.length === 0) {
      setResults([]);
    }
  }, [query]);

  return (
    <>
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
      <div
        className={`${styles.searchContainer} ${
          query.length >= 1 ? styles.active : ""
        }`}
      >
        {results.length > 0 &&
          results.map((mentor) => (
            <a
              key={mentor._id}
              href={`/startup/mentors/${mentor._id}`}
              className={styles.resultItem}
            >
              {mentor.name}
            </a>
          ))}
      </div>
    </>
  );
};

export default StartupInput;
