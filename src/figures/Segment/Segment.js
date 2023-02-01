import { useSelector } from "react-redux";

import FIG_TYPE from "../FIG_TYPE";
import getPointPos from "../Point/getPointPos";

function Segment(props) {
  const figures = useSelector((state) => state.figures.value);
  const segment = figures.find((f) => f.id === props.id);
  const fstPos = getPointPos(figures, segment.def.fst);
  const sndPos = getPointPos(figures, segment.def.snd);

  const segmentWidth = 2;
  const paddingWidth = 4;
  const len = Math.sqrt(
    (fstPos.x - sndPos.x) ** 2 + (fstPos.y - sndPos.y) ** 2
  );
  const segmentStyle = {
    backgroundColor: "black",
    width: `${len}px`,
    height: `${segmentWidth}px`,
    position: "absolute",
    top: paddingWidth - segmentWidth / 2,
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
      className={`${FIG_TYPE.segment} figure-wrapper`}
      {...props}
    >
      <div style={segmentStyle}></div>
    </div>
  );
}

export default Segment;
