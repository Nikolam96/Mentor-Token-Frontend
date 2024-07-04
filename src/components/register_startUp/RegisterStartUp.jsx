import { useRef, useState } from "react";
import styles from "./register.module.css";
import { useLocation } from "react-router-dom";
import Spinner from "../SpinnerSvg";
import PostApi from "../../api/PostApi";

const Register = () => {
  const location = useLocation();
  const form = location.state?.user;

  const [user, setUser] = useState({
    ...form,
    startUpName: "",
    name: "",
    businessAddress: "",
    inviteMentors: "",
    selectedPhoto: null,
  });

  console.log(user);
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const [error, setError] = useState(null);
  const [spinner, setSpinner] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

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

  let headers = "multipart/form-data";

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
        <img src="../../../Vector.png" alt="" />
        <h2>Setup Startup Account </h2>
      </div>
      <div className={styles.d_flex}>
        {profilePhoto ? (
          <img src={profilePhoto} alt="" className={styles.briefcase} />
        ) : (
          <img
            src="../../../public/Add_image_briefcase.png"
            className={styles.briefcase}
            alt=""
          />
        )}

        <input
          ref={photoRef}
          type="file"
          name="picture"
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
        <img
          src="../../../public/Add_image_photo.png"
          className={styles.photo}
          alt=""
          onClick={() => photoRef.current.click()}
        />
      </div>
      {error && <p className={styles.red}>{error}</p>}
      <Spinner spinner={spinner} />
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.input_container}>
          <label htmlFor="name" className={styles.label}>
            Startup Name
          </label>
          <input
            type="text"
            name="startUpName"
            value={user.startUpName}
            onChange={(e) => {
              handleChange(e);
              setError("");
            }}
            id="name"
            placeholder="My Startup Name"
            autoComplete="off"
            required={true}
          />
        </div>
        <div>
          <label htmlFor="legal">
            Legal Representative<span>*</span>
          </label>
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleChange}
            id="legal"
            placeholder="Name and surname"
            autoComplete="off"
            required={true}
          />
        </div>
        <div>
          <label htmlFor="address">
            Registered Business Address<span>*</span>
          </label>
          <input
            type="text"
            name="businessAddress"
            value={user.businessAddress}
            onChange={handleChange}
            id="address"
            placeholder="Registered Business Address"
            autoComplete="off"
            required={true}
          />
        </div>
        <div>
          <label htmlFor="mentor">Invite Mentors via email</label>
          <input
            type="email"
            name="inviteMentors"
            value={user.inviteMentors}
            onChange={handleChange}
            id="mentor"
            placeholder="Enter email address to invite mentor"
            autoComplete="off"
          />
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
