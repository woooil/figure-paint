import { BY } from "./Point";
import getCoordRotated from "./getCoordRotated";
import Coord from "./Coord";

function getPointCoord(figures, id) {
  const point = figures.find((f) => f.id === id);
  var pos = { x: 0, y: 0 };
  switch (point.def.by) {
    case BY.AbsCoord:
      pos.x = point.def.x;
      pos.y = point.def.y;
      break;
    case BY.RotPnt:
      const refPos = getPointCoord(figures, point.def.refPoint);
      const counterPos = getPointCoord(figures, point.def.counterPoint);
      pos = getCoordRotated(refPos, counterPos, point.def.angle);
      break;
    default:
      break;
  }

  return new Coord(pos.x, pos.y);
}

export default getPointCoord;
