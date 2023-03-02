/**  Class of an algebra model expressing a location in a plane. */
class Coord {
  /**
   * Create a coordinate.
   * @param {number} x - The x value.
   * @param {number} y - The y value.
   */
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  /**
   * Get a rotated Coord about the given reference Coord by the given angle.
   * @param   {Coord}   refCoord  - The reference Coord for the roation.
   * @param   {number}  angle     - The angle by which the Coord is rotated in degree.
   * @return  {Coord}               A rotated Coord object.
   * @see {@link https://gist.github.com/LukeChannings/5b3e0c6fd35e4ad6b47c}
   */
  rotateAbout(refCoord, angle) {
    const angleAsRad = (angle * Math.PI) / 180;
    const coord = new Coord(
      Math.cos(angleAsRad) * (this.x - refCoord.x) -
        Math.sin(angleAsRad) * (this.y - refCoord.y) +
        refCoord.x,
      Math.sin(angleAsRad) * (this.x - refCoord.x) +
        Math.cos(angleAsRad) * (this.y - refCoord.y) +
        refCoord.y
    );
    return coord;
  }

  /**
   * Get an internally divided Coord with the given ratio.
   * @param   {Coord}   coord - Another Coord to conduct internal division.
   * @param   {number}  ratio - The ratio of the internal division.
   * @returns {Coord}           A divided Coord object.
   */
  divideWith(coord, ratio) {
    const compRatio = 1 - ratio;
    const divided = new Coord(
      ratio * coord.x + compRatio * this.x,
      ratio * coord.y + compRatio * this.y
    );

    return divided;
  }

  /**
   * Get the distance to the given Coord.
   * @param   {Coord}   coord - The target Coord to calculate the distance to.
   * @returns {number}          The distance.
   */
  distanceFrom(coord) {
    const distance = Math.sqrt(
      (this.x - coord.x) ** 2 + (this.y - coord.y) ** 2
    );
    return distance;
  }

  /**
   * Get a Coord at the given distance from a segment constructed by the given coord and itself.
   * @param   {Coord}   coord     - The Coord to construct a segment with itself.
   * @param   {number}  distance  - The distance at which a Coord is from the segment.
   * @returns {Coord}               The distant Coord.
   */
  atDistance(coord, distance) {
    const mid = new Coord((this.x + coord.x) / 2, (this.y + coord.y) / 2);
    const theta = Math.atan2(coord.y - this.y, coord.x - this.x);
    return new Coord(
      mid.x + distance * Math.sin(theta),
      mid.y - distance * Math.cos(theta)
    );
  }

  /**
   * Get an angle between a and b having itself as the vertex in the range -180 to +180 in degree.
   * @param {Coord} a - The Coord on one side of the angle.
   * @param {Coord} b - The Coord on another side of the angle.
   */
  angleBetween(a, b) {
    const result =
      Math.atan2(b.y - this.y, b.x - this.x) -
      Math.atan2(a.y - this.y, a.x - this.x);
    return (result * 180) / Math.PI;
  }
}

export default Coord;
