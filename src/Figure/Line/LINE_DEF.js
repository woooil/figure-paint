/**
 * Definitions of lines.
 *
 * @name twoPnts
 * Sets two points which the line passes through.
 * @property {ID} fst - the id of one of the points.
 * @property {ID} snd - the id of another point.
 *
 * @name parLnToPnt
 * Move an existing line parallel over another point.
 * @property {ID} refLine - the id of line to move.
 * @property {ID} point   - the id of point which a new line passes through.
 *
 */
const LINE_DEF = {
  twoPnts: "twoPnts",
  parLnToPnt: "parLnToPnt",
};
Object.freeze(LINE_DEF);

export default LINE_DEF;
