import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { create, setDep } from "../../Figure/figureSlice";
import { TYPE } from "../../Figure/Figure";
import Label from "../../Figure/Label";
import clickJudge from "../clickJudge";

function CreateLabelOfSegLength() {
  const figures = useSelector((state) => state.figures.value);
  const dispatch = useDispatch();

  const [text, setText] = useState("");

  useEffect(() => {
    const handleMouseClick = (event) => {
      const element = clickJudge(figures, event, TYPE.Segment);
      if (element !== undefined) {
        const figure = Label.bySegLength(element, text);
        dispatch(create(figure));
        dispatch(setDep({ determinant: element, dependant: figure.id }));
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

export default CreateLabelOfSegLength;
