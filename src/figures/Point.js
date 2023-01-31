import { useSelector } from "react-redux";

var nextName = "A";
export const getNextName = () => {
  const result = nextName;
  if (nextName.at(-1) !== "Z") {
    nextName =
      nextName.slice(0, -1) +
      String.fromCharCode(nextName.at(-1).charCodeAt(0) + 1);
  } else {
    nextName = nextName.slice(0, -1) + "AA";
  }
  return result;
};

function Point(props) {
  const figures = useSelector((state) => state.figures.value);
  const point = figures.find((f) => f.id === props.id);

  const pointSize = 6;
  const paddingSize = 4;
  const pointStyle = {
    backgroundColor: "black",
    width: `${pointSize}px`,
    height: `${pointSize}px`,
    borderRadius: "50%",
    position: "absolute",
    left: paddingSize,
    top: paddingSize,
  };
  const paddingStyle = {
    width: `${pointSize + paddingSize * 2}px`,
    height: `${pointSize + paddingSize * 2}px`,
    position: "absolute",
    left: point.def.x - pointSize / 2 - paddingSize,
    top: point.def.y - pointSize / 2 - paddingSize,
  };

  return (
    <div style={paddingStyle} className="point figure-wrapper" {...props}>
      <div style={pointStyle}></div>
    </div>
  );
}

export default Point;
