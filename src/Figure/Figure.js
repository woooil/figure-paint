import { v4 as uuidv4 } from "uuid";
import { store } from "../store";

const TYPE = {
  Point: "Point",
  Line: "Line",
  Segment: "Segment",
  Label: "Label",
};
Object.freeze(TYPE);

class Figure {
  constructor(type, by, props, extensions = {}) {
    this.id = uuidv4().slice(-4);
    this.type = type;
    this.def = { by, ...props };
    this.determinants = [];
    this.dependants = [];
    Object.assign(this, extensions);
  }

  get commonProps() {
    return {
      stroke: "white",
      strokeWidth: "4",
      strokeOpacity: "0",
      style: {
        display: this.visible === false ? "none" : "",
      },
      className: `${this.type} figure`,
      id: this.id,
      key: this.id,
    };
  }

  get figures() {
    return store.getState().figures.value;
  }

  get draw() {
    return "";
  }
}

export default Figure;
export { TYPE };
