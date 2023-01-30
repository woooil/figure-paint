import Figure from "./Figure";

class Segment extends Figure {
  constructor(name, values) {
    super(name);
    this._values = values;
    this._startPos = values.startPos;
    this._endPos = values.endPos;
  }

  get values() {
    return this._values;
  }

  segmentWidth = 2;
  paddingWidth = 4;
  get segmentStyle() {
    const len = Math.sqrt(
      (this._endPos.x - this._startPos.x) ** 2 +
        (this._endPos.y - this._startPos.y) ** 2
    );
    return {
      backgroundColor: "black",
      width: `${len}px`,
      height: `${this.segmentWidth}px`,
      position: "absolute",
      top: this.paddingWidth - this.segmentWidth / 2,
    };
  }
  get paddingStyle() {
    const len = Math.sqrt(
      (this._endPos.x - this._startPos.x) ** 2 +
        (this._endPos.y - this._startPos.y) ** 2
    );
    const angle = Math.atan(
      (this._endPos.y - this._startPos.y) / (this._endPos.x - this._startPos.x)
    );
    const pos = {
      x: (this._startPos.x + this._endPos.x - len) / 2,
      y: (this._startPos.y + this._endPos.y) / 2,
    };
    return {
      width: `${len}px`,
      height: `${this.paddingWidth * 2}px`,
      position: "absolute",
      transform: `rotate(${(angle * 180) / Math.PI}deg)`,
      left: pos.x,
      top: pos.y - this.paddingWidth,
    };
  }

  get component() {
    return (
      <div
        style={this.paddingStyle}
        className="segment figure-wrapper"
        id={this.id}
        key={this.id}
      >
        <div style={this.segmentStyle}></div>
      </div>
    );
  }

  distanceFrom(point) {
    const numerator =
      (this._startPos.x - this._endPos.x) * (point.y - this._endPos.y) -
      (point.x - this._endPos.x) * (this._startPos.y - this._endPos.y);
    const denom =
      (this._endPos.x - this._startPos.x) ** 2 +
      (this._endPos.y - this._startPos.y) ** 2;
    return Math.abs(numerator) / Math.sqrt(denom);
  }

  isInPadding(point) {
    return this.distanceFrom(point) < this.paddingWidth + this.segmentWidth / 2;
  }
}

export default Segment;
