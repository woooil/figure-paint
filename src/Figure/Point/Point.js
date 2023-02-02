import { useSelector } from "react-redux";

import figureComponent from "../figureComponent";
import getPointPos from "./getPointPos";

function Point({ id }) {
  const figures = useSelector((state) => state.figures.value);
  const pos = getPointPos(figures, id);

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

  return figureComponent(wrapperStyle, figureStyle);
}

export default Point;
