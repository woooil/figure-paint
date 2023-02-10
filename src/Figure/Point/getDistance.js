function getDistance(fstCoord, sndCoord) {
  const distance = Math.sqrt(
    (fstCoord.x - sndCoord.x) ** 2 + (fstCoord.y - sndCoord.y) ** 2
  );
  return distance;
}

export default getDistance;
