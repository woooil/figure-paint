import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { update, liftDep } from "../../Figure/figureSlice";
import CANVAS_OPT from "../CANVAS_OPT";
import FIG_TYPE from "../../Figure/FIG_TYPE";
import POINT_DEF from "../../Figure/Point/POINT_DEF";
import clickJudge from "../clickJudge";

function MovePointByClick() {
  const figures = useSelector((state) => state.figures.value);
  const dispatch = useDispatch();

  useEffect(() => {
    var id = undefined;
    const handleMouseClick = (event) => {
      if (id === undefined) {
        id = clickJudge(figures, event, FIG_TYPE.point);
      } else {
        if (
          document
            .elementsFromPoint(event.clientX, event.clientY)
            .find((e) => e.id === CANVAS_OPT.id) !== undefined
        ) {
          const canvas = document.getElementById(CANVAS_OPT.id);
          const def = {
            by: POINT_DEF.absPos,
            x: event.pageX - canvas.offsetLeft,
            y: event.pageY - canvas.offsetTop,
          };
          const payload = {
            id: id,
            with: {
              def: def,
            },
          };
          dispatch(update(payload));
          const determinants = figures.find((f) => f.id === id).determinants;
          determinants.forEach((det) => {
            dispatch(liftDep({ determinant: det, dependant: id }));
          });
          id = undefined;
        }
      }
    };
    window.addEventListener("click", handleMouseClick);
    return () => {
      window.removeEventListener("click", handleMouseClick);
    };
  });

  return;
}

export default MovePointByClick;
