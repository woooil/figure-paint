import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { create, hinter } from "../../Figure/figureSlice";
import Paper from "../Paper";
import Point from "../../Figure/Point";

function CreatePointByClick() {
  const dispatch = useDispatch();

  useEffect(() => {
    const hint = Point.newId();
    var active = false;
    const handleMouseMove = (event) => {
      if (Paper.isUnder(event)) {
        const coord = Paper.offsetOf(event);
        const point = Point.byAbsCoord(coord.x, coord.y);
        dispatch(hinter({ id: hint, with: point }));
        active = true;
      } else if (active) {
        dispatch(hinter({ id: hint, with: undefined }));
        active = false;
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
      window.removeEventListener("click", handleMouseClick);
      window.removeEventListener("mousemove", handleMouseMove);
      dispatch(hinter({ id: hint, with: undefined }));
    };
  });

  return;
}

export default CreatePointByClick;
