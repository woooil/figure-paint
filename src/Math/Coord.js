/**
 *
 * @property {number} x - The x value
 * @property {number} y - The y value
 *
 */
class Coord {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  // reference: https://gist.github.com/LukeChannings/5b3e0c6fd35e4ad6b47c
  rotateAbout(refPos, angle) {
    const angleAsRad = (angle * Math.PI) / 180;
    const coord = new Coord(
      Math.cos(angleAsRad) * (this.x - refPos.x) -
        Math.sin(angleAsRad) * (this.y - refPos.y) +
        refPos.x,
      Math.sin(angleAsRad) * (this.x - refPos.x) +
        Math.cos(angleAsRad) * (this.y - refPos.y) +
        refPos.y
    );
    return coord;
  }

  divideWith(coord, ratio) {
    const compRatio = 1 - ratio;
    const divided = new Coord(
      ratio * coord.x + compRatio * this.x,
      ratio * coord.y + compRatio * this.y
    );

    return divided;
  }

  distanceFrom(coord) {
    const distance = Math.sqrt(
      (this.x - coord.x) ** 2 + (this.y - coord.y) ** 2
    );
    return distance;
  }
}

export default Coord;
