import CreateLineByClkTwoPnts from "./CreateLineByClkTwoPnts";
import CreateLineByClkLine from "./CreateLineByClkLine";
import HideLineByClick from "./HideLineByClick";

const MODE = {
  createLineByClkTwoPnts: "Click two points which a line passes through",
  createLineByClkLine:
    "Click an existing line to which a line is parallel and click an existing point which a line passes thorugh",
  hideLineByClick: "Click an existing line to hide",
};
Object.freeze(MODE);
export { MODE as LINE_MODE };

function LineMode({ mode }) {
  switch (mode) {
    case MODE.createLineByClkTwoPnts:
      return <CreateLineByClkTwoPnts />;
    case MODE.createLineByClkLine:
      return <CreateLineByClkLine />;
    case MODE.hideLineByClick:
      return <HideLineByClick />;
    default:
      return <div></div>;
  }
}

export default LineMode;
