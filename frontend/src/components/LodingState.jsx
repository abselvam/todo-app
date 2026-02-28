import "../index.css";

const LoadingState = ({ size = 12, color = "#4f46e5" }) => {
  return (
    <div className="three-dot-loader">
      <span
        style={{ width: size, height: size, backgroundColor: color }}
      ></span>
      <span
        style={{ width: size, height: size, backgroundColor: color }}
      ></span>
      <span
        style={{ width: size, height: size, backgroundColor: color }}
      ></span>
    </div>
  );
};

export default LoadingState;
