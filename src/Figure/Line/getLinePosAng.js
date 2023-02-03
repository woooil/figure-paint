import { BY } from "./Line";
import getPointCoord from "../Point/getPointCoord";

function getLinePosAng(figures, id, len) {
  const line = figures.find((f) => f.id === id);
  var val = { pos: undefined, angle: undefined };
  switch (line.def.by) {
    case BY.TwoPnts:
      const fstPos = getPointCoord(figures, line.def.fst);
      const sndPos = getPointCoord(figures, line.def.snd);
      val.angle =
        (Math.atan((sndPos.y - fstPos.y) / (sndPos.x - fstPos.x)) * 180) /
        Math.PI;
      val.pos = {
        x: (fstPos.x + sndPos.x - len) / 2,
        y: (fstPos.y + sndPos.y) / 2,
      };
      break;
    default:
      break;
  }
  return val;
}

export default getLinePosAng;
