import { useSelector } from "react-redux";

import { FIG_TYPE } from "../Figure";
import getPointPos from "./getPointPos";

function Point(props) {
  const figures = useSelector((state) => state.figures.value);
  const pos = getPointPos(figures, props.id);

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
    left: pos.x - pointSize / 2 - paddingSize,
    top: pos.y - pointSize / 2 - paddingSize,
  };

  return (
    <div
      style={paddingStyle}
      className={`${FIG_TYPE.point} figure-wrapper`}
      {...props}
    >
      <div style={pointStyle}></div>
    </div>
  );
}

export default Point;
