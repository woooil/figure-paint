import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { create } from "../../Figure/figureSlice";
import FIG_TYPE from "../../Figure/FIG_TYPE";
import newFigure from "../../Figure/newFigure";
import POINT_DEF from "../../Figure/Point/POINT_DEF";
import CANVAS_OPT from "../CANVAS_OPT";

function CreatePointByClick() {
  const dispatch = useDispatch();

  useEffect(() => {
    const handleMouseClick = (event) => {
      if (
        document
          .elementsFromPoint(event.clientX, event.clientY)
          .find((e) => e.id === CANVAS_OPT.id) !== undefined
      ) {
        const canvas = document.getElementById(CANVAS_OPT.id);
        let bounds = canvas.getBoundingClientRect();
        let y = event.clientY - bounds.top;
        console.log(
          "d",
          event.clientY - canvas.offsetTop,
          event.pageY - canvas.offsetTop,
          y
        );
        const def = {
          by: POINT_DEF.absPos,
          x: event.pageX - canvas.offsetLeft,
          y: event.pageY - canvas.offsetTop,
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
