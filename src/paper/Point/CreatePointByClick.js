import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { create } from "../../Figure/figureSlice";
import CANVAS_OPT from "../CANVAS_OPT";
import Point from "../../Figure/Point";
import getOffset from "../getOffset";

function CreatePointByClick() {
  const dispatch = useDispatch();

  useEffect(() => {
    const handleMouseClick = (event) => {
      if (
        document
          .elementsFromPoint(event.clientX, event.clientY)
          .fig(CANVAS_OPT.id) !== undefined
      ) {
        const coord = getOffset(event);
        const figure = Point.byAbsCoord(coord.x, coord.y);
        dispatch(create(figure));
      }
    };
    window.addEventListener("click", handleMouseClick);
    return () => {
      window.removeEventListener("click", handleMouseClick);
    };
  });

  return;
}

export default CreatePointByClick;
