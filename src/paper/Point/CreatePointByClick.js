import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { create } from "../../Figure/figureSlice";
import Paper from "../Paper";
import Point from "../../Figure/Point";

function CreatePointByClick() {
  const dispatch = useDispatch();

  useEffect(() => {
    const handleMouseClick = (event) => {
      if (Paper.isClicked(event)) {
        const coord = Paper.offsetOf(event);
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
