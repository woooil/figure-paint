import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { create } from "../../figures/figureSlice";
import FIG_TYPE from "../../figures/FIG_TYPE";
import newFigure from "../../figures/newFigure";
import POINT_DEF from "../../figures/Point/POINT_DEF";

function CreatePointByClick() {
  const dispatch = useDispatch();

  useEffect(() => {
    const handleMouseClick = (event) => {
      if (
        document
          .elementsFromPoint(event.clientX, event.clientY)
          .find((e) => e.classList.contains("canvas")) !== undefined
      ) {
        const def = {
          by: POINT_DEF.absPos,
          x: event.clientX,
          y: event.clientY,
        };
        const point = newFigure(FIG_TYPE.point, def);
        dispatch(create(point));
      }
    };
    window.addEventListener("click", handleMouseClick);
    return () => {
      window.removeEventListener("click", handleMouseClick);
    };
  });

  return;
}

export default CreatePointByClick;
