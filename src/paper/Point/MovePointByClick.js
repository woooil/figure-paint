import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { update, liftDep } from "../../Figure/figureSlice";
import CANVAS_OPT from "../CANVAS_OPT";
import Point from "../../Figure/Point/Point";
import { TYPE } from "../../Figure/Figure";
import clickJudge from "../clickJudge";
import getOffset from "../getOffset";

function MovePointByClick() {
  const figures = useSelector((state) => state.figures.value);
  const dispatch = useDispatch();

  useEffect(() => {
    var id = undefined;
    const handleMouseClick = (event) => {
      if (id === undefined) {
        id = clickJudge(figures, event, TYPE.Point);
      } else {
        if (
          document
            .elementsFromPoint(event.clientX, event.clientY)
            .find((e) => e.id === CANVAS_OPT.id) !== undefined
        ) {
          const coord = getOffset(event);
          const figure = Point.byAbsCoord(coord.x, coord.y);
          const payload = {
            id: id,
            with: {
              def: figure.def,
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
