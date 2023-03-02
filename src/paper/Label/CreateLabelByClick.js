import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { create, setDep } from "../../Figure/figureSlice";
import { TYPE } from "../../Figure/Figure";
import Label from "../../Figure/Label";
import clickJudge from "../clickJudge";

function CreateLabelByClick() {
  const dispatch = useDispatch();

  useEffect(() => {
    const handleMouseClick = (event) => {
      const element = clickJudge(event, TYPE.Point);
      if (element !== undefined) {
        const figure = Label.byPointName(element, 0, -10);
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
