import { TYPE } from "../Figure";
import Figure from "../Figure";

import getLinearEq from "./getLinearEq";
import getIntsecsWithCanvas from "./getIntsecsWithCanvas";
import getLineAttr from "./getLineAttr";

const BY = {
  TwoPnts: "TwoPnts",
  ParLn: "ParLn",
};
Object.freeze(BY);

class Line extends Figure {
  constructor(by, props) {
    super(TYPE.Line, by, props);
  }

  draw(figures) {
    const linearEq = getLinearEq(figures, this.id);
    const coords = getIntsecsWithCanvas(linearEq);

    return (
      <rect {...getLineAttr(coords[0], coords[1])} {...this.commonProps} />
    );
  }

  static byTwoPnts(fst, snd) {
    const props = { fst, snd };
    return new Line(BY.TwoPnts, props);
  }

  static byParLn(refLine, point) {
    const props = { refLine, point };
    return new Line(BY.ParLn, props);
  }
}

export default Line;

export { BY };
