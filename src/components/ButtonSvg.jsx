import PropTypes from "prop-types";

const ButtonSvg = ({ width, fill }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24px"
      viewBox="0 -960 960 960"
      width={`${width}px`}
      fill={fill}
    >
      <path d="m560-240-56-58 142-142H160v-80h486L504-662l56-58 240 240-240 240Z" />
    </svg>
  );
};

ButtonSvg.propTypes = {
  width: PropTypes.number,
  fill: PropTypes.string,
};

export default ButtonSvg;
