import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { update } from "../../Figure/figureSlice";
import { TYPE } from "../../Figure/Figure";
import clickJudge from "../clickJudge";

function HideLineByClick() {
  const dispatch = useDispatch();

  useEffect(() => {
    const handleMouseClick = (event) => {
      const id = clickJudge(event, TYPE.Line);
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
