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
  }

  get values() {
    return this._values;
  }

  get component() {
    return (
      <div
        style={{
          ...style,
          left: this.values.x - pointSize / 2,
          top: this.values.y - pointSize / 2,
        }}
        className={this.name}
        key={this._id}
      ></div>
    );
  }
}

const pointSize = 6;
const style = {
  backgroundColor: "black",
  width: `${pointSize}px`,
  height: `${pointSize}px`,
  borderRadius: "50%",
  position: "absolute",
};

export default Point;
