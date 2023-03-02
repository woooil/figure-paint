import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { create, update, remove, setDep } from "../../Figure/figureSlice";
import { TYPE } from "../../Figure/Figure";
import Label from "../../Figure/Label";
import clickJudge from "../clickJudge";

function CreateLabelByClick() {
  const dispatch = useDispatch();

  // Id of host Point and Label; undeinfed if not exists
  var ids = [undefined, undefined];
  // Call when mouse is moved; update Label
  const updateLabel = (event) => {
    const id = clickJudge(event, TYPE.Point);
    // If mouse is on Point, set the Point
    if (id && id !== ids[0]) {
      ids[0] = id;
      const label = Label.byPointName(ids[0], 0, -10);
      ids[1] = label.id;
      dispatch(create(label));
      dispatch(setDep({ determinant: ids[0], dependant: ids[1] }));
      dispatch(update({ id: ids[1], with: { isHint: true } }));
      dispatch(update({ id: ids[0], with: { isHint: true } }));
    }
    // Else if mouse gets out of Point, lift the Point
    else if (ids[0] && !id) {
      dispatch(update({ id: ids[0], with: { isHint: false } }));
      dispatch(remove(ids[1]));
      ids = [undefined, undefined];
    }
  };
  // Call when mouse is clicked; settle Label
  const settleLabel = () => {
    if (ids[0]) {
      dispatch(update({ id: ids[0], with: { isHint: false } }));
      dispatch(update({ id: ids[1], with: { isHint: false } }));
      ids = [undefined, undefined];
    }
  };

  useEffect(() => {
    const handleMouseMove = (event) => {
      updateLabel(event);
    };
    const handleMouseClick = () => {
      settleLabel();
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
