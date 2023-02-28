import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { create, update, remove } from "../../Figure/figureSlice";
import Paper from "../Paper";
import Point from "../../Figure/Point";

function CreatePointByClick() {
  const dispatch = useDispatch();

  useEffect(() => {
    const hint = Point.byAbsCoord(0, 0);
    dispatch(create(hint));
    dispatch(
      update({
        id: hint.id,
        with: {
          isHint: true,
        },
      })
    );
    const handleMouseMove = (event) => {
      if (Paper.isUnder(event)) {
        const coord = Paper.offsetOf(event);
        const def = Point.byAbsCoord(coord.x, coord.y).def;
        dispatch(
          update({
            id: hint.id,
            with: { def: def },
          })
        );
      }
    };
    const handleMouseClick = (event) => {
      if (Paper.isUnder(event)) {
        const coord = Paper.offsetOf(event);
        const figure = Point.byAbsCoord(coord.x, coord.y);
        dispatch(create(figure));
      }
    };
    window.addEventListener("click", handleMouseClick);
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      dispatch(remove(hint.id));
      window.removeEventListener("click", handleMouseClick);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  });

  return;
}

export default CreatePointByClick;
