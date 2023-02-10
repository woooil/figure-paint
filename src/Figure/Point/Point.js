import { TYPE } from "../Figure";
import Figure from "../Figure";
import getNextName from "./getNextName";

const BY = {
  AbsCoord: "AbsCoord",
  RotPnt: "RotPnt",
  OnSeg: "OnSeg",
  Intsec: "Intsec",
};
Object.freeze(BY);

class Point extends Figure {
  constructor(by, props) {
    super(TYPE.Point, by, props, { name: getNextName() });
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
}

export default Point;

export { BY };
