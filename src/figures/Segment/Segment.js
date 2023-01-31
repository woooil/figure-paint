import { useSelector } from "react-redux";

import { FIG_TYPE } from "../Figure";

function Segment(props) {
  const figures = useSelector((state) => state.figures.value);
  const segment = figures.find((f) => f.id === props.id);
  const fst = figures.find((f) => f.id === segment.def.fst);
  const snd = figures.find((f) => f.id === segment.def.snd);

  const segmentWidth = 2;
  const paddingWidth = 4;
  const len = Math.sqrt(
    (fst.def.x - snd.def.x) ** 2 + (fst.def.y - snd.def.y) ** 2
  );
  const segmentStyle = {
    backgroundColor: "black",
    width: `${len}px`,
    height: `${segmentWidth}px`,
    position: "absolute",
    top: paddingWidth - segmentWidth / 2,
  };
  const angle = Math.atan((snd.def.y - fst.def.y) / (snd.def.x - fst.def.x));
  const pos = {
    x: (fst.def.x + snd.def.x - len) / 2,
    y: (fst.def.y + snd.def.y) / 2,
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
