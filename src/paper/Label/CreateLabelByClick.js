import { useState } from "react";
import { TYPE } from "../../Figure/Figure";
import Label from "../../Figure/Label";
import SelectFigure from "../Hinter/SelectFigure";

function CreateLabelByClick() {
  const setPoint = useState(undefined)[1];

  const generator = (id) => {
    return Label.byPointName(id, 0, -10);
  };

  return (
    <SelectFigure
      type={TYPE.Point}
      setId={setPoint}
      withCreate={{ generator }}
    />
  );
}

export default CreateLabelByClick;
