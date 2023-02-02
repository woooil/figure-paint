/**
 * Definitions of points.
 *
 * @name absPos
 * Sets the point's absolute position.
 * @property {number} x - the x value of the absolute position.
 * @property {number} y - the y value of the absolute position.
 *
 * @name rotPnt
 * Rotate an existing point with respect to reference point by the given angle.
 * @property {ID}       counterPoint  - the id of the point to be rotated.
 * @property {ID}       refPoint      - the id of the point to be referenced.
 * @property {nunmber}  angle         - the angle to rotate in degree.
 *
 */
const POINT_DEF = {
  absPos: "absPos",
  rotPnt: "rotPnt",
};
Object.freeze(POINT_DEF);

export default POINT_DEF;
