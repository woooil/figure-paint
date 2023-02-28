import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { update, liftDep } from "../../Figure/figureSlice";
import Paper from "../Paper";
import Point from "../../Figure/Point";
import { TYPE } from "../../Figure/Figure";
import clickJudge from "../clickJudge";

function MovePointByClick() {
  const figures = useSelector((state) => state.figures.value);
  const dispatch = useDispatch();

  useEffect(() => {
    let id = undefined;
    const handleMouseClick = (event) => {
      if (id === undefined) {
        id = clickJudge(figures, event, TYPE.Point);
      } else {
        if (Paper.isUnder(event)) {
          const coord = Paper.offsetOf(event);
          const figure = Point.byAbsCoord(coord.x, coord.y);
          const payload = {
            id: id,
            with: {
              def: figure.def,
            },
          };
          dispatch(update(payload));
          const determinants = figures.fig(id).determinants;
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
