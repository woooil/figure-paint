import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { update } from "../../Figure/figureSlice";
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
        const element = clickJudge(figures, clicked, FIG_TYPE.point);
        id = element;
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
