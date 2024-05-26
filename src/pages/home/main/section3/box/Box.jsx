import style from "./box.module.css";

const Box = ({ image, header, text }) => {
  return (
    <div className={style.box}>
      <img src={image} alt="" />
      <h3>{header}</h3>
      <p>{text}</p>
    </div>
  );
};
export default Box;
