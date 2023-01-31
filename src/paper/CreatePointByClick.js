import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { create } from "../figures/figureSlice";
import { FIG_TYPE, newFigure } from "../figures/Figure";
import { getNextName } from "../figures/Point/getNextName";
import { POINT_DEF_BY } from "../figures/Point/PointDefBy";

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
          by: POINT_DEF_BY.absPos,
          x: event.clientX,
          y: event.clientY,
        };
        const point = newFigure(FIG_TYPE.point, def, { name: getNextName() });
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
