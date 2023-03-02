import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { create, update, remove, setDep } from "../../Figure/figureSlice";
import { TYPE } from "../../Figure/Figure";
import Label from "../../Figure/Label";
import clickJudge from "../clickJudge";

function CreateLabelByClick() {
  const dispatch = useDispatch();

  useEffect(() => {
    var hint = undefined;
    var activeId = false;
    const handleMouseMove = (event) => {
      const element = clickJudge(event, TYPE.Point);
      if (element !== undefined && element !== activeId) {
        hint = Label.byPointName(element, 0, -10);
        dispatch(create(hint));
        dispatch(setDep({ determinant: element, dependant: hint.id }));
        dispatch(update({ id: hint.id, with: { isHint: true } }));
        dispatch(update({ id: element, with: { isHint: true } }));
        activeId = element;
      } else if (element === undefined && hint) {
        dispatch(update({ id: activeId, with: { isHint: false } }));
        dispatch(remove(hint.id));
        hint = undefined;
        activeId = false;
      }
    };
    const handleMouseClick = (event) => {
      if (hint) {
        dispatch(update({ id: activeId, with: { isHint: false } }));
        dispatch(update({ id: hint.id, with: { isHint: false } }));
        hint = undefined;
        activeId = false;
      }
    };
    window.addEventListener("click", handleMouseClick);
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("click", handleMouseClick);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  });

  return;
}

export default CreateLabelByClick;
