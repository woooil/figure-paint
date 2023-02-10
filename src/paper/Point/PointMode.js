import CreatePointByClick from "./CreatePointByClick";
import CreatePointByRotPnt from "./CreatePointByRotPnt";
import CreatePointOnSeg from "./CreatePointOnSeg";
import CreatePointByTwoLines from "./CreatePointByTwoLines";
import MovePointByClick from "./MovePointByClick";
import RemovePointByClick from "./RemovePointByClick";

const MODE = {
  createPointByClick: "Click where to create new point",
  createPointByRotPnt:
    "Enter a rotating angle, and click a point to rotate and then a reference point",
  createPointOnSeg: "Click anywhere on an existing segment to create a point",
  createPointByTwoLines:
    "Click two lines which make an intersection as a new point",
  movePointByClick: "Click a point to move and then click where to move",
  removePointByClick: "Click a point to remove",
};
Object.freeze(MODE);
export { MODE as POINT_MODE };

function PointMode({ mode }) {
  switch (mode) {
    case MODE.createPointByClick:
      return <CreatePointByClick />;
    case MODE.createPointByRotPnt:
      return <CreatePointByRotPnt />;
    case MODE.createPointOnSeg:
      return <CreatePointOnSeg />;
    case MODE.createPointByTwoLines:
      return <CreatePointByTwoLines />;
    case MODE.movePointByClick:
      return <MovePointByClick />;
    case MODE.removePointByClick:
      return <RemovePointByClick />;
    default:
      return <div></div>;
  }
}

export default PointMode;
