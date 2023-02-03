import { TYPE } from "../Figure";
import Figure from "../Figure";

const BY = {
  TwoPnts: "TwoPnts",
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
}

export default Line;

export { BY };
