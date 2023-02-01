import { useState } from "react";

import PointMode from "./Point/PointMode";
import SegmentMode from "./Segment/SegmentMode";
import LabelMode from "./Label/LabelMode";

const MODE = {
  point: "point",
  segment: "segment",
  label: "label",
};
Object.freeze(MODE);

function ModeComponent(mode) {
  switch (mode) {
    case MODE.point:
      return <PointMode />;
    case MODE.segment:
      return <SegmentMode />;
    case MODE.label:
      return <LabelMode />;
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
