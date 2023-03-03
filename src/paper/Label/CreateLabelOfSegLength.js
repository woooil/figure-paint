import { useState } from "react";

import { TYPE } from "../../Figure/Figure";
import Label from "../../Figure/Label";
import SelectFigure from "../Hinter/SelectFigure";

function CreateLabelOfSegLength() {
  const [text, setText] = useState("");
  const generator = (_, id) => {
    return Label.bySegLength(id, text);
  };

  return (
    <>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <SelectFigure type={TYPE.Segment} withCreate={{ generator }} />
    </>
  );
}

export default CreateLabelOfSegLength;
