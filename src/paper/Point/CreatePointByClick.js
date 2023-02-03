import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { create } from "../../Figure/figureSlice";
import CANVAS_OPT from "../CANVAS_OPT";
import Point from "../../Figure/Point/Point";

function CreatePointByClick() {
  const dispatch = useDispatch();

  useEffect(() => {
    const handleMouseClick = (event) => {
      if (
        document
          .elementsFromPoint(event.clientX, event.clientY)
          .find((e) => e.id === CANVAS_OPT.id) !== undefined
      ) {
        const canvas = document.getElementById(CANVAS_OPT.id);
        const figure = Point.byAbsCoord(
          event.pageX - canvas.offsetLeft,
          event.pageY - canvas.offsetTop
        );
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
