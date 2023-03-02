import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { create, update, remove } from "../../Figure/figureSlice";
import Paper from "../Paper";
import Point from "../../Figure/Point";

function CreatePointByClick() {
  const dispatch = useDispatch();

  // Id of Point instance; undefined if not exists
  var id = undefined;
  // When mouse is moved, update Point
  const updatePoint = (event) => {
    // If mouse is on Paper, move or create Point
    if (Paper.isUnder(event)) {
      const coord = Paper.offsetOf(event);
      const point = Point.byAbsCoord(coord.x, coord.y);
      // If Point doesn't exist, first create Point
      if (!id) {
        id = point.id;
        dispatch(create(point));
        dispatch(update({ id: id, with: { isHint: true } }));
      }
      dispatch(update({ id: id, with: { def: point.def } }));
    }
    // Else if mouse gets out of Paper, remove Point
    else if (id) {
      dispatch(remove(id));
      id = undefined;
    }
  };
  // When mouse is clicked, settle Point
  const settlePoint = () => {
    if (id) {
      dispatch(update({ id: id, with: { isHint: false } }));
      id = undefined;
    }
  };

  useEffect(() => {
    const handleMouseMove = (event) => {
      updatePoint(event);
    };
    const handleMouseClick = (event) => {
      // if Point doesn't exist; component mounted with mouse on Paper and clicked without mouse move
      if (!id) {
        updatePoint(event);
      }
      settlePoint();
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
