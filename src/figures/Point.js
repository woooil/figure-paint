import Figure from "./Figure";

var nextName = "A";
export const getNextName = () => {
  const result = nextName;
  if (nextName.at(-1) !== "Z") {
    nextName =
      nextName.slice(0, -1) +
      String.fromCharCode(nextName.at(-1).charCodeAt(0) + 1);
  } else {
    nextName = nextName.slice(0, -1) + "AA";
  }
  return result;
};

class Point extends Figure {
  constructor(name, values) {
    super(name);
    this._values = values;
    this._x = values.x;
    this._y = values.y;
  }

  get values() {
    return this._values;
  }
  get position() {
    return { x: this._x, y: this._y };
  }

  pointSize = 6;
  paddingSize = 4;
  pointStyle = {
    backgroundColor: "black",
    width: `${this.pointSize}px`,
    height: `${this.pointSize}px`,
    borderRadius: "50%",
    position: "absolute",
    left: this.paddingSize,
    top: this.paddingSize,
  };
  get paddingStyle() {
    return {
      width: `${this.pointSize + this.paddingSize * 2}px`,
      height: `${this.pointSize + this.paddingSize * 2}px`,
      position: "absolute",
      left: this._x - this.pointSize / 2 - this.paddingSize,
      top: this._y - this.pointSize / 2 - this.paddingSize,
    };
  }

  get component() {
    return (
      <div
        style={this.paddingStyle}
        className="point figure-wrapper"
        id={this.id}
        key={this.id}
      >
        <div style={this.pointStyle}></div>
      </div>
    );
  }

  distanceFrom(point) {
    const squared =
      (point.x - this._x) * (point.x - this._x) +
      (point.y - this._y) * (point.y - this._y);
    return Math.sqrt(squared) - this.pointSize / 2;
  }

  isInPadding(point) {
    const squared =
      (point.x - this._x) * (point.x - this._x) +
      (point.y - this._y) * (point.y - this._y);
    return Math.sqrt(squared) < this.paddingSize;
  }
}

export default Point;
