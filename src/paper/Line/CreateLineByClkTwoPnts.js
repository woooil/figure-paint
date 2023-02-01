import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

import { create } from "../../Figure/figureSlice";
import FIG_TYPE from "../../Figure/FIG_TYPE";
import newFigure from "../../Figure/newFigure";
import LINE_DEF from "../../Figure/Line/LINE_DEF";
import clickJudge from "../clickJudge";

function CreateLineByClkTwoPnts() {
  const figures = useSelector((state) => state.figures.value);
  const dispatch = useDispatch();

  useEffect(() => {
    var points = [];
    const handleMouseClick = (event) => {
      const point = { x: event.clientX, y: event.clientY };
      const element = clickJudge(figures, point, FIG_TYPE.point);
      if (
        element !== undefined &&
        (points.length === 0 || element.id !== points[0])
      ) {
        points.push(element);
      }
      if (points.length === 2) {
        const def = {
          by: LINE_DEF.twoPnts,
          fst: points[0],
          snd: points[1],
        };
        const line = newFigure(FIG_TYPE.line, def);
        dispatch(create(line));
        points = [];
      }
    };
    window.addEventListener("click", handleMouseClick);
    return () => {
      window.removeEventListener("click", handleMouseClick);
    };
  });
}

export default CreateLineByClkTwoPnts;