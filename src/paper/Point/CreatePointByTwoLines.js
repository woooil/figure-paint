import { useState } from "react";

import { TYPE } from "../../Figure/Figure";
import Point from "../../Figure/Point";
import SelectFigure from "../Hinter/SelectFigure";

function CreatePointByTwoLines() {
  const [line, setLine] = useState(undefined);
  const generator = (_, id) => {
    return Point.byIntsec(line, id);
  };

  return !line ? (
    <SelectFigure type={TYPE.Line} setId={setLine} />
  ) : (
    <SelectFigure
      type={TYPE.Line}
      exclude={[line]}
      withCreate={{ generator, determinants: [[line, setLine]] }}
    />
  );
}

export default CreatePointByTwoLines;
