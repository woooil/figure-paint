import { BY } from "./Point";
import Coord from "./Coord";
import getCoordRotated from "./getCoordRotated";
import getCoordDivided from "./getCoordDivided";
import getLinearEq from "../Line/getLinearEq";
import getIntersection from "../Line/getIntersection";

function getPointCoord(figures, id) {
  const point = figures.find((f) => f.id === id);
  var pos = {};
  switch (point.def.by) {
    case BY.AbsCoord:
      pos = new Coord(point.def.x, point.def.y);
      break;
    case BY.RotPnt:
      const refPos = getPointCoord(figures, point.def.refPoint);
      const counterPos = getPointCoord(figures, point.def.counterPoint);
      pos = getCoordRotated(refPos, counterPos, point.def.angle);
      break;
    case BY.OnSeg:
      const segment = figures.find((f) => f.id === point.def.segment);
      const fstCoord = getPointCoord(figures, segment.def.fst);
      const sndCoord = getPointCoord(figures, segment.def.snd);
      pos = getCoordDivided(fstCoord, sndCoord, point.def.ratio);
      break;
    case BY.Intsec:
      const fstEq = getLinearEq(figures, point.def.fstLine);
      const sndEq = getLinearEq(figures, point.def.sndLine);
      pos = getIntersection(fstEq, sndEq);
      break;
    default:
      break;
  }

  return pos;
}

export default getPointCoord;
