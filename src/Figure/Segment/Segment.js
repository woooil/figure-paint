import { useSelector } from "react-redux";

import figureComponent from "../figureComponent";
import getPointPos from "../Point/getPointPos";
import LINE_STYLE from "../Line/LINE_STYLE";

function Segment({ id }) {
  const figures = useSelector((state) => state.figures.value);
  const segment = figures.find((f) => f.id === id);
  const fstPos = getPointPos(figures, segment.def.fst);
  const sndPos = getPointPos(figures, segment.def.snd);

  const paddingWidth = 4;
  const len = Math.sqrt(
    (fstPos.x - sndPos.x) ** 2 + (fstPos.y - sndPos.y) ** 2
  );
  const figureStyle = {
    backgroundColor: LINE_STYLE.backgroundColor,
    width: `${len}px`,
    height: `${LINE_STYLE.lineWidth}px`,
    top: paddingWidth - LINE_STYLE.lineWidth / 2,
  };
  const angle = Math.atan((sndPos.y - fstPos.y) / (sndPos.x - fstPos.x));
  const pos = {
    x: (fstPos.x + sndPos.x - len) / 2,
    y: (fstPos.y + sndPos.y) / 2,
  };
  const wrapperStyle = {
    width: `${len}px`,
    height: `${paddingWidth * 2}px`,
    transform: `rotate(${(angle * 180) / Math.PI}deg)`,
    left: pos.x,
    top: pos.y - paddingWidth,
  };

  return figureComponent(wrapperStyle, figureStyle);
}

export default Segment;
