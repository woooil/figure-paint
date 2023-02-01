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
          .find((e) => e.id === "canvas") !== undefined
      ) {
        const canvas = document.getElementById("canvas");
        const def = {
          by: POINT_DEF.absPos,
          x: event.clientX - canvas.offsetLeft,
          y: event.clientY - canvas.offsetTop,
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
