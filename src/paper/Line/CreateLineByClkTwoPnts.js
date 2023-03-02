import { useDispatch } from "react-redux";
import { useEffect } from "react";

import { create, setDep } from "../../Figure/figureSlice";
import { TYPE } from "../../Figure/Figure";
import Line from "../../Figure/Line";
import clickJudge from "../clickJudge";

function CreateLineByClkTwoPnts() {
  const dispatch = useDispatch();

  useEffect(() => {
    let points = [];
    const handleMouseClick = (event) => {
      const element = clickJudge(event, TYPE.Point);
      if (
        element !== undefined &&
        (points.length === 0 || element.id !== points[0])
      ) {
        points.push(element);
      }
      if (points.length === 2) {
        const line = Line.byTwoPnts(points[0], points[1]);
        dispatch(create(line));
        dispatch(setDep({ determinant: points[0], dependant: line.id }));
        dispatch(setDep({ determinant: points[1], dependant: line.id }));
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
