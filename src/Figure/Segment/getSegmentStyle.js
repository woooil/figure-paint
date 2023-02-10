import getPointCoord from "../Point/getPointCoord";
import getLineStyleHelper from "../Line/getLineStyleHelper";

function getSegmentStyle(figures, id) {
  const segment = figures.find((f) => f.id === id);
  const fstCoord = getPointCoord(figures, segment.def.fst);
  const sndCoord = getPointCoord(figures, segment.def.snd);

  return getLineStyleHelper(fstCoord, sndCoord);
}

export default getSegmentStyle;
