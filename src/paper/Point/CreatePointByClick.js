import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { create, update, remove } from "../../Figure/figureSlice";
import Paper from "../Paper";
import Point from "../../Figure/Point";

function CreatePointByClick() {
  const dispatch = useDispatch();

  useEffect(() => {
    var hint = undefined;
    var active = false;
    const handleMouseMove = (event) => {
      if (Paper.isUnder(event)) {
        const coord = Paper.offsetOf(event);
        const point = Point.byAbsCoord(coord.x, coord.y);
        if (!active) {
          hint = point;
          dispatch(create(hint));
          dispatch(update({ id: hint.id, with: { isHint: true } }));
        }
        dispatch(update({ id: hint.id, with: { def: point.def } }));
        active = true;
      } else if (active) {
        dispatch(remove(hint.id));
        active = false;
      }
    };
    const handleMouseClick = (event) => {
      if (Paper.isUnder(event)) {
        const coord = Paper.offsetOf(event);
        const point = Point.byAbsCoord(coord.x, coord.y);
        if (!active) {
          hint = point;
          dispatch(create(hint));
        } else {
          dispatch(
            update({ id: hint.id, with: { def: point.def, isHint: false } })
          );
        }
        hint = Point.byAbsCoord(coord.x, coord.y);
        active = false;
      }
    };
    window.addEventListener("click", handleMouseClick);
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("click", handleMouseClick);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  });

  return;
}

export default CreatePointByClick;
