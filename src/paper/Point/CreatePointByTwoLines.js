import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

import { create, setDep } from "../../Figure/figureSlice";
import { TYPE } from "../../Figure/Figure";
import Point from "../../Figure/Point/Point";
import clickJudge from "../clickJudge";

function CreatePointByTwoLines() {
  const figures = useSelector((state) => state.figures.value);
  const dispatch = useDispatch();

  useEffect(() => {
    var lines = [];
    const handleMouseClick = (event) => {
      const element = clickJudge(figures, event, TYPE.Line);
      if (
        element !== undefined &&
        (lines.length === 0 || element.id !== lines[0])
      ) {
        lines.push(element);
      }
      if (lines.length === 2) {
        const point = Point.byIntsec(lines[0], lines[1]);
        dispatch(create(point));
        dispatch(setDep({ determinant: lines[0], dependant: point.id }));
        dispatch(setDep({ determinant: lines[1], dependant: point.id }));
        lines = [];
      }
    };
    window.addEventListener("click", handleMouseClick);
    return () => {
      window.removeEventListener("click", handleMouseClick);
    };
  });
}

export default CreatePointByTwoLines;
