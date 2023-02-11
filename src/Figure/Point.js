import { TYPE } from "./Figure";
import Figure from "./Figure";
import Coord from "../Math/Coord";

const BY = {
  AbsCoord: "AbsCoord",
  RotPnt: "RotPnt",
  OnSeg: "OnSeg",
  Intsec: "Intsec",
};
Object.freeze(BY);

class Point extends Figure {
  constructor(by, props) {
    super(TYPE.Point, by, props, { name: Point.nextName() });
  }

  static byAbsCoord(x, y) {
    const props = { x, y };
    return new Point(BY.AbsCoord, props);
  }

  static byRotPnt(counterPoint, refPoint, angle) {
    const props = { counterPoint, refPoint, angle };
    return new Point(BY.RotPnt, props);
  }

  static byOnSeg(segment, ratio) {
    const props = { segment, ratio };
    return new Point(BY.OnSeg, props);
  }

  static byIntsec(fstLine, sndLine) {
    const props = { fstLine, sndLine };
    return new Point(BY.Intsec, props);
  }

  static #nextName = "A";
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

  get draw() {
    const pos = this.figures.fig(this.id).coord;
    return (
      <circle cx={pos.x} cy={pos.y} r="3" fill="black" {...this.commonProps} />
    );
  }

  get coord() {
    var pos = {};
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
