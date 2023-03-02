import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { create, setDep, hinter } from "../../Figure/figureSlice";
import { TYPE } from "../../Figure/Figure";
import Paper from "../Paper";
import Point from "../../Figure/Point";
import Figure from "../../Figure/Figure";

import clickJudge from "../clickJudge";

function CreatePointByRotPnt() {
  const dispatch = useDispatch();

  useEffect(() => {
    let points = [];
    const hints = [Figure.newId(), Figure.newId(), Figure.newId()];
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
        dispatch(hinter({ id: hints[2], with: newPoint }));
      } else {
        const id = clickJudge(event, TYPE.Point);
        if (id !== undefined) {
          if (activeId !== id) {
            const point = Paper.figures.fig(id);
            dispatch(hinter({ id: hints[points.length], with: point }));
            activeId = id;
          }
        } else if (activeId) {
          dispatch(hinter({ id: hints[points.length], with: undefined }));
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
        const figures = Paper.figures;
        const angle = figures
          .fig(points[1])
          .coord.angleBetween(
            figures.fig(points[0]).coord,
            Paper.offsetOf(event)
          );
        if (points.length === 2) {
          const figure = Point.byRotPnt(points[0], points[1], angle);
          dispatch(create(figure));
          dispatch(setDep({ determinant: points[0], dependant: figure.id }));
          dispatch(setDep({ determinant: points[1], dependant: figure.id }));
          points = [];
          dispatch(hinter({ id: hints[0], with: undefined }));
          dispatch(hinter({ id: hints[1], with: undefined }));
          dispatch(hinter({ id: hints[2], with: undefined }));
        }
      }
    };
    window.addEventListener("click", handleMouseClick);
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("click", handleMouseClick);
      window.removeEventListener("mousemove", handleMouseMove);
      dispatch(hinter({ id: hints[0], with: undefined }));
      dispatch(hinter({ id: hints[1], with: undefined }));
      dispatch(hinter({ id: hints[2], with: undefined }));
    };
  });
}

export default CreatePointByRotPnt;
