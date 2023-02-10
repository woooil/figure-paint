import getDistance from "../Point/getDistance";

function getLineAttr(fstCoord, sndCoord) {
  const lineWidth = 2;
  const len = getDistance(fstCoord, sndCoord);
  const angle =
    (Math.atan2(sndCoord.y - fstCoord.y, sndCoord.x - fstCoord.x) * 180) /
    Math.PI;
  return {
    x: fstCoord.x,
    y: fstCoord.y - lineWidth / 2,
    width: len,
    height: lineWidth,
    transform: `rotate(${angle}, ${fstCoord.x}, ${fstCoord.y})`,
  };
}

export default getLineAttr;
