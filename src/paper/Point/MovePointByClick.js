import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { update, liftDep } from "../../Figure/figureSlice";
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
        const clicked = { x: event.clientX, y: event.clientY };
        id = clickJudge(figures, clicked, FIG_TYPE.point);
      } else {
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
