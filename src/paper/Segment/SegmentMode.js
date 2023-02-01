import { useState } from "react";

import CreateSegByClkEndpnts from "./CreateSegByClkEndpnts";

const MODE = {
  createSegByClkEndpnts: "Click two endpoints to create new segement",
};
Object.freeze(MODE);

function ModeComponent(mode) {
  switch (mode) {
    case MODE.createSegByClkEndpnts:
      return <CreateSegByClkEndpnts />;
    default:
      return <div></div>;
  }
}

function SegmentMode() {
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

export default SegmentMode;
