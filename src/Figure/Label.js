import { TYPE } from "./Figure";
import Figure from "./Figure";

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

  get draw() {
    const name = this.figures.fig(this.def.host).name;
    const hostPos = this.figures.fig(this.def.host).coord;
    const dim = Label.#textDim(name, "");

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

  static #textDim(text, style) {
    const element = document.createElement("div");
    element.innerText = text;
    Object.assign(element.style, style);
    element.style.display = "inline-block";

    document.body.appendChild(element);
    const dim = { width: element.clientWidth, height: element.clientHeight };
    document.body.removeChild(element);

    return dim;
  }
}

export default Label;

export { BY };
