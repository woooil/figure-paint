import FigureStyle from "../FigureStyle";
import getPointCoord from "../Point/getPointCoord";
import getTextDim from "./getTextDim";

function getLabelStyle(figures, id) {
  const label = figures.find((f) => f.id === id);
  const name = figures.find((f) => f.id === label.def.host).name;
  const hostPos = getPointCoord(figures, label.def.host);
  const dim = getTextDim(name, "");

  const paddingSize = 4;
  const figureStyle = {
    left: paddingSize,
    top: paddingSize,
  };
  const wrapperStyle = {
    width: dim.width + paddingSize * 2,
    height: dim.height + paddingSize * 2,
    left: hostPos.x + label.def.x - dim.width / 2 - paddingSize,
    top: hostPos.y + label.def.y - paddingSize,
  };

  return new FigureStyle(wrapperStyle, figureStyle, name);
}

export default getLabelStyle;
