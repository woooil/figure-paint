import { BY } from "./Line";
import LinearEq from "./LinearEq";
import getPointCoord from "../Point/getPointCoord";

/**
 * Calculate linear equation of line
 *
 * The equations is as the following form:
 *     [[ ax + by + c = 0 where b = 1 XOR (b = 0 AND a = 1) ]]
 * Note that b only has the value 0 or 1.
 *
 * @returns {LinearEq} linearEq - The linear equation of the line.
 *
 */
function getLinearEq(figures, id) {
  const line = figures.find((f) => f.id === id);
  var co = { a: 0, b: 0, c: 0 };
  switch (line.def.by) {
    case BY.TwoPnts:
      const fst = getPointCoord(figures, line.def.fst);
      const snd = getPointCoord(figures, line.def.snd);
      if (fst.x === snd.x) {
        co.a = 1;
        co.b = 0;
        co.c = -fst.x;
      } else {
        co.a = (snd.y - fst.y) / (fst.x - snd.x);
        co.b = 1;
        co.c = (snd.x * fst.y - fst.x * snd.y) / (fst.x - snd.x);
      }
      break;
    case BY.ParLn:
      const refLine = getLinearEq(figures, line.def.refLine);
      const point = getPointCoord(figures, line.def.point);
      if (refLine.b === 0) {
        co.a = 1;
        co.b = 0;
        co.c = -point.x;
      } else {
        co.a = refLine.a;
        co.b = 1;
        co.c = -refLine.a * point.x - point.y;
      }
      break;
    default:
      break;
  }
  return new LinearEq(co.a, co.b, co.c);
}

export default getLinearEq;
