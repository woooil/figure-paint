import FigureStyle from "../FigureStyle";
import getLinePosAng from "./getLinePosAng";
import LINE_STYLE from "./LINE_STYLE";

function getLineStyle(figures, id) {
  const paddingWidth = 4;
  const len = 2500;
  const { pos, angle } = getLinePosAng(figures, id, len);

  const figureStyle = {
    backgroundColor: LINE_STYLE.backgroundColor,
    width: `${len}px`,
    height: `${LINE_STYLE.lineWidth}px`,
    top: paddingWidth - LINE_STYLE.lineWidth / 2,
  };
  const wrapperStyle = {
    width: `${len}px`,
    height: `${paddingWidth * 2}px`,
    transform: `rotate(${angle}deg)`,
    left: pos.x,
    top: pos.y - paddingWidth,
  };

  return new FigureStyle(wrapperStyle, figureStyle);
}

export default getLineStyle;
