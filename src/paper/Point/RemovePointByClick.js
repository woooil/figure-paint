import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { remove } from "../../Figure/figureSlice";
import { TYPE } from "../../Figure/Figure";
import clickJudge from "../clickJudge";

function RemovePointByClick() {
  const dispatch = useDispatch();

  useEffect(() => {
    const handleMouseClick = (event) => {
      const id = clickJudge(event, TYPE.Point);
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
