import { TYPE } from "../Figure";
import Figure from "../Figure";

import getPointCoord from "../Point/getPointCoord";
import getTextDim from "./getTextDim";

const BY = {
  RelToFig: "RelToFig",
};
Object.freeze(BY);

class Label extends Figure {
  constructor(by, props) {
    super(TYPE.Label, by, props);
  }

  draw(figures) {
    const name = figures.find((f) => f.id === this.def.host).name;
    const hostPos = getPointCoord(figures, this.def.host);
    const dim = getTextDim(name, "");

    return (
      <text
        x={hostPos.x + this.def.x - dim.width / 2}
        y={hostPos.y + this.def.y}
        {...this.commonProps}
      >
        {name}
      </text>
    );
  }

  static byRelToFig(host, x, y) {
    const props = { host, x, y };
    return new Label(BY.RelToFig, props);
  }
}

export default Label;

export { BY };
