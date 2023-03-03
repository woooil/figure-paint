import { useState } from "react";
import { TYPE } from "../../Figure/Figure";
import Line from "../../Figure/Line";
import SelectFigure from "../Hinter/SelectFigure";

function CreateLineByClkLine() {
  const [line, setLine] = useState(undefined);
  const generator = (_, id) => {
    return Line.byParLn(line, id);
  };

  return !line ? (
    <SelectFigure type={TYPE.Line} setId={setLine} />
  ) : (
    <SelectFigure
      type={TYPE.Point}
      withCreate={{ generator, determinants: [[line, setLine]] }}
    />
  );
}

export default CreateLineByClkLine;
