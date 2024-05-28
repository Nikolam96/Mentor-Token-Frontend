import { useState } from "react";
import styles from "./contact.module.css";

const Contact = () => {
  const [input, setInput] = useState({
    email: "",
    fullName: "",
    message: "",
  });

  return (
    <div className={styles.contact}>
      <div className={styles.wrapper}>
        <h1>Let’s Talk!</h1>
        <p>
          We’re thrilled to connect with you! Whether you have a question, need
          assistance, or want to discuss a potential project, we’re here to
          listen and help. At Mentor Token, we believe in the power of
          collaboration and are committed to providing you with the best support
          and solutions. Fill out the form below, and one of our team members
          will get back to you as soon as possible.
        </p>
        <p className={styles.special}>
          Let’s create something amazing together!
        </p>
      </div>
      {/* /////////////////////////////////////////////////////////////////// */}
      {/* set /route */}
      {/* /////////////////////////////////////////////////////////////////// */}
      <form action="#" className={styles.form}>
        <input
          type="email"
          name="email"
          placeholder="Email address"
          value={input.email}
          onChange={(e) => {
            setInput({ ...input, email: e.target.value });
          }}
        />
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={input.fullName}
          onChange={(e) => {
            setInput({ ...input, fullName: e.target.value });
          }}
        />
        <textarea
          name="message"
          value={input.message}
          placeholder="Your message"
          rows={10}
          className={styles.textarea}
          onChange={(e) => {
            setInput({ ...input, message: e.target.value });
          }}
        ></textarea>

        <input type="submit" value="Send Message" />
      </form>
    </div>
  );
};
export default Contact;
