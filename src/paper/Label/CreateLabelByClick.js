import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { create, setDep } from "../../Figure/figureSlice";
import FIG_TYPE from "../../Figure/FIG_TYPE";
import newFigure from "../../Figure/newFigure";
import LABEL_DEF from "../../Figure/Label/LABEL_DEF";

import clickJudge from "../clickJudge";

function CreateLabelByClick() {
  const figures = useSelector((state) => state.figures.value);
  const dispatch = useDispatch();

  useEffect(() => {
    const handleMouseClick = (event) => {
      const element = clickJudge(figures, event, FIG_TYPE.point);
      if (element !== undefined) {
        const def = {
          by: LABEL_DEF.relToFig,
          host: element,
          x: 0,
          y: -30,
        };
        const figure = newFigure(FIG_TYPE.label, def);
        dispatch(create(figure));
        dispatch(setDep({ determinant: element, dependant: figure.id }));
      }
    };
    window.addEventListener("click", handleMouseClick);
    return () => {
      window.removeEventListener("click", handleMouseClick);
    };
  });

  return;
}

export default CreateLabelByClick;
