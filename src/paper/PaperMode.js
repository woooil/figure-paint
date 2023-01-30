import { useState } from "react";

import ClickToCreatePoint from "./ClickToCreatePoint";
import ClickToCreateSegment from "./ClickToCreateSegment";

const MODE = {
  ClickToCreatePoint: "Click to create new point",
  ClickToCreateSegment: "Click to create new segement",
};
Object.freeze(MODE);

function ModeComponent(mode) {
  switch (mode) {
    case MODE.ClickToCreatePoint:
      return <ClickToCreatePoint />;
    case MODE.ClickToCreateSegment:
      return <ClickToCreateSegment />;
    default:
      return <div></div>;
  }
}

function PaperMode() {
  const [mode, setMode] = useState(MODE.ClickToCreatePoint);

  const toggleMode = () => {
    if (mode === MODE.ClickToCreatePoint) {
      setMode(MODE.ClickToCreateSegment);
    } else {
      setMode(MODE.ClickToCreatePoint);
    }
  };

  return (
    <div>
      <h2>Current Mode: {mode}</h2>
      <button onClick={toggleMode}>Toggle mode</button>
      {ModeComponent(mode)}
    </div>
  );
}

export default PaperMode;
