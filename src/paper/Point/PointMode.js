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
export { MODE as POINT_MODE };

function PointMode({ mode }) {
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

export default PointMode;
