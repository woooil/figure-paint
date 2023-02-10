import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { update } from "../../Figure/figureSlice";
import { TYPE } from "../../Figure/Figure";
import clickJudge from "../clickJudge";

function HideLineByClick() {
  const figures = useSelector((state) => state.figures.value);
  const dispatch = useDispatch();

  useEffect(() => {
    const handleMouseClick = (event) => {
      const id = clickJudge(figures, event, TYPE.Line);
      if (id !== undefined) {
        const payload = {
          id: id,
          with: {
            visible: false,
          },
        };
        dispatch(update(payload));
      }
    };
    window.addEventListener("click", handleMouseClick);
    return () => {
      window.removeEventListener("click", handleMouseClick);
    };
  });

  return;
}

export default HideLineByClick;
