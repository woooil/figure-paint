import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { update } from "../../figures/figureSlice";
import FIG_TYPE from "../../figures/FIG_TYPE";
import POINT_DEF from "../../figures/Point/POINT_DEF";
import clickJudge from "../clickJudge";

function MovePointByClick() {
  const figures = useSelector((state) => state.figures.value);
  const dispatch = useDispatch();

  useEffect(() => {
    var id = undefined;
    const handleMouseClick = (event) => {
      if (id === undefined) {
        const clicked = { x: event.clientX, y: event.clientY };
        const element = clickJudge(figures, clicked, FIG_TYPE.point);
        id = element;
      } else {
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
          const oldPoint = figures.find((f) => f.id === id);
          const newPoint = { ...oldPoint, def: def };
          const payload = {
            id: id,
            with: newPoint,
          };
          dispatch(update(payload));
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
