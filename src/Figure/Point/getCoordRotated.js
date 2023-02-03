import Coord from "./Coord";

// reference: https://gist.github.com/LukeChannings/5b3e0c6fd35e4ad6b47c
function getCoordRotated(refPos, counterPos, angle) {
  const angleAsRad = (angle * Math.PI) / 180;
  const coord = new Coord(
    Math.cos(angleAsRad) * (counterPos.x - refPos.x) -
      Math.sin(angleAsRad) * (counterPos.y - refPos.y) +
      refPos.x,
    Math.sin(angleAsRad) * (counterPos.x - refPos.x) +
      Math.cos(angleAsRad) * (counterPos.y - refPos.y) +
      refPos.y
  );
  return coord;
}

export default getCoordRotated;
