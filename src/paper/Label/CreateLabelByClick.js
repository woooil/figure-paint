import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { create, setDep } from "../../Figure/figureSlice";
import { TYPE } from "../../Figure/Figure";
import Label from "../../Figure/Label/Label";
import clickJudge from "../clickJudge";

function CreateLabelByClick() {
  const figures = useSelector((state) => state.figures.value);
  const dispatch = useDispatch();

  useEffect(() => {
    const handleMouseClick = (event) => {
      const element = clickJudge(figures, event, TYPE.Point);
      if (element !== undefined) {
        const figure = Label.byRelToFig(element, 0, -10);
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
