import { v4 as uuidv4 } from "uuid";

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
}

export default Figure;
export { TYPE };
