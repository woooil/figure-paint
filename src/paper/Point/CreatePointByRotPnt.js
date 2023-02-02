import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { create, setDep } from "../../Figure/figureSlice";
import FIG_TYPE from "../../Figure/FIG_TYPE";
import newFigure from "../../Figure/newFigure";
import POINT_DEF from "../../Figure/Point/POINT_DEF";

import clickJudge from "../clickJudge";

function CreatePointByRotPnt() {
  const figures = useSelector((state) => state.figures.value);
  const dispatch = useDispatch();

  const [angle, setAngle] = useState(0.0);

  useEffect(() => {
    var points = [];
    const handleMouseClick = (event) => {
      const point = { x: event.clientX, y: event.clientY };
      const id = clickJudge(figures, point, FIG_TYPE.point);
      if (id !== undefined) {
        points.push(id);
      }
      if (points.length === 2) {
        const def = {
          by: POINT_DEF.rotPnt,
          counterPoint: points[0],
          refPoint: points[1],
          angle: angle,
        };
        const figure = newFigure(FIG_TYPE.point, def);
        dispatch(create(figure));
        dispatch(setDep({ determinant: points[0], dependant: figure.id }));
        dispatch(setDep({ determinant: points[1], dependant: figure.id }));
        points = [];
      }
    };
    window.addEventListener("click", handleMouseClick);
    return () => {
      window.removeEventListener("click", handleMouseClick);
    };
  });

  return (
    <input
      type="text"
      value={angle}
      onChange={(e) => setAngle(e.target.value)}
    />
  );
}

export default CreatePointByRotPnt;
