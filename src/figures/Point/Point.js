import { useSelector } from "react-redux";

import { FIG_TYPE } from "../Figure";
import rotPos from "./rotPos";
import { POINT_DEF_BY } from "./PointDefBy";

function Point(props) {
  const figures = useSelector((state) => state.figures.value);
  const point = figures.find((f) => f.id === props.id);

  var pos = { x: 0, y: 0 };
  switch (point.def.by) {
    case POINT_DEF_BY.absPos:
      pos.x = point.def.x;
      pos.y = point.def.y;
      break;
    case POINT_DEF_BY.rotPnt:
      const refId = point.def.refPoint;
      const counterId = point.def.counterPoint;
      const refPoint = figures.find((f) => f.id === refId);
      const counterPoint = figures.find((f) => f.id === counterId);
      const refPos = { x: refPoint.def.x, y: refPoint.def.y };
      const counterPos = { x: counterPoint.def.x, y: counterPoint.def.y };
      pos = rotPos(refPos, counterPos, point.def.angle);
      break;
    default:
      break;
  }

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
