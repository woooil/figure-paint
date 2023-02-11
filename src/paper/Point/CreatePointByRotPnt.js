import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { create, setDep } from "../../Figure/figureSlice";
import { TYPE } from "../../Figure/Figure";
import Point from "../../Figure/Point";

import clickJudge from "../clickJudge";

function CreatePointByRotPnt() {
  const figures = useSelector((state) => state.figures.value);
  const dispatch = useDispatch();

  const [angle, setAngle] = useState(0.0);

  useEffect(() => {
    var points = [];
    const handleMouseClick = (event) => {
      const id = clickJudge(figures, event, TYPE.Point);
      if (id !== undefined) {
        points.push(id);
      }
      if (points.length === 2) {
        const figure = Point.byRotPnt(points[0], points[1], angle);
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
