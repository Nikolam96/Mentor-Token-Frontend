const Button = () => {
  return (
    <button
      className={`${styles.btn} ${form.role === "startUp" && styles.active}`}
      onClick={() => {
        setForm({ ...form, role: "startUp" });
      }}
    >
      Startup
    </button>
  );
};
export default Button;
