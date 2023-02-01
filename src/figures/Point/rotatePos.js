// reference: https://gist.github.com/LukeChannings/5b3e0c6fd35e4ad6b47c

function rotatePos(refPos, counterPos, angle) {
  const angleAsRad = (angle * Math.PI) / 180;
  const pos = {
    x:
      Math.cos(angleAsRad) * (counterPos.x - refPos.x) -
      Math.sin(angleAsRad) * (counterPos.y - refPos.y) +
      refPos.x,
    y:
      Math.sin(angleAsRad) * (counterPos.x - refPos.x) +
      Math.cos(angleAsRad) * (counterPos.y - refPos.y) +
      refPos.y,
  };
  return pos;
}

export default rotatePos;
