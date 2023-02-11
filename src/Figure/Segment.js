import { TYPE } from "./Figure";
import Figure from "./Figure";

/**
 * The definition method of a Segment.
 * @readonly
 * @enum {DefBy}
 */
const BY = {
  /** @type {DefBy} By two endpoints. */
  Endpnts: "Endpnts",
};
Object.freeze(BY);

/**
 * Class representing a segemnt figure.
 * @extends Figure
 */
class Segment extends Figure {
  /**
   * Create a Segment.
   * @param {DefBy}   by    - The definition method of a Segment.
   * @param {Object}  props - The properties for the definition of a Segment.
   */
  constructor(by, props) {
    super(TYPE.Segment, by, props);
  }

  /**
   * Create a Segment by two endpoints.
   * @param {Id} fst - The Id of the first Point.
   * @param {Id} snd - The Id of the second Point.
   */
  static byEndpnts(fst, snd) {
    const props = { fst, snd };
    return new Segment(BY.Endpnts, props);
  }

  /**
   * Get the attributes of the Segment whose endpoints are given.
   * @param {Coord} fstCoord  - The Coord of the first endpoint.
   * @param {Coord} sndCoord  - The Coord of the second endpoint.
   * @returns {Object}          The attributes.
   */
  static attr(fstCoord, sndCoord) {
    const lineWidth = 2;
    const len = fstCoord.distanceFrom(sndCoord);
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

  /**
   *  The actual React component drawing the Segment.
   *  @type {React.SVGProps<SVGRectElement>}
   */
  get draw() {
    const fstCoord = this.figures.fig(this.def.fst).coord;
    const sndCoord = this.figures.fig(this.def.snd).coord;
    return <rect {...Segment.attr(fstCoord, sndCoord)} {...this.commonProps} />;
  }

  /**
   * The length of the Segment.
   * @type {number}
   */
  get length() {
    const segment = this.figures.fig(this.id);
    const fstCoord = this.figures.fig(segment.def.fst).coord;
    const sndCoord = this.figures.fig(segment.def.snd).coord;
    return fstCoord.distanceFrom(sndCoord);
  }
}

export default Segment;

export { BY };
