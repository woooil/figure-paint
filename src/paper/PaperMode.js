import { useState, useEffect } from "react";

import PointMode, { POINT_MODE } from "./Point/PointMode";
import SegmentMode, { SEGMENT_MODE } from "./Segment/SegmentMode";
import LabelMode, { LABEL_MODE } from "./Label/LabelMode";

const MODE = {
  point: "point",
  segment: "segment",
  label: "label",
};
Object.freeze(MODE);

function ModeComponent(mode, subMode) {
  switch (mode) {
    case MODE.point:
      return <PointMode mode={subMode} />;
    case MODE.segment:
      return <SegmentMode mode={subMode} />;
    case MODE.label:
      return <LabelMode mode={subMode} />;
    default:
      return <div></div>;
  }
}

function getSubModes(mode) {
  var object;
  switch (mode) {
    case MODE.point:
      object = POINT_MODE;
      break;
    case MODE.segment:
      object = SEGMENT_MODE;
      break;
    case MODE.label:
      object = LABEL_MODE;
      break;
    default:
      object = [];
  }
  return Object.values(object);
}

function PaperMode() {
  const modes = Object.values(MODE);
  const [mode, setMode] = useState(modes[0]);

  const [subModes, setSubModes] = useState(getSubModes(mode));
  const [subMode, setSubMode] = useState(subModes[0]);

  const handleSelect = (e) => {
    setMode(e.target.value);
  };

  useEffect(() => {
    setSubModes(getSubModes(mode));
  }, [mode]);
  useEffect(() => {
    setSubMode(subModes[0]);
  }, [subModes]);
  const handleSelectSub = (e) => {
    setSubMode(e.target.value);
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
      <select onChange={handleSelectSub} value={subMode}>
        {subModes.map((item) => (
          <option value={item} key={item}>
            {item}
          </option>
        ))}
      </select>
      {ModeComponent(mode, subMode)}
    </div>
  );
}

export default PaperMode;
