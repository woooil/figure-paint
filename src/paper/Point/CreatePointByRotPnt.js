import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { create, update, setDep } from "../../Figure/figureSlice";
import { TYPE } from "../../Figure/Figure";
import Paper from "../Paper";
import Point from "../../Figure/Point";

import clickJudge from "../clickJudge";

function CreatePointByRotPnt() {
  const dispatch = useDispatch();

  useEffect(() => {
    let points = [];
    var hint = undefined;
    var activeId = false;
    const handleMouseMove = (event) => {
      if (points.length > 1) {
        const figures = Paper.figures;
        const angle = figures
          .fig(points[1])
          .coord.angleBetween(
            figures.fig(points[0]).coord,
            Paper.offsetOf(event)
          );
        const newPoint = Point.byRotPnt(points[0], points[1], angle);
        if (hint) {
          dispatch(update({ id: hint.id, with: { def: newPoint.def } }));
        } else {
          hint = newPoint;
          dispatch(create(hint));
          dispatch(setDep({ determinant: points[0], dependant: hint.id }));
          dispatch(setDep({ determinant: points[1], dependant: hint.id }));
          dispatch(update({ id: hint.id, with: { isHint: true } }));
        }
      } else {
        const id = clickJudge(event, TYPE.Point);
        if (id !== undefined) {
          if (activeId !== id) {
            dispatch(update({ id: id, with: { isHint: true } }));
            activeId = id;
          }
        } else if (activeId) {
          if (points.length === 0 || points[0] !== activeId) {
            dispatch(update({ id: activeId, with: { isHint: false } }));
          }
          activeId = false;
        }
      }
    };
    const handleMouseClick = (event) => {
      if (points.length < 2) {
        const id = clickJudge(event, TYPE.Point);
        if (id !== undefined) {
          points.push(id);
        }
      } else {
        if (points.length === 2) {
          dispatch(update({ id: hint.id, with: { isHint: false } }));
          dispatch(update({ id: points[0], with: { isHint: false } }));
          dispatch(update({ id: points[1], with: { isHint: false } }));
          points = [];
          hint = undefined;
          activeId = false;
        }
      }
    };
    window.addEventListener("click", handleMouseClick);
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("click", handleMouseClick);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  });
}

export default CreatePointByRotPnt;
