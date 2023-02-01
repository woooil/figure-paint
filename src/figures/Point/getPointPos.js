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
      const refId = point.def.refPoint;
      const counterId = point.def.counterPoint;
      const refPoint = figures.find((f) => f.id === refId);
      const counterPoint = figures.find((f) => f.id === counterId);
      const refPos = { x: refPoint.def.x, y: refPoint.def.y };
      const counterPos = { x: counterPoint.def.x, y: counterPoint.def.y };
      pos = rotatePos(refPos, counterPos, point.def.angle);
      break;
    default:
      break;
  }

  return pos;
}

export default getPointPos;
