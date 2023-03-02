import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { create, update, remove, setDep } from "../../Figure/figureSlice";
import { TYPE } from "../../Figure/Figure";
import Paper from "../Paper";
import Point from "../../Figure/Point";

import clickJudge from "../clickJudge";

function CreatePointByRotPnt() {
  const dispatch = useDispatch();

  // Current steop of creating Point; 0 for selecting first Point, 1 for selecting second Point, 2 for selecting angle
  var step = 0;
  // Id of first Point, second Point and third Point; undefined if not exists
  var ids = [undefined, undefined, undefined];
  // Call when mouse is moved; update first or second Point
  const updateExsPoint = (event) => {
    const id = clickJudge(event, TYPE.Point);
    // If mouse is on Point which is different from the old one, set the Point
    if (id && id !== ids[step] && (step === 0 || id !== ids[0])) {
      ids[step] = id;
      dispatch(update({ id: id, with: { isHint: true } }));
    }
    // Else if mouse gets out of Point, lift the Point
    else if (ids[step] && !id) {
      dispatch(update({ id: ids[step], with: { isHint: false } }));
      ids[step] = undefined;
    }
  };
  // Call when mouse is clicked; select first or second Point
  const selectExsPoint = () => {
    if (ids[step]) {
      step++;
    }
  };
  // Call when mouse is moved; update third Point
  const updateTrdPoint = (event) => {
    // If mouse is on Paper, move or create Point
    if (Paper.isUnder(event)) {
      const figures = Paper.figures;
      const angle = figures
        .fig(ids[1])
        .coord.angleBetween(figures.fig(ids[0]).coord, Paper.offsetOf(event));
      const point = Point.byRotPnt(ids[0], ids[1], angle);
      // If third Point doesn't exist, first create Point
      if (!ids[2]) {
        ids[2] = point.id;
        dispatch(create(point));
        dispatch(setDep({ determinant: ids[0], dependant: ids[2] }));
        dispatch(setDep({ determinant: ids[1], dependant: ids[2] }));
        dispatch(update({ id: ids[2], with: { isHint: true } }));
      }
      dispatch(update({ id: ids[2], with: { def: point.def } }));
    }
    // Else if mouse gets out of Paper, remove third Point
    else if (ids[2]) {
      dispatch(remove(ids[2]));
      ids[2] = undefined;
    }
  };
  // When mouse is clicked, settle Point
  const settleTrdPoint = () => {
    if (ids[2]) {
      dispatch(update({ id: ids[0], with: { isHint: false } }));
      dispatch(update({ id: ids[1], with: { isHint: false } }));
      dispatch(update({ id: ids[2], with: { isHint: false } }));
      ids = [undefined, undefined, undefined];
      step = 0;
    }
  };

  useEffect(() => {
    const handleMouseMove = (event) => {
      if (step < 2) {
        updateExsPoint(event);
      } else {
        updateTrdPoint(event);
      }
    };
    const handleMouseClick = (event) => {
      if (step < 2) {
        selectExsPoint();
      } else {
        settleTrdPoint();
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
