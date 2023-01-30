import { v4 as uuidv4 } from "uuid";

class Figure {
  constructor(name) {
    this._id = uuidv4();
    this._name = name;
  }

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  get component() {
    return <div key={this._id}>Figure {this.name}</div>;
  }

  distanceFrom(point) {
    return 0;
  }

  isInPadding(point) {
    return false;
  }
}

export default Figure;
