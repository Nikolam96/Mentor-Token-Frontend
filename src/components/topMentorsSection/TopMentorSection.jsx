import TopMentorElement from "../TopMentorElement";
import PropTypes from "prop-types";
import styles from "./topMentorSection.module.css";
import { useState } from "react";

const TopMentorSection = ({ data, click, setClick, setJobsPage, jobsPage }) => {
  return (
    <div className={styles.topMentorSection}>
      {data.map((person, index) => {
        const { picture, name, count, mentorId } = person;

        return (
          <TopMentorElement
            key={index}
            picture={picture}
            name={name}
            achievedJobs={count}
            _id={mentorId}
            click={click}
            setClick={setClick}
            setJobsPage={setJobsPage}
            jobsPage={jobsPage}
            index={index}
          />
        );
      })}
    </div>
  );
};
export default TopMentorSection;

TopMentorSection.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
};
