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
   * @param   {number}  angle     - The angle by which the Coord is rotated.
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
}

export default Coord;
