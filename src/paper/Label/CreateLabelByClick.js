import { TYPE } from "../../Figure/Figure";
import Label from "../../Figure/Label";
import SelectFigure from "../Hinter/SelectFigure";

function CreateLabelByClick() {
  const generator = (_, id) => {
    return Label.byPointName(id, 0, -10);
  };

  return <SelectFigure type={TYPE.Point} withCreate={{ generator }} />;
}

export default CreateLabelByClick;
