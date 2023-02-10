import { TYPE } from "../Figure";
import Figure from "../Figure";

import getPointCoord from "../Point/getPointCoord";
import getLineAttr from "../Line/getLineAttr";

const BY = {
  Endpnts: "Endpnts",
};
Object.freeze(BY);

class Segment extends Figure {
  constructor(by, props) {
    super(TYPE.Segment, by, props);
  }

  draw(figures) {
    const fstCoord = getPointCoord(figures, this.def.fst);
    const sndCoord = getPointCoord(figures, this.def.snd);
    return <rect {...getLineAttr(fstCoord, sndCoord)} {...this.commonProps} />;
  }

  static byEndpnts(fst, snd) {
    const props = { fst, snd };
    return new Segment(BY.Endpnts, props);
  }
}

export default Segment;

export { BY };
