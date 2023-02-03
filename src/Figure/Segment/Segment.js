import { TYPE } from "../Figure";
import Figure from "../Figure";

const BY = {
  Endpnts: "Endpnts",
};
Object.freeze(BY);

class Segment extends Figure {
  constructor(by, props) {
    super(TYPE.Segment, by, props);
  }

  static byEndpnts(fst, snd) {
    const props = { fst, snd };
    return new Segment(BY.Endpnts, props);
  }
}

export default Segment;

export { BY };
