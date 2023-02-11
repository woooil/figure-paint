import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

import { create, setDep } from "../../Figure/figureSlice";
import { TYPE } from "../../Figure/Figure";
import Line from "../../Figure/Line";
import clickJudge from "../clickJudge";

function CreateLineByClkLine() {
  const figures = useSelector((state) => state.figures.value);
  const dispatch = useDispatch();

  useEffect(() => {
    var refLine = undefined;
    var point = undefined;
    const handleMouseClick = (event) => {
      if (refLine === undefined) {
        refLine = clickJudge(figures, event, TYPE.Line);
      } else if (point === undefined) {
        point = clickJudge(figures, event, TYPE.Point);
      }

      if (refLine !== undefined && point !== undefined) {
        const line = Line.byParLn(refLine, point);
        dispatch(create(line));
        dispatch(setDep({ determinant: refLine, dependant: line.id }));
        dispatch(setDep({ determinant: point, dependant: line.id }));
        refLine = undefined;
        point = undefined;
      }
    };
    window.addEventListener("click", handleMouseClick);
    return () => {
      window.removeEventListener("click", handleMouseClick);
    };
  });
}

export default CreateLineByClkLine;
