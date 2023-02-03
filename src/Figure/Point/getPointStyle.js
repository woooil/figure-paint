import FigureStyle from "../FigureStyle";
import getPointCoord from "./getPointCoord";

function getPointStyle(figures, id) {
  const pos = getPointCoord(figures, id);

  const pointSize = 6;
  const paddingSize = 4;
  const figureStyle = {
    backgroundColor: "black",
    width: `${pointSize}px`,
    height: `${pointSize}px`,
    borderRadius: "50%",
    left: paddingSize,
    top: paddingSize,
  };
  const wrapperStyle = {
    width: `${pointSize + paddingSize * 2}px`,
    height: `${pointSize + paddingSize * 2}px`,
    left: pos.x - pointSize / 2 - paddingSize,
    top: pos.y - pointSize / 2 - paddingSize,
  };

  return new FigureStyle(wrapperStyle, figureStyle);
}

export default getPointStyle;
