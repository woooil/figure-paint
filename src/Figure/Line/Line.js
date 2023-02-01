import { useSelector } from "react-redux";

import FIG_TYPE from "../FIG_TYPE";
import getPointPos from "../Point/getPointPos";

function Line(props) {
  const figures = useSelector((state) => state.figures.value);
  const line = figures.find((f) => f.id === props.id);
  const fstPos = getPointPos(figures, line.def.fst);
  const sndPos = getPointPos(figures, line.def.snd);

  const lineWidth = 2;
  const paddingWidth = 4;
  const len = 2500;
  const lineStyle = {
    backgroundColor: "black",
    width: `${len}px`,
    height: `${lineWidth}px`,
    position: "absolute",
    top: paddingWidth - lineWidth / 2,
  };
  const angle = Math.atan((sndPos.y - fstPos.y) / (sndPos.x - fstPos.x));
  const pos = {
    x: (fstPos.x + sndPos.x - len) / 2,
    y: (fstPos.y + sndPos.y) / 2,
  };
  const paddingStyle = {
    width: `${len}px`,
    height: `${paddingWidth * 2}px`,
    position: "absolute",
    transform: `rotate(${(angle * 180) / Math.PI}deg)`,
    left: pos.x,
    top: pos.y - paddingWidth,
  };

  return (
    <div
      style={paddingStyle}
      className={`${FIG_TYPE.line} figure-wrapper`}
      {...props}
    >
      <div style={lineStyle}></div>
    </div>
  );
}

export default Line;
