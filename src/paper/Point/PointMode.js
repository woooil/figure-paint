import { useState } from "react";

import CreatePointByClick from "./CreatePointByClick";
import CreatePointByRotPnt from "./CreatePointByRotPnt";
import MovePointByClick from "./MovePointByClick";

const MODE = {
  createPointByClick: "Click where to create new point",
  createPointByRotPnt:
    "Enter a rotating angle, and click a point to rotate and then a reference point",
  movePointByClick: "Click a point to move and then click where to move",
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
    default:
      return <div></div>;
  }
}

function PointMode() {
  const modes = Object.values(MODE);
  const [mode, setMode] = useState(modes[0]);

  const handleSelect = (e) => {
    setMode(e.target.value);
  };

  return (
    <div>
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

export default PointMode;
