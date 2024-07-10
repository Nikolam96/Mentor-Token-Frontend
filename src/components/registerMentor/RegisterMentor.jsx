import { useState, useRef } from "react";
import styles from "./register.module.css";
import { useLocation } from "react-router-dom";
import SpinnerSvg from "../SpinnerSvg";
import PostApi from "../../api/PostApi";

const Register = () => {
  const location = useLocation();
  const form = location.state?.user;

  const [user, setUser] = useState({
    ...form,
    name: "",
    phone: "",
    picture: null,
  });
  console.log(form);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const [error, setError] = useState(null);
  const [spinner, setSpinner] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [profilePhoto, setProfilePhoto] = useState(null);

  const photoRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.type.startsWith("image/")) {
        setUser({ ...user, picture: file });
        setProfilePhoto(URL.createObjectURL(file));
      } else {
        setError("Please select a valid image file.");
      }
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    apiCall();
  };
  const headers = "multipart/form-data";

  let url = "signup";
  let navigateUrl = "/";

  const apiCall = PostApi({
    user,
    setSpinner,
    setError,
    url,
    navigateUrl,
    headers,
  });

  const handleCheckboxChange = (e) => {
    setIsButtonDisabled(!e.target.checked);
  };

  return (
    <div className={styles.register}>
      <div className={styles.wrapper}>
        <img src="/Vector.png" alt="" />
        <h2>Setup Startup Account </h2>
      </div>
      <div className={styles.d_flex}>
        {profilePhoto ? (
          <img src={profilePhoto} alt="" className={styles.briefcase} />
        ) : (
          <img src="/avater_picture.png" className={styles.briefcase} alt="" />
        )}
        <input
          ref={photoRef}
          type="file"
          name="picture"
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
        <img
          src="/Add_image_photo.png"
          className={styles.photo}
          alt=""
          onClick={() => photoRef.current.click()}
        />
      </div>
      {error && <p className={styles.red}>{error}</p>}
      <SpinnerSvg spinner={spinner} width={30} />
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.input_container}>
          <label htmlFor="name" className={styles.label}>
            Name & Surname
          </label>
          <input
            type="text"
            name="name"
            value={user.mentorName}
            onChange={(e) => {
              handleChange(e);
              setError("");
            }}
            id="name"
            placeholder="Name & Surname"
            required={true}
            autoComplete="off"
          />
        </div>
        <div>
          <label htmlFor="phone" className={styles.label}>
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={user.phone}
            onChange={(e) => {
              handleChange(e);
              setError("");
            }}
            placeholder="+381 64 409 0111"
            pattern="\+[0-9]{3} [0-9]{2} [0-9]{3} [0-9]{3,4}"
            required
          />
        </div>
        <div>
          <input
            type="submit"
            value="Register"
            disabled={isButtonDisabled}
            className={isButtonDisabled ? styles.low_opacity : ""}
          />
        </div>

        <p>
          <input
            type="checkbox"
            name="terms"
            className="checkbox"
            onChange={handleCheckboxChange}
          />
          By signing up to create an account I accept Company’s
          <span className={styles.violet}> Terms of use & Privacy Policy.</span>
        </p>
      </form>
    </div>
  );
};

export default Register;
