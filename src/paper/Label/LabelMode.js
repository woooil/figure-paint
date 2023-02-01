import { useState } from "react";

import CreateLabelByClick from "./CreateLabelByClick";

const MODE = {
  CreateLabelByClick: "Enter a label text, and click a point to label",
};
Object.freeze(MODE);

function ModeComponent(mode) {
  switch (mode) {
    case MODE.CreateLabelByClick:
      return <CreateLabelByClick />;

    default:
      return <div></div>;
  }
}

function LabelMode() {
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

export default LabelMode;
