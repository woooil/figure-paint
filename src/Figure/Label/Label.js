import { useSelector } from "react-redux";

import figureComponent from "../figureComponent";
import getPointPos from "../Point/getPointPos";
import getTextDim from "./getTextDim";

function Label({ id }) {
  const figures = useSelector((state) => state.figures.value);
  const label = figures.find((f) => f.id === id);
  const hostPos = getPointPos(figures, label.def.host);
  const dim = getTextDim(label.def.text, "");

  const paddingSize = 4;
  const figureStyle = {
    position: "absolute",
    left: paddingSize,
    top: paddingSize,
  };
  const wrapperStyle = {
    position: "absolute",
    width: dim.width + paddingSize * 2,
    height: dim.height + paddingSize * 2,
    left: hostPos.x + label.def.x - dim.width / 2 - paddingSize,
    top: hostPos.y + label.def.y - paddingSize,
  };

  return figureComponent(wrapperStyle, figureStyle, label.def.text);
}

export default Label;
