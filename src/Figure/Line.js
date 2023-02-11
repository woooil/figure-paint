import { TYPE } from "./Figure";
import Figure from "./Figure";
import LinearEq from "../Math/LinearEq";

const BY = {
  TwoPnts: "TwoPnts",
  ParLn: "ParLn",
};
Object.freeze(BY);

class Line extends Figure {
  constructor(by, props) {
    super(TYPE.Line, by, props);
  }

  static byTwoPnts(fst, snd) {
    const props = { fst, snd };
    return new Line(BY.TwoPnts, props);
  }

  static byParLn(refLine, point) {
    const props = { refLine, point };
    return new Line(BY.ParLn, props);
  }

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

  get draw() {
    const linearEq = this.figures.fig(this.id).linearEq;
    const coords = linearEq.intersectionWithCanvas();

    return <rect {...Line.attr(coords[0], coords[1])} {...this.commonProps} />;
  }

  get linearEq() {
    const line = this.figures.fig(this.id);
    var co = { a: 0, b: 0, c: 0 };
    switch (line.def.by) {
      case BY.TwoPnts:
        const fst = this.figures.fig(line.def.fst).coord;
        const snd = this.figures.fig(line.def.snd).coord;
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
        const refLine = this.figures.fig(line.def.refLine).linearEq;
        const point = this.figures.fig(line.def.point).coord;
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
