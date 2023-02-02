import LINE_DEF from "./LINE_DEF";
import getPointPos from "../Point/getPointPos";

function getLinePosAng(figures, id, len) {
  const line = figures.find((f) => f.id === id);
  var val = { pos: undefined, angle: undefined };
  switch (line.def.by) {
    case LINE_DEF.twoPnts:
      const fstPos = getPointPos(figures, line.def.fst);
      const sndPos = getPointPos(figures, line.def.snd);
      val.angle =
        (Math.atan((sndPos.y - fstPos.y) / (sndPos.x - fstPos.x)) * 180) /
        Math.PI;
      val.pos = {
        x: (fstPos.x + sndPos.x - len) / 2,
        y: (fstPos.y + sndPos.y) / 2,
      };
      break;
    case LINE_DEF.parLnToPnt:
      break;
    default:
      break;
  }
  return val;
}

export default getLinePosAng;
