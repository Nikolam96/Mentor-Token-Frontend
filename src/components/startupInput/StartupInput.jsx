import { useEffect, useMemo, useState } from "react";
import styles from "./startupInput.module.css";
import axios from "axios";
import { getRole } from "../../config/StorageFunctions";

const StartupInput = ({ placeholder, img, name, role }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const fetchData = async (term) => {
    const response = await axios.get(
      `http://localhost:10000/api/v1/searchMentors?q=${term}`
    );
    setResults(response?.data);
  };

  const searchMentor = () => {
    let timeoutId;
    return (e) => {
      let searchedTerm = e.target.value;
      if (searchedTerm == "") {
        setQuery(searchedTerm);
        return;
      }
      setQuery(searchedTerm);
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        fetchData(searchedTerm);
      }, 500);
    };
  };

  const debounce = useMemo(() => searchMentor(), []);

  return (
    <>
      <div className={styles.inputContainer}>
        <div className={styles.inputWrapper}>
          <input
            className={styles.input}
            type="text"
            placeholder={placeholder}
            value={query}
            onChange={debounce}
          />
        </div>

        <a
          href={
            getRole() == "startup"
              ? "/startup/personalData"
              : "/mentor/personalData"
          }
        >
          <div className={styles.smallProfile}>
            <img
              src={img || "../../../public/avater_picture.png"}
              alt="avatar"
            />

            <div>
              <p>{name || "user"}</p>
              <p className={styles.role}>{role || "role"}</p>
            </div>
          </div>
        </a>
      </div>
      {results.length > 0 && (
        <div
          className={`${styles.searchContainer} ${
            query.length >= 1 ? styles.active : ""
          }`}
        >
          {results.length > 0 &&
            results.map((mentor) => (
              <a
                key={mentor._id}
                href={
                  getRole() == "startup"
                    ? `/startup/mentors/${mentor._id}`
                    : `/mentor/mentors/${mentor._id}`
                }
                className={styles.resultItem}
              >
                {mentor.name}
              </a>
            ))}
        </div>
      )}
    </>
  );
};

export default StartupInput;
