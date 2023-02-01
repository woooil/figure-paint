import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { create } from "../../Figure/figureSlice";
import FIG_TYPE from "../../Figure/FIG_TYPE";
import newFigure from "../../Figure/newFigure";
import LABEL_DEF from "../../Figure/Label/LABEL_DEF";

import clickJudge from "../clickJudge";

function CreateLabelByClick() {
  const figures = useSelector((state) => state.figures.value);
  const dispatch = useDispatch();

  const [text, setText] = useState("");

  useEffect(() => {
    const handleMouseClick = (event) => {
      const point = { x: event.clientX, y: event.clientY };
      const element = clickJudge(figures, point, FIG_TYPE.point);
      if (element !== undefined) {
        const def = {
          by: LABEL_DEF.relToFig,
          text: text,
          host: element,
          x: 0,
          y: -30,
        };
        const figure = newFigure(FIG_TYPE.label, def);
        dispatch(create(figure));
      }
    };
    window.addEventListener("click", handleMouseClick);
    return () => {
      window.removeEventListener("click", handleMouseClick);
    };
  });

  return (
    <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
  );
}

export default CreateLabelByClick;
