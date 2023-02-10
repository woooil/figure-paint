import Coord from "./Coord";

function getCoordDivided(fstCoord, sndCoord, ratio) {
  const compRatio = 1 - ratio;
  const coord = new Coord(
    ratio * sndCoord.x + compRatio * fstCoord.x,
    ratio * sndCoord.y + compRatio * fstCoord.y
  );

  return coord;
}

export default getCoordDivided;
