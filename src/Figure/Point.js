import { TYPE } from "./Figure";
import Figure from "./Figure";
import Coord from "../Math/Coord";

/**
 * The definition method of a Point.
 * @readonly
 * @enum {DefBy}
 */
const BY = {
  /** @type {DefBy} By an absolute coordinate. */
  AbsCoord: "AbsCoord",
  /** @type {DefBy} By rotating another Point. */
  RotPnt: "RotPnt",
  /** @type {DefBy} By locating on a Segment. */
  OnSeg: "OnSeg",
  /** @type {DefBy} By intersecting two Lines. */
  Intsec: "Intsec",
};
Object.freeze(BY);

/**
 * Class representing a point figure.
 * @extends Figure
 */
class Point extends Figure {
  /**
   * Create a Point.
   * @param {DefBy}   by    - The definition method of a Point.
   * @param {Object}  props - The properties for the definition of a Point.
   * @param {Object}  [encodedObj={}] - The encoded object to decode and directly assign to a Point. It has the highest priority.
   */
  constructor(by, props, encodedObj = {}) {
    super(TYPE.Point, by, props, encodedObj);
    this.pointName = encodedObj.pointName || Point.nextName();
  }

  /**
   * Create a Point by an absolute coordinate.
   * @param   {number} x  - The x value.
   * @param   {number} y  - The y value.
   * @returns {Point}       The Point.
   */
  static byAbsCoord(x, y) {
    const props = { x, y };
    return new Point(BY.AbsCoord, props);
  }

  /**
   * Create a Point by rotating another Point.
   * @param   {Id}      counterPoint  - The Id of the Point to rotate.
   * @param   {Id}      refPoint      - The Id of the reference Point for the rotation.
   * @param   {number}  angle         - The angle by which a Point is rotated.
   * @returns {Point}                   The Point.
   */
  static byRotPnt(counterPoint, refPoint, angle) {
    const props = { counterPoint, refPoint, angle };
    return new Point(BY.RotPnt, props);
  }

  /**
   * Create a Point by locating on a Segment.
   * @param   {Id}      segment - The Id of the Segment on which a Point is.
   * @param   {number}  ratio   - The ratio by which a Point divide the Segment.
   * @returns {Point}             The Point.
   */
  static byOnSeg(segment, ratio) {
    const props = { segment, ratio };
    return new Point(BY.OnSeg, props);
  }

  /**
   * Create a Point by intersecting two Lines.
   * @param   {Id} fstLine - The Id of the first Line.
   * @param   {Id} sndLine - The Id of the second Line.
   * @returns {Point}        The Point.
   */
  static byIntsec(fstLine, sndLine) {
    const props = { fstLine, sndLine };
    return new Point(BY.Intsec, props);
  }

  static #nextName = "A";
  /**
   * Get the next name for a Point.
   * @returns {string} The name of a Point.
   */
  static nextName() {
    const result = Point.#nextName;
    if (Point.#nextName.at(-1) !== "Z") {
      Point.#nextName =
        Point.#nextName.slice(0, -1) +
        String.fromCharCode(Point.#nextName.at(-1).charCodeAt(0) + 1);
    } else {
      Point.#nextName = Point.#nextName.slice(0, -1) + "AA";
    }
    return result;
  }

  /**
   *  The actual React component drawing the Point.
   *  @type {React.SVGProps<SVGCircleElement>}
   */
  get draw() {
    const pos = this.coord;
    return (
      <circle cx={pos.x} cy={pos.y} r="3" fill="black" {...this.commonProps} />
    );
  }

  /**
   * The human-readable name of the Point.
   * @type {string}
   */
  get name() {
    return this.pointName;
  }

  /**
   * The description of the Point's definition.
   * @type {{name: string, definition: string}}
   */
  get description() {
    const prefix = "A point";
    const round = (x, precision = 0) => {
      const multiplier = Math.pow(10, precision);
      return Math.round(x * multiplier) / multiplier;
    };
    let definition = "";
    switch (this.def.by) {
      case BY.AbsCoord:
        definition = `${prefix} at (${round(this.def.x)}, ${round(
          this.def.y
        )}).`;
        break;
      case BY.RotPnt:
        const counterPoint = this.figures.fig(this.def.counterPoint).name;
        const refPoint = this.figures.fig(this.def.refPoint).name;
        definition = `${prefix} where point ${counterPoint} is rotated by ${this.def.angle}° around point ${refPoint}.`;
        break;
      case BY.OnSeg:
        const segment = this.figures.fig(this.def.segment).name;
        definition = `${prefix} that divides segment ${segment} into a ratio of ${round(
          this.def.ratio,
          2
        )}.`;
        break;
      case BY.Intsec:
        const fst = this.figures.fig(this.def.fstLine).name;
        const snd = this.figures.fig(this.def.sndLine).name;
        definition = `${prefix} of intersection of two lines ${fst} and ${snd}.`;
        break;
      default:
        break;
    }

    return definition;
  }

  /**
   * The Coord of the Point.
   * @type {Coord}
   */
  get coord() {
    let pos = {};
    switch (this.def.by) {
      case BY.AbsCoord:
        pos = new Coord(this.def.x, this.def.y);
        break;
      case BY.RotPnt:
        const refPos = this.figures.fig(this.def.refPoint).coord;
        const counterPos = this.figures.fig(this.def.counterPoint).coord;
        pos = counterPos.rotateAbout(refPos, this.def.angle);
        break;
      case BY.OnSeg:
        const segment = this.figures.fig(this.def.segment);
        const fstCoord = this.figures.fig(segment.def.fst).coord;
        const sndCoord = this.figures.fig(segment.def.snd).coord;
        pos = fstCoord.divideWith(sndCoord, this.def.ratio);
        break;
      case BY.Intsec:
        const fstEq = this.figures.fig(this.def.fstLine).linearEq;
        const sndEq = this.figures.fig(this.def.sndLine).linearEq;
        pos = fstEq.intersectionWith(sndEq);
        break;
      default:
        break;
    }

    return pos;
  }
}

export default Point;
export { BY };
