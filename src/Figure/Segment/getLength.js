import getPointCoord from "../Point/getPointCoord";
import getDistance from "../Point/getDistance";

function getLength(figures, id) {
  const segment = figures.find((f) => f.id === id);
  const fstCoord = getPointCoord(figures, segment.def.fst);
  const sndCoord = getPointCoord(figures, segment.def.snd);
  return getDistance(fstCoord, sndCoord);
}

export default getLength;
