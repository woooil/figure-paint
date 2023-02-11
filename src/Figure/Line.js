import { TYPE } from "./Figure";
import Figure from "./Figure";
import LinearEq from "../Math/LinearEq";
import Segment from "./Segment";

/**
 * The definition method of a Line.
 * @readonly
 * @enum {DefBy}
 */
const BY = {
  /** @type {DefBy} By two Points a Line passes through. */
  TwoPnts: "TwoPnts",
  /** @type {DefBy} By translating another Line parallel. */
  ParLn: "ParLn",
};
Object.freeze(BY);

/**
 * Class representing a line figure.
 * @extends Figure
 */
class Line extends Figure {
  /**
   * Create a Line.
   * @param {DefBy}   by    - The definition method of a Line.
   * @param {Object}  props - The properties for the definition of a Line.
   */
  constructor(by, props) {
    super(TYPE.Line, by, props);
  }

  /**
   * Create a Line by two Points it passes through.
   * @param   {Id} fst - The Id of the first Point.
   * @param   {Id} snd - The Id of the second Point.
   * @returns {Line}     The Line.
   */
  static byTwoPnts(fst, snd) {
    const props = { fst, snd };
    return new Line(BY.TwoPnts, props);
  }

  /**
   * Create a Line by translate another Line parallel.
   * @param {Id} refLine  - The Id of the Line to translate.
   * @param {Id} point    - The Id of the Point a Line passes thorugh.
   * @returns {Line}        The Line.
   */
  static byParLn(refLine, point) {
    const props = { refLine, point };
    return new Line(BY.ParLn, props);
  }

  /**
   *  The actual React component drawing the Line.
   *  @type {React.SVGProps<SVGRectElement>}
   */
  get draw() {
    const linearEq = this.linearEq;
    const coords = linearEq.intersectionWithCanvas();

    return (
      <rect {...Segment.attr(coords[0], coords[1])} {...this.commonProps} />
    );
  }

  /**
   * The linear equation of the Line.
   * @type {LinearEq}
   */
  get linearEq() {
    var co = { a: 0, b: 0, c: 0 };
    switch (this.def.by) {
      case BY.TwoPnts:
        const fst = this.figures.fig(this.def.fst).coord;
        const snd = this.figures.fig(this.def.snd).coord;
        if (fst.x === snd.x) {
          co.a = 1;
          co.b = 0;
          co.c = -fst.x;
        } else {
          co.a = (snd.y - fst.y) / (fst.x - snd.x);
          co.b = 1;
          co.c = (snd.x * fst.y - fst.x * snd.y) / (fst.x - snd.x);
        }
        break;
      case BY.ParLn:
        const refLine = this.figures.fig(this.def.refLine).linearEq;
        const point = this.figures.fig(this.def.point).coord;
        if (refLine.b === 0) {
          co.a = 1;
          co.b = 0;
          co.c = -point.x;
        } else {
          co.a = refLine.a;
          co.b = 1;
          co.c = -refLine.a * point.x - point.y;
        }
        break;
      default:
        break;
    }
    return new LinearEq(co.a, co.b, co.c);
  }
}

export default Line;
export { BY };
