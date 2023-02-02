import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { remove } from "../../Figure/figureSlice";
import FIG_TYPE from "../../Figure/FIG_TYPE";
import clickJudge from "../clickJudge";

function RemovePointByClick() {
  const figures = useSelector((state) => state.figures.value);
  const dispatch = useDispatch();

  useEffect(() => {
    const handleMouseClick = (event) => {
      const clicked = { x: event.clientX, y: event.clientY };
      const id = clickJudge(figures, clicked, FIG_TYPE.point);
      if (id !== undefined) {
        dispatch(remove(id));
      }
    };
    window.addEventListener("click", handleMouseClick);
    return () => {
      window.removeEventListener("click", handleMouseClick);
    };
  });

  return;
}

export default RemovePointByClick;
