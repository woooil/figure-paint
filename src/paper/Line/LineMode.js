import CreateLineByClkTwoPnts from "./CreateLineByClkTwoPnts";

const MODE = {
  createLineByClkTwoPnts: "Click two points which a line passes through",
};
Object.freeze(MODE);
export { MODE as LINE_MODE };

function LineMode({ mode }) {
  switch (mode) {
    case MODE.createLineByClkTwoPnts:
      return <CreateLineByClkTwoPnts />;
    default:
      return <div></div>;
  }
}

export default LineMode;
