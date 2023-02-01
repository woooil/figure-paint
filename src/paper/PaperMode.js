import { useState } from "react";

import CreatePointByClick from "./CreatePointByClick";
import CreatePointByRotPnt from "./CreatePointByRotPnt";
import MovePointByClick from "./MovePointByClick";

import CreateSegByClkEndpnts from "./CreateSegByClkEndpnts";

import CreateLabelByClick from "./CreateLabelByClick";

const MODE = {
  createPointByClick: "Click where to create new point",
  createPointByRotPnt:
    "Enter a rotating angle, and click a point to rotate and then a reference point",
  movePointByClick: "Click a point to move and then click where to move",

  createSegByClkEndpnts: "Click two endpoints to create new segement",

  CreateLabelByClick: "Enter a label text, and click a point to label",
};
Object.freeze(MODE);

function ModeComponent(mode) {
  switch (mode) {
    case MODE.createPointByClick:
      return <CreatePointByClick />;
    case MODE.createPointByRotPnt:
      return <CreatePointByRotPnt />;
    case MODE.movePointByClick:
      return <MovePointByClick />;

    case MODE.createSegByClkEndpnts:
      return <CreateSegByClkEndpnts />;

    case MODE.CreateLabelByClick:
      return <CreateLabelByClick />;

    default:
      return <div></div>;
  }
}

function PaperMode() {
  const modes = Object.values(MODE);
  const [mode, setMode] = useState(modes[0]);

  const handleSelect = (e) => {
    setMode(e.target.value);
  };

  return (
    <div>
      <h2>Current Mode: {mode}</h2>
      <select onChange={handleSelect} value={mode}>
        {modes.map((item) => (
          <option value={item} key={item}>
            {item}
          </option>
        ))}
      </select>
      {ModeComponent(mode)}
    </div>
  );
}

export default PaperMode;
