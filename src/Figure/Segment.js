import { TYPE } from "./Figure";
import Figure from "./Figure";
import Line from "./Line";

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

  get draw() {
    const fstCoord = this.figures.fig(this.def.fst).coord;
    const sndCoord = this.figures.fig(this.def.snd).coord;
    return <rect {...Line.attr(fstCoord, sndCoord)} {...this.commonProps} />;
  }

  get length() {
    const segment = this.figures.fig(this.id);
    const fstCoord = this.figures.fig(segment.def.fst).coord;
    const sndCoord = this.figures.fig(segment.def.snd).coord;
    return fstCoord.distanceFrom(sndCoord);
  }
}

export default Segment;

export { BY };
