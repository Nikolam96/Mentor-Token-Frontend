const SpinnerSvg = ({ spinner }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid"
      width="30"
      height="30"
      style={{
        shapeRendering: "auto",
        display: `${!spinner ? "none" : "block"}`,
        background: "rgb(255, 255, 255)",
      }}
    >
      <g>
        <circle
          strokeDasharray="164.93361431346415 56.97787143782138"
          r="35"
          strokeWidth="10"
          stroke="#696cff"
          fill="none"
          cy="50"
          cx="50"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            keyTimes="0;1"
            values="0 50 50;360 50 50"
            dur="1s"
            repeatCount="indefinite"
          />
        </circle>
      </g>
    </svg>
  );
};
export default SpinnerSvg;
