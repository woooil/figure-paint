import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { remove } from "../../Figure/figureSlice";
import { TYPE } from "../../Figure/Figure";
import clickJudge from "../clickJudge";

function RemovePointByClick() {
  const figures = useSelector((state) => state.figures.value);
  const dispatch = useDispatch();

  useEffect(() => {
    const handleMouseClick = (event) => {
      const id = clickJudge(figures, event, TYPE.Point);
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
