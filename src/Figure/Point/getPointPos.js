import POINT_DEF from "./POINT_DEF";
import rotatePos from "./rotatePos";

function getPointPos(figures, id) {
  const point = figures.find((f) => f.id === id);

  var pos = { x: 0, y: 0 };
  switch (point.def.by) {
    case POINT_DEF.absPos:
      pos.x = point.def.x;
      pos.y = point.def.y;
      break;
    case POINT_DEF.rotPnt:
      const refPos = getPointPos(figures, point.def.refPoint);
      const counterPos = getPointPos(figures, point.def.counterPoint);
      pos = rotatePos(refPos, counterPos, point.def.angle);
      break;
    default:
      break;
  }

  return pos;
}

export default getPointPos;
