import { TYPE } from "../Figure";
import Figure from "../Figure";

const BY = {
  RelToFig: "RelToFig",
};
Object.freeze(BY);

class Label extends Figure {
  constructor(by, props) {
    super(TYPE.Label, by, props);
  }

  static byRelToFig(host, x, y) {
    const props = { host, x, y };
    return new Label(BY.RelToFig, props);
  }
}

export default Label;

export { BY };
