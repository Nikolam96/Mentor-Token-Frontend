import { useState } from "react";
import styles from "./contact.module.css";
import { useInView } from "react-intersection-observer";

const Contact = () => {
  const [input, setInput] = useState({
    email: "",
    fullName: "",
    message: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    fullName: "",
    message: "",
  });

  const validateForm = () => {
    let formIsValid = true;
    const newErrors = { ...errors };

    if (!input.email || !/\S+@\S+\.\S+/.test(input.email)) {
      newErrors.email = "Please enter a valid email address";
      formIsValid = false;
    } else {
      newErrors.email = "";
    }

    if (!input.fullName.trim()) {
      newErrors.fullName = "Please enter your full name";
      formIsValid = false;
    } else {
      newErrors.fullName = "";
    }

    if (!input.message.trim()) {
      newErrors.message = "Please enter your message";
      formIsValid = false;
    } else {
      newErrors.message = "";
    }

    setErrors(newErrors);
    return formIsValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted:", input);
    } else {
      console.log("Form validation failed.");
    }
  };

  const { ref: myRef, inView: visible } = useInView({
    threshold: 0.65,
  });

  return (
    <div className={styles.contact}>
      <div className={`${styles.wrapper} `}>
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
      <form
        action="#"
        className={`${visible && styles.show} ${styles.form}`}
        ref={myRef}
        onSubmit={handleSubmit}
      >
        <div>
          <input
            className={errors.email && styles.border_red}
            type="email"
            name="email"
            placeholder="Email address"
            autoComplete="off"
            value={input.email}
            onChange={(e) => {
              setInput({ ...input, email: e.target.value });
              setErrors({ ...errors, email: "" });
            }}
          />
          {errors.email && <p className={styles.error}>{errors.email}</p>}
        </div>
        <div>
          <input
            className={errors.fullName && styles.border_red}
            type="text"
            name="fullName"
            placeholder="Full Name"
            autoComplete="off"
            value={input.fullName}
            onChange={(e) => {
              setInput({ ...input, fullName: e.target.value });
              setErrors({ ...errors, fullName: "" });
            }}
          />
          {errors.fullName && <p className={styles.error}>{errors.fullName}</p>}
        </div>
        <textarea
          name="message"
          value={input.message}
          placeholder="Your message"
          rows={10}
          className={
            errors.message
              ? `${styles.border_red} ${styles.textarea}`
              : styles.textarea
          }
          onChange={(e) => {
            setInput({ ...input, message: e.target.value });
            setErrors({ ...errors, message: "" });
          }}
        ></textarea>
        {errors.message && <p className={styles.error}>{errors.message}</p>}
        <input type="submit" value="Send Message" />
      </form>
    </div>
  );
};
export default Contact;
