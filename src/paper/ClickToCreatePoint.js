import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { create } from "../figures/figureSlice";
import { FIGTYPE, newFigure } from "../figures/Figure";
import { getNextName } from "../figures/Point";

function ClickToCreatePoint() {
  const dispatch = useDispatch();

  useEffect(() => {
    const handleMouseClick = (event) => {
      const def = {
        by: "ABSPOS",
        x: event.clientX,
        y: event.clientY,
      };
      const point = newFigure(FIGTYPE.Point, def, { name: getNextName() });
      dispatch(create(point));
    };
    window.addEventListener("click", handleMouseClick);
    return () => {
      window.removeEventListener("click", handleMouseClick);
    };
  });

  return;
}

export default ClickToCreatePoint;
